import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    Clock,
    Mail,
    Phone,
    User,
    Crown,
    BookOpen,
    Home,
    MessageSquare,
    Download,
    Calendar,
    Shield,
    ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const PaymentSuccess = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [userDetails, setUserDetails] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        if (!user) {
            setLocation("/register");
            return;
        }
        fetchUserDetails();
    }, [user]);

    const fetchUserDetails = async () => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserDetails(userData);
                
                // Get package details based on selected package
                const selectedPackage = userData.selectedPackage;
                if (selectedPackage) {
                    setPackageDetails(getPackageInfo(selectedPackage));
                }
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const getPackageInfo = (packageId) => {
        const packages = {
            level1: {
                id: "level1",
                name: "Level 1 Foundation",
                subtitle: "Start from basics",
                price: "₨15,000",
                duration: "6 weeks",
                description: "Build solid fundamentals and work from there",
                icon: <BookOpen className="w-8 h-8" />
            },
            complete: {
                id: "complete",
                name: "Complete Package",
                subtitle: "Beginner to advanced",
                price: "₨35,000",
                duration: "Comprehensive",
                description: "Complete journey with future cohort access",
                icon: <Crown className="w-8 h-8" />
            }
        };
        return packages[packageId] || null;
    };

    if (!userDetails || !packageDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-green-600 to-green-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <CheckCircle size={80} className="mx-auto mb-6 text-green-200" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Payment Submitted Successfully!
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Thank you for your enrollment. Your payment details have been received and are being processed.
                        </p>
                        <p className="text-lg opacity-90">
                            You will receive confirmation and access details within 24 hours.
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps - All Complete */}
            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 1 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Create Account</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 2 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Training Overview</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 3 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Select a Package</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 4 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Enroll in the Program</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 5 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Payment</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Details */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Payment Confirmation */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                                Payment Under Review
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Enrollment Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Student:</span>
                                            <span className="text-neutral-600">
                                                {userDetails.firstName} {userDetails.lastName}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Email:</span>
                                            <span className="text-neutral-600">{userDetails.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Date:</span>
                                            <span className="text-neutral-600">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <div className="flex items-center mb-4">
                                        {packageDetails.icon}
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-neutral-800">
                                                {packageDetails.name}
                                            </h4>
                                            <p className="text-neutral-600">{packageDetails.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-neutral-700">Amount Paid:</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            {packageDetails.price}
                                        </span>
                                    </div>
                                    {userDetails.transactionId && (
                                        <div className="mt-3 pt-3 border-t border-green-200">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-neutral-700">Transaction ID:</span>
                                                <span className="text-sm font-mono text-neutral-600">
                                                    {userDetails.transactionId}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* What Happens Next */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                <Clock className="w-8 h-8 text-blue-500 mr-3" />
                                What Happens Next?
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800 mb-2">Payment Verification</h3>
                                        <p className="text-neutral-600">
                                            Our team will verify your payment within 24 hours. You will receive an email confirmation once verified.
                                        </p>
                                    </div>
                                </div>
                                
                           
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800 mb-2">Training Schedule</h3>
                                        <p className="text-neutral-600">
                                            You will be notified about the training schedule and cohort start dates as per your selected package.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800 mb-2">Process Complete!</h3>
                                        <p className="text-neutral-600">
                                            You can begin your training as soon as the program commences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <div className="flex items-start">
                                <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                        Important Information
                                    </h3>
                                    <ul className="text-blue-700 space-y-2">
                        
                                        <li>• Keep your transaction ID for future reference: <strong>{userDetails.transactionId}</strong></li>
                                        <li>• Check your spam folder if you don't receive our emails</li>
                                        <li>• Contact support if you have any questions or concerns</li>
                                        {packageDetails.id === 'complete' && (
                                            <li>• Your future cohort access benefits will be activated automatically</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={() => setLocation("/")}
                                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                Return to Home
                            </Button>
                            
                            <Button
                                onClick={() => setLocation("/contact")}
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300"
                            >
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Contact Support
                            </Button>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-8 text-center">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                                <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                                    Need Help? Contact Us
                                </h3>
                                <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">support@pcbtraining.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">+92 300 1234567</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PaymentSuccess;
