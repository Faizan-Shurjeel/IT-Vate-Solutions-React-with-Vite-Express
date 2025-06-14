import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, Users, Mail, Phone, User, Crown, BookOpen, ChevronRight, Info, Calendar, DollarSign } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const EnrollmentConfirmation = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
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
                icon: <BookOpen className="w-8 h-8" />,
                features: [
                "PCB Design Basics",
                "Schematic Design",
                "Basic Routing",
                "Certificate",
            ]
            },
            complete: {
                id: "complete",
                name: "Complete Package",
                subtitle: "Beginner to advanced",
                price: "₨35,000",
                duration: "Comprehensive",
                description: "Complete journey with future cohort access",
                icon: <Crown className="w-8 h-8" />,
                features: [
                "Everything in Level 1",
                "Advanced Techniques",
                "Future Cohort Access",
                "Discounted Level 2 & 3"
            ]
            }
        };
        return packages[packageId] || null;
    };

    const handleConfirmEnrollment = async () => {
        setLoading(true);
        try {
            // Update user document with enrollment confirmation
            await updateDoc(doc(db, "users", user.uid), {
                enrollmentConfirmed: true,
                enrollmentConfirmedAt: new Date(),
                status: "pending_payment"
            });

            // Navigate to payment page
            setLocation("/payment");
        } catch (error) {
            console.error("Error confirming enrollment:", error);
            alert("Failed to confirm enrollment. Please try again.");
        } finally {
            setLoading(false);
        }
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
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <CheckCircle size={64} className="mx-auto mb-6 text-green-300" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Confirm Your Enrollment
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Review your details and package selection before proceeding to payment.
                        </p>
                        <p className="text-lg opacity-90">
                            You're one step away from starting your PCB design journey!
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
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
                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

                        {/* Step 4 - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                4
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Enroll in the Program</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Finalize your enrollment</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Payment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Make payment</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enrollment Confirmation */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Enrollment Summary
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Please review your information before confirming your enrollment.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                    <User className="w-6 h-6 mr-3 text-primary" />
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
    <User className="w-4 h-4 mr-2 text-neutral-400" />
    <span className="font-medium text-neutral-700 w-20">Name:</span>
    <span className="text-neutral-600">
        {userDetails.firstName} {userDetails.lastName}
    </span>
</div>

                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Email:</span>
                                        <span className="text-neutral-600">{userDetails.email}</span>
                                    </div>
                                    {userDetails.phone && (
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Phone:</span>
                                            <span className="text-neutral-600">{userDetails.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Joined:</span>
                                        <span className="text-neutral-600">
                                            {userDetails.createdAt?.toDate?.()?.toLocaleDateString() || 'Today'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Package Information */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                    {packageDetails.icon}
                                    <span className="ml-3">Selected Package</span>
                                </h3>
                                
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-neutral-800 mb-2">
                                        {packageDetails.name}
                                    </h4>
                                    <p className="text-neutral-600 mb-4">{packageDetails.description}</p>
                                    
                                    <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                                            <span className="font-medium text-neutral-700">Total Amount:</span>
                                        </div>
                                        <span className="text-2xl font-bold text-primary">
                                            {packageDetails.price}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center mt-3">
                                        <Clock className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">Duration: {packageDetails.duration}</span>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-neutral-800 mb-3">Package Includes:</h5>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {packageDetails.features.slice(0, 5).map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm">
                                                <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                                <span className="text-neutral-600">{feature}</span>
                                            </div>
                                        ))}
                                        {packageDetails.features.length > 5 && (
                                            <div className="text-sm text-neutral-500 italic">
                                                +{packageDetails.features.length - 5} more features...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className="mt-12">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                            Important Information
                                        </h3>
                                        <ul className="text-blue-700 space-y-2">
                                            <li>• Your enrollment will be confirmed after successful payment</li>
                                            <li>• Training sessions will begin as per the scheduled cohort dates</li>
                                            {packageDetails.id === 'complete' && (
                                                <li>• Future cohort access will be activated automatically when available</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Confirmation Button */}
                        <div className="mt-12 text-center">
                            <Button
                                onClick={handleConfirmEnrollment}
                                disabled={loading}
                                className="bg-primary hover:bg-primary/90 text-white font-semibold px-12 py-4 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Confirm Enrollment & Proceed to Payment
                                        <ChevronRight className="w-5 h-5 ml-3" />
                                    </>
                                )}
                            </Button>
                            <p className="text-sm text-neutral-500 mt-4">
                                By confirming, you agree to our terms and conditions
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EnrollmentConfirmation;
