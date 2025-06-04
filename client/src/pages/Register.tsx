import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Mail,
  Phone,
  User,
  Lock,
  LogIn,
} from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // adjust if needed

const Register = () => {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      setLocation("/assessment");
    }
  }, [authLoading, user, setLocation]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert("Login successful!");
        setForm({ firstName: "", lastName: "", email: "", password: "", phone: "" });
        setLocation("/assessment");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError("Password should be at least 6 characters.");
        setLoading(false);
        return;
      }

      try {
        const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
        await setDoc(doc(db, "users", user.uid), {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || null,
          createdAt: new Date(),
          testCompleted: false,
          level: "undetermined",
        });

        alert("Registration successful!");
        setForm({ firstName: "", lastName: "", email: "", password: "", phone: "" });
        setLocation("/assessment");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
        <main>
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {isLogin ? "Welcome Back" : "Training Registration"}
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        {isLogin 
                            ? "Sign in to continue your PCB design journey and access your training materials."
                            : "Gain real-world skills with our immersive, industry-focused programs—designed for students and professionals ready to lead."
                        }
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                                    {isLogin ? "Sign In" : "Register for the Program"}
                                </h2>
                                <p className="text-neutral-600">
                                    {isLogin 
                                        ? "Enter your credentials to access your account"
                                        : "Fill in your details to enroll in our PCB Designer Programme"
                                    }
                                </p>
                            </div>

                            {/* Toggle Button */}
                            <div className="text-center mb-6">
                                <p className="text-neutral-600 mb-3">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleToggle}
                                    className="text-primary hover:text-primary/80 font-medium underline transition-colors"
                                >
                                    {isLogin ? "Create Account" : "Sign In"}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div 
                                    className={`transition-all duration-300 ease-in-out ${
                                        isLogin ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-96'
                                    }`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                                            <input
                                                name="firstName"
                                                placeholder="First Name"
                                                onChange={handleChange}
                                                value={form.firstName}
                                                required={!isLogin}
                                                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            />
                                        </div>

                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                                            <input
                                                name="lastName"
                                                placeholder="Last Name"
                                                onChange={handleChange}
                                                value={form.lastName}
                                                required={!isLogin}
                                                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mb-6">
                                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                                        <input
                                            name="phone"
                                            placeholder="Phone Number (Optional)"
                                            onChange={handleChange}
                                            value={form.phone}
                                            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        value={form.email}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={form.password}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {error && <p className="text-red-600 text-center">{error}</p>}

                                <div className="flex justify-center pt-4">
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }}
                                        disabled={loading}
                                        className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-md"
                                    >
                                        {isLogin ? (
                                            <>
                                                <LogIn size={18} className="mr-2" />
                                                {loading ? "Signing In..." : "Sign In"}
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={18} className="mr-2" />
                                                {loading ? "Registering..." : "Enroll Now"}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
                        PCB Designer Programme
                    </h2>
                    <p className="text-center max-w-2xl mx-auto mb-12 text-neutral-600">
                        Kickstart your journey into PCB design with a structured and practical training program.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-semibold mb-3">Step 1: Register</h3>
                            <p className="text-neutral-600">
                                Create your account and fill in your basic details to get started.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-semibold mb-3">Step 2: Confirm Your Slot</h3>
                            <p className="text-neutral-600">
                                Complete any necessary verification and intermediary steps.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-semibold mb-3">Step 3: Begin Training</h3>
                            <p className="text-neutral-600">
                                Access your training and start learning with real-world projects and expert guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;