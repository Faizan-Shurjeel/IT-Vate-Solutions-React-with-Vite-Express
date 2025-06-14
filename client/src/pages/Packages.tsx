import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const Packages = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleSelectPackage = async (packageType) => {
        if (!user) {
            alert("Please log in to select a package");
            setLocation("/register");
            return;
        }

        setLoading(true);
        setSelectedPackage(packageType);

        try {
            // Update user document with selected package
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedPackage: packageType,
                packageSelectedAt: new Date(),
            });

            // Navigate to enrollment page
            setLocation("/enroll");
        } catch (error) {
            console.error("Error updating package selection:", error);
            alert("Failed to select package. Please try again.");
        } finally {
            setLoading(false);
            setSelectedPackage(null);
        }
    };

    const packages = [
        {
            id: "level1",
            name: "Level 1 Foundation",
            subtitle: "Start from basics",
            price: "₨15,000",
            duration: "6 weeks",
            description: "Build solid fundamentals and work from there",
            features: [
                "PCB Design Basics",
                "Schematic Design",
                "Basic Routing",
                "Certificate",
            ],
            cta: "Select Level 1",
            popular: false,
            icon: <BookOpen className="w-8 h-8" />,
            color: "border-blue-200 hover:border-blue-300"
        },
        {
            id: "complete",
            name: "Complete Package",
            subtitle: "Beginner to advanced",
            price: "₨35,000",
            duration: "Comprehensive",
            description: "Complete journey with future cohort access",
            features: [
                "Everything in Level 1",
                "Advanced Techniques",
                "Future Cohort Access",
                "Discounted Level 2 & 3"
            ],
            cta: "Select Complete",
            popular: true,
            icon: <Crown className="w-8 h-8" />,
            color: "border-primary hover:border-primary/80 ring-2 ring-primary/20"
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Target size={64} className="mx-auto mb-6 text-green-300" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Choose Your Training Package
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Select the package that matches your learning goals.
                        </p>
                        <p className="text-lg opacity-90">
                            Both options include hands-on projects and industry-recognized certification.
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
                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

                        {/* Step 3 - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                3
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Select a Package</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Choose from offered packages</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Enroll in the Program</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Finalize your enrollment</p>
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

            {/* Package Selection */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Training Packages
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Choose the package that best fits your learning objectives.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`relative bg-white rounded-xl shadow-lg border-2 ${pkg.color} transition-all duration-300 hover:shadow-xl group`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-8">
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                                                pkg.popular ? 'bg-primary text-white' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                                {pkg.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                                                {pkg.name}
                                            </h3>
                                            <p className="text-neutral-600 mb-4">{pkg.subtitle}</p>
                                            <p className="text-neutral-700">{pkg.description}</p>
                                        </div>

                                        {/* Pricing */}
                                        <div className="text-center mb-8 p-6 bg-neutral-50 rounded-lg">
                                            <div className="text-4xl font-bold text-neutral-800 mb-2">
                                                {pkg.price}
                                            </div>
                                            <div className="flex items-center justify-center text-neutral-600">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span>{pkg.duration}</span>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-8">
                                            <h4 className="font-semibold text-neutral-800 mb-4">What's Included:</h4>
                                            <div className="space-y-3">
                                                {pkg.features.map((feature, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                                                            pkg.popular ? 'text-primary' : 'text-green-500'
                                                        }`} />
                                                        <span className="text-neutral-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="text-center">
                                            <Button
                                                onClick={() => handleSelectPackage(pkg.id)}
                                                disabled={loading}
                                                className={`w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                                                    pkg.popular 
                                                        ? 'bg-primary hover:bg-primary/90 text-white shadow-lg' 
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                } ${loading && selectedPackage === pkg.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {loading && selectedPackage === pkg.id ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        {pkg.cta}
                                                        <ChevronRight className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 text-center">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <Info size={24} className="text-blue-600 mt-1" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                                            Complete Package Benefits
                                        </h3>
                                        <p className="text-neutral-600">
                                            The Complete Package reserves your spot in future Level 2 and Level 3 cohorts 
                                            at discounted rates when they become available. This ensures continuous learning 
                                            progression at significant savings.
                                        </p>
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

export default Packages;
