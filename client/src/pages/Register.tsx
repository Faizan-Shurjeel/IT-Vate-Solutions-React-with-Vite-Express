import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import {
    UserPlus,
    Mail,
    Phone,
    User,
    Lock,
    LogIn,
    CreditCard,
    Eye,
    EyeOff,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
    const { user, loading: authLoading } = useAuth();
    const [, setLocation] = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [checkingPayment, setCheckingPayment] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            checkUserPaymentStatus();
        }
    }, [authLoading, user, setLocation]);

    const checkUserPaymentStatus = async () => {
        if (!user) return;
        
        setCheckingPayment(true);
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                
                // Check if user has made payment (has transactionId or paymentStatus)
                if (userData.transactionId || userData.paymentStatus) {
                    setLocation("/payment-success");
                    return;
                }
                
                // Check if user has selected a package
                if (userData.selectedPackage) {
                    setLocation("/payment");
                    return;
                }
                
                // Otherwise, go to packages
                setLocation("/packages");
            } else {
                // New user, go to packages
                setLocation("/packages");
            }
        } catch (error) {
            console.error("Error checking payment status:", error);
            // On error, default to packages
            setLocation("/packages");
        } finally {
            setCheckingPayment(false);
        }
    };

    const [form, setForm] = useState({
        fullName: "",
        cnic: "",
        mobile: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cnic" || name === "mobile") {
            // Remove all non-digit characters
            const digitsOnly = value.replace(/\D/g, "");
            setForm({ ...form, [name]: digitsOnly });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setError("");
        setForm({
            fullName: "",
            cnic: "",
            mobile: "",
            email: "",
            password: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (isLogin) {
            if (!form.email || !form.password) {
                setError("Please fill in all required fields.");
                setLoading(false);
                return;
            }

            try {
                const { user: loggedInUser } = await signInWithEmailAndPassword(auth, form.email, form.password);
                setForm({ fullName: "", cnic: "", mobile: "", email: "", password: "" });
                
                // Check payment status after login
                const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    // Check if user has made payment
                    if (userData.transactionId || userData.paymentStatus) {
                        setLocation("/payment-success");
                        return;
                    }
                    
                    // Check if user has selected a package
                    if (userData.selectedPackage) {
                        setLocation("/payment");
                        return;
                    }
                }
                
                // Default to packages
                setLocation("/packages");
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            if (!form.fullName || !form.cnic || !form.mobile || !form.email || !form.password) {
                setError("Please fill in all required fields.");
                setLoading(false);
                return;
            }
            if (form.password.length < 6) {
                setError("Password should be at least 6 characters.");
                setLoading(false);
                return;
            }

            // Validate CNIC format
            if (form.cnic.length !== 13) {
                setError("CNIC must be exactly 13 digits.");
                setLoading(false);
                return;
            }

            // Validate mobile format
            if (form.mobile.length !== 11 || !form.mobile.startsWith('03')) {
                setError("Mobile number must be 11 digits starting with 03.");
                setLoading(false);
                return;
            }

            try {
                const { user: newUser } = await createUserWithEmailAndPassword(auth, form.email, form.password);

                // Split full name into first and last name
                const nameParts = form.fullName.trim().split(' ');
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || '';

                await setDoc(doc(db, "users", newUser.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: form.fullName,
                    cnic: form.cnic,
                    mobile: form.mobile,
                    email: form.email,
                    createdAt: new Date(),
                    testCompleted: false,
                    level: "undetermined",
                    // Initialize payment-related fields
                    selectedPackage: null,
                    selectedLevel: null,
                    selectedOption: null,
                    transactionId: null,
                    paymentStatus: null,
                });

                setForm({ fullName: "", cnic: "", mobile: "", email: "", password: "" });
                setLocation("/packages");
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setError("This email is already registered. Please sign in instead.");
                } else if (error.code === 'auth/weak-password') {
                    setError("Password is too weak. Please choose a stronger password.");
                } else if (error.code === 'auth/invalid-email') {
                    setError("Please enter a valid email address.");
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    // Show loading screen while checking payment status
    if (checkingPayment) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Checking your account status...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {isLogin ? "Welcome Back" : "Join IT-vate Training"}
                        </h1>
                        <p className="text-lg md:text-xl opacity-90">
                            {isLogin
                                ? "Sign in to continue your PCB design journey"
                                : "Start your professional PCB design training today"
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 0 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Start Your Journey</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 1 - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                1
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Create Your Profile</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Register with us</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 2 - Locked */}
                        <div className="flex flex-col items-center min-w-[140px] opacity-50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                2
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Choose Your Track</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Bundle or progressive</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 3 - Locked */}
                        <div className="flex flex-col items-center min-w-[140px] opacity-50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                3
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Confirm Your Track</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Review your choice</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Locked */}
                        <div className="flex flex-col items-center min-w-[140px] opacity-50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Payment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Make payment</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Locked */}
                        <div className="flex flex-col items-center min-w-[140px] opacity-50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Confirmation</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Download slip</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            {/* Form Header */}
                            <div className="px-8 pt-8 pb-6 text-center">
                                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                                    {isLogin ? "Sign In" : "Create Account"}
                                </h2>
                                <p className="text-neutral-600 text-sm">
                                    {isLogin
                                        ? "Enter your credentials to continue"
                                        : "Fill in your details to get started"
                                    }
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="px-8 pb-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Registration Fields */}
                                    {!isLogin && (
                                        <>
                                            {/* Full Name */}
                                            <div className="relative">
                                                <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                                <input
                                                    name="fullName"
                                                    placeholder="Full Name"
                                                    onChange={handleChange}
                                                    value={form.fullName}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                                                />
                                            </div>

                                            {/* CNIC */}
                                            <div className="relative">
                                                <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                                <input
                                                    name="cnic"
                                                    placeholder="CNIC (e.g. 1234512345671)"
                                                    onChange={handleChange}
                                                    value={form.cnic}
                                                    required
                                                    pattern="\d{13}"
                                                    title="Enter 13 digit CNIC without hyphens"
                                                    maxLength={13}
                                                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                                                    inputMode="numeric"
                                                />
                                            </div>

                                            {/* Mobile */}
                                            <div className="relative">
                                                <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                                <input
                                                    name="mobile"
                                                    placeholder="Mobile (e.g. 03001234567)"
                                                    onChange={handleChange}
                                                    value={form.mobile}
                                                    required
                                                    pattern="03\d{9}"
                                                    title="Enter 11 digit mobile number starting with 03"
                                                    maxLength={11}
                                                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                                                    inputMode="numeric"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Email */}
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            onChange={handleChange}
                                            value={form.email}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            value={form.password}
                                            required
                                            minLength={6}
                                            className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-600 text-center text-sm">{error}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors shadow-md mt-6"
                                    >
                                        {isLogin ? (
                                            <>
                                                <LogIn size={16} className="mr-2" />
                                                {loading ? "Signing In..." : "Sign In"}
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={16} className="mr-2" />
                                                {loading ? "Creating Account..." : "Create Account"}
                                            </>
                                        )}
                                    </Button>
                                </form>

                                {/* Toggle */}
                                <div className="text-center mt-6 pt-6 border-t border-neutral-200">
                                    <p className="text-neutral-600 text-sm mb-2">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleToggle}
                                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                                    >
                                        {isLogin ? "Create Account" : "Sign In"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;
