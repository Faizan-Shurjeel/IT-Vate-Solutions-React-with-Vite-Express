import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    CreditCard,
    Smartphone,
    Building2,
    Copy,
    Check,
    ArrowRight,
    AlertCircle,
    Clock,
    Award,
    BookOpen,
    Target
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    details: {
        account: string;
        accountName: string;
        instructions: string[];
    };
}

interface CourseLevel {
    level: string;
    price: number;
    duration: string;
    title: string;
    description: string;
    features: string[];
}

const Payment = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [transactionId, setTransactionId] = useState("");
    const [copiedField, setCopiedField] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [courseLevel, setCourseLevel] = useState<CourseLevel | null>(null);

    // Define course levels and pricing
    const courseLevels: Record<string, CourseLevel> = {
        level1: {
            level: "Level 1",
            price: 18000,
            duration: "12 weeks",
            title: "Beginner PCB Design Foundation",
            description: "Complete introduction to PCB design with basic electronics fundamentals",
            features: [
                "Basic electronics theory and circuit analysis",
                "Introduction to PCB design software (Altium/KiCad)",
                "Simple single and double-layer board designs",
                "Schematic capture fundamentals",
                "Component selection and placement basics",
                "Basic routing techniques and design rules",
                "Hands-on projects with simple circuits",
                "Industry standard practices introduction"
            ]
        },
        level2: {
            level: "Level 2",
            price: 15000,
            duration: "10 weeks", 
            title: "Basic PCB Design Skills",
            description: "Build upon existing knowledge with practical PCB design skills",
            features: [
                "PCB layout optimization techniques",
                "Multi-layer board design basics",
                "Signal integrity fundamentals",
                "Component placement strategies",
                "Advanced routing techniques",
                "Design for Manufacturing (DFM) basics",
                "Real-world PCB projects",
                "Industry best practices"
            ]
        },
        
        level3: {
            level: "Level 3",
            price: 8000,
            duration: "6 weeks",
            title: "Advanced PCB Design Specialization",
            description: "Specialized topics and cutting-edge PCB design techniques",
            features: [
                "RF and microwave PCB design",
                "High-frequency design considerations", 
                "Advanced power electronics PCB design",
                "Flexible and rigid-flex PCB design",
                "Design automation and scripting",
                "Advanced simulation and analysis",
                "Industry-specific design challenges",
                "Professional certification preparation"
            ]
        }
    };

    useEffect(() => {
        // Get assessment results from sessionStorage
        const storedResults = sessionStorage.getItem('examResults');
if (storedResults) {
    const results = JSON.parse(storedResults);
    const rawLevel = results.level || '';
    const normalizedLevel = rawLevel.toLowerCase().replace(/\s+/g, '');
    setCourseLevel(courseLevels[normalizedLevel] || courseLevels.basic);
} else {
    // Default to basic if no results found
    setCourseLevel(courseLevels.basic);
}

    }, []);

    const paymentMethods: PaymentMethod[] = [
        {
            id: "easypaisa",
            name: "EasyPaisa",
            icon: <Smartphone size={24} className="text-green-600" />,
            details: {
                account: "03001234567",
                accountName: "PCB Training Institute",
                instructions: [
                    "Open your EasyPaisa app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03001234567",
                    "Enter amount: PKR " + (courseLevel?.price.toLocaleString() || "15,000"),
                    "Complete the transaction",
                    "Copy the transaction ID and paste it below"
                ]
            }
        },
        {
            id: "jazzcash",
            name: "JazzCash",
            icon: <Smartphone size={24} className="text-red-600" />,
            details: {
                account: "03007654321",
                accountName: "PCB Training Institute",
                instructions: [
                    "Open your JazzCash app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03007654321",
                    "Enter amount: PKR 15,000",
                    "Complete the transaction",
                    "Copy the transaction ID and paste it below"
                ]
            }
        },
        {
            id: "bank",
            name: "Bank Transfer",
            icon: <Building2 size={24} className="text-blue-600" />,
            details: {
                account: "1234567890123456",
                accountName: "PCB Training Institute",
                instructions: [
                    "Visit your bank or use online banking",
                    "Transfer to Account: 1234567890123456",
                    "Account Title: PCB Training Institute",
                    "Bank: Meezan Bank Limited",
                    "Amount: PKR " + (courseLevel?.price.toLocaleString() || "15,000"),
                    "Copy the transaction reference and paste it below"
                ]
            }
        }
    ];

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    const handleSubmit = async (e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();
        setError("");

        if (!selectedMethod) {
            setError("Please select a payment method");
            return;
        }

        if (!transactionId.trim()) {
            setError("Please enter your transaction ID");
            return;
        }

        if (!user) {
            setError("User not authenticated");
            return;
        }

        setIsSubmitting(true);

        try {
            // Create payment record in Firestore
            const paymentRef = doc(db, 'payments', `${user.uid}_${Date.now()}`);
            await setDoc(paymentRef, {
                userId: user.uid,
                userEmail: user.email,
                paymentMethod: selectedMethod,
                transactionId: transactionId.trim(),
                amount: courseLevel?.price || 15000,
                courseLevel: courseLevel?.level || 'Basic',
                courseDuration: courseLevel?.duration || '10 weeks',
                currency: 'PKR',
                status: 'pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Update user document with payment status
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                paymentStatus: 'pending',
                lastPaymentId: paymentRef.id,
                updatedAt: serverTimestamp()
            }, { merge: true });

            // Redirect to success page
            setLocation("/payment-success");
        } catch (error) {
            console.error("Error submitting payment:", error);
            setError("Failed to submit payment information. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

    return (
        <main>
            {/* Header Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <CreditCard size={64} className="mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Complete Your Enrollment
                        </h1>
                        <p className="text-xl">
                            Choose your preferred payment method and complete your enrollment 
                            in the PCB Design Training Program.
                        </p>
                    </div>
                </div>
            </section>

            {/* Step Indicator */}
            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 1 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Create Account</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Register your details</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 2 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Training Overview</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Course structure</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 3 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Assessment Test</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Skills evaluation</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 4 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Results</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Recommendations</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 5 - Current */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                5
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Payment</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Complete enrollment</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Course Price */}
                        {courseLevel && (
                            <div className="bg-neutral-50 p-8 rounded-lg shadow-md mb-8 text-center">
                                <div className="mb-4">
                                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-3 ${
                                        courseLevel.level.toLowerCase() === 'advanced' ? 'text-green-600 bg-green-50 border border-green-200' :
                                        courseLevel.level.toLowerCase() === 'intermediate' ? 'text-blue-600 bg-blue-50 border border-blue-200' :
                                        courseLevel.level.toLowerCase() === 'basic' ? 'text-orange-600 bg-orange-50 border border-orange-200' :
                                        'text-red-600 bg-red-50 border border-red-200'
                                    }`}>
                                        {courseLevel.level}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-800 mb-2">{courseLevel.title}</h2>
                                <p className="text-neutral-600 mb-4">{courseLevel.description}</p>
                                <div className="flex justify-center items-center space-x-6 mb-4">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary">PKR {courseLevel.price.toLocaleString()}</div>
                                        <div className="text-sm text-neutral-600">Total Investment</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-neutral-700">{courseLevel.duration}</div>
                                        <div className="text-sm text-neutral-600">Program Duration</div>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-600">Personalized curriculum based on your assessment results</p>
                            </div>
                        )}

                        {/* Payment Methods */}
                        <div className="bg-neutral-50 p-8 rounded-lg shadow-md mb-8">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Select Payment Method</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`p-4 rounded-lg border-2 transition-all ${
                                            selectedMethod === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            {method.icon}
                                            <span className="mt-2 font-semibold">{method.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Payment Instructions */}
                            {selectedPaymentMethod && (
                                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-neutral-800 mb-4">
                                        Payment Instructions - {selectedPaymentMethod.name}
                                    </h4>
                                    
                                    {/* Account Details */}
                                    <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Account Number:</span>
                                            <div className="flex items-center">
                                                <span className="font-mono">{selectedPaymentMethod.details.account}</span>
                                                <button
                                                    onClick={() => copyToClipboard(selectedPaymentMethod.details.account, 'account')}
                                                    className="ml-2 p-1 hover:bg-neutral-200 rounded"
                                                >
                                                    {copiedField === 'account' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Account Name:</span>
                                            <span>{selectedPaymentMethod.details.accountName}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Amount:</span>
                                            <span className="font-bold text-primary">PKR 15,000</span>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="space-y-2">
                                        {selectedPaymentMethod.details.instructions.map((instruction, index) => (
                                            <div key={index} className="flex items-start">
                                                <span className="bg-primary text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <span className="text-neutral-700">{instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Transaction ID Form */}
                        {selectedMethod && (
                            <div className="bg-neutral-50 p-8 rounded-lg shadow-md mb-8">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6">Submit Transaction Details</h3>
                                
                                <div className="mb-6">
                                    <label htmlFor="transactionId" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Transaction ID / Reference Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="transactionId"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter your transaction ID"
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    />
                                    <p className="text-sm text-neutral-600 mt-2">
                                        Enter the transaction ID you received after making the payment
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                        <AlertCircle size={20} className="text-red-500 mr-2" />
                                        <span className="text-red-700">{error}</span>
                                    </div>
                                )}

                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 py-3 text-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Payment
                                            <ArrowRight size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Important Notice */}
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                            <div className="flex items-start">
                                <AlertCircle size={24} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
                                    <ul className="text-blue-700 space-y-1 text-sm">
                                        <li>• Your enrollment will be activated within 24 hours of payment verification</li>
                                        <li>• Please keep your transaction receipt for future reference</li>
                                        <li>• Contact support if you face any issues with payment</li>
                                        <li>• All payments are secure and encrypted</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included Section */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                            What's Included in Your Training
                        </h2>
                        <p className="text-lg text-neutral-600 mb-12">
                            Get comprehensive PCB design training with expert guidance and hands-on projects.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <BookOpen size={32} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-lg font-semibold mb-2">Complete Curriculum</h3>
                                <p className="text-neutral-600">
                                    From basics to advanced PCB design concepts with practical exercises.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Target size={32} className="mx-auto mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Hands-on Projects</h3>
                                <p className="text-neutral-600">
                                    Real-world PCB design projects to build your portfolio.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Award size={32} className="mx-auto mb-4 text-orange-500" />
                                <h3 className="text-lg font-semibold mb-2">Industry Certification</h3>
                                <p className="text-neutral-600">
                                    Recognized certification upon successful completion.
                                </p>
                            </div>
                        </div>
                    </div>  
                </div>
            </section>
        </main>
    );
};

export default Payment;