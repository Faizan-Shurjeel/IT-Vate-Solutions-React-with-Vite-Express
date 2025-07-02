import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User } from "lucide-react";
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
    
            // Navigate based on package type
            if (packageType === "complete") {
                // For Complete Training, go to Step 3A (options selection)
                setLocation("/complete-training-options");
            } else if( packageType === "progressive") {
                // For Progressive Path, go to Step 3B (enrollment)
                setLocation("/progressive-path-enrollment");
            } else if (packageType === "direct") { 
                // For Direct Entry, go to Step 3C (enrollment)
                setLocation("/direct-entry-assessment");
            }
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
            id: "complete",
            name: "Expert Track",
            subtitle: "Levels 1-3, 20% off",
            price: "₨12,000",
            duration: "All Levels",
            description: "Register once, attend all 3 levels with 20% discount",
            features: [
                "All 3 Levels Included",
                "20% Discount Applied",
                "Complete Journey",
                "Maximum Savings"
            ],
            cta: "Select Expert Track",
            popular: true,
            badge: "Students & Early-Career Pros",
            icon: <Crown className="w-8 h-8" />,
            color: "border-primary hover:border-primary/80 ring-2 ring-primary/20",
            hasDiscount: true,
            discountText: "You save ₨3,000",
            discountSubtext: "Best Value Package!"
        },
        {
            id: "progressive",
            name: "Progressive Track",
            subtitle: "Start at Level 1",
            price: "₨5,000",
            duration: "Per Level",
            description: "Start at Level 1, unlock the next level after each IT-vate certificate",
            features: [
                "Start from Level 1",
                "Unlock Next Level After Certificate",
                "₨5,000 per level",
                "Step-by-Step Learning"
            ],
            cta: "Select Progressive Track",
            popular: false,
            badge: "Anyone Starting New",
            icon: <BookOpen className="w-8 h-8" />,
            color: "border-primary hover:border-primary/80 ring-2 ring-primary/20",
            hasDiscount: true,
            discountText: "Early Bird 40% OFF",
            discountSubtext: "Limited Time Offer!"
        },
        {
            id: "direct",
            name: "Direct Entry/Fast Track",
            subtitle: "Jump to Level 2/Level 3 via test",
            price: "₨8,000",
            duration: "Per Level",
            description: "Take a 15-minute assessment test to determine your starting level",
            testDetails: [
                { score: "≥50%", access: "Level 2 Access" },
                { score: "≥75%", access: "Level 3 Access" }
            ],
            features: [
                "15-minute Assessment Test",
                "Score ≥50% → Level 2 Access",
                "Score ≥75% → Level 3 Access",
                "₨8,000 per level"
            ],
            cta: "Select Direct Entry",
            popular: false,
            badge: "Fast-Track for Pros",
            icon: <Zap className="w-8 h-8" />,
            color: "border-primary hover:border-primary/80 ring-2 ring-primary/20"
        },
        {
            id: "special",
            name: "Special Track",
            subtitle: "Any level - One on One Training",
            price: "Contact Us",
            duration: "Flexible",
            description: "Personalized one-on-one training for any level",
            features: [
                "One-on-One Training",
                "Any Level Available",
                "Personalized Approach",
                "Flexible Schedule"
            ],
            cta: "Select Special Track",
            popular: false,
            badge: "Personalized Training",
            icon: <User className="w-8 h-8" />,
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
                            Choose Your Track
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Four ways to enroll, one goal: professional excellence.
                        </p>
                        <p className="text-lg opacity-90">
                            Select the track that matches your learning goals and experience level.
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

            {/* Step 1 - Complete */}
            <div className="flex flex-col items-center min-w-[140px]">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                    ✓
                </div>
                <h3 className="text-sm font-semibold text-green-600 text-center">Create Your Profile</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
            </div>

            {/* Connector Line */}
            <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

            {/* Step 2 - Active */}
            <div className="flex flex-col items-center min-w-[140px]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                    2
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                            Current Step
                        </span>
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-primary text-center">Choose Your Track</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Bundle or progressive</p>
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



            {/* Package Selection */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Training Tracks
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Choose the track that best fits your experience level and learning objectives.
                            </p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="relative"
                                >
                                    {/* Main card with conditional blur */}
                                    <div
                                        className={`relative bg-white rounded-xl shadow-lg border-2 ${pkg.color} transition-all duration-300 hover:shadow-xl group flex flex-col h-full ${
                                            (pkg.id === 'direct' || pkg.id === 'special') ? 'blur-sm pointer-events-none' : ''
                                        }`}
                                    >
                                        {/* Top badges - Recommended and Best for Students */}
                                        {pkg.popular && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                                <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                    Recommended
                                                </div>
                                            </div>
                                        )}

                                        {!pkg.popular && pkg.hasDiscount && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                                <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                    Best for Students
                                                </div>
                                            </div>
                                        )}

                                        {!pkg.popular && !pkg.hasDiscount && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                                                <div className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg bg-primary text-white">
                                                    {pkg.badge}
                                                </div>
                                            </div>
                                        )}

                                        {/* Discount Banner for cards 1 and 2 - Positioned to not overlap */}
                                        {pkg.hasDiscount && (
                                            <div className="absolute -top-2 -right-3 z-10">
                                                <div className="relative">
                                                    <div className={`${
                                                        pkg.id === 'complete' 
                                                            ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                                            : 'bg-gradient-to-r from-orange-500 to-red-500'
                                                    } text-white px-3 py-1.5 rounded-lg shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300`}>
                                                        <div className="text-center">
                                                            <div className="text-xs font-bold leading-tight">
                                                                {pkg.discountText}
                                                            </div>
                                                            <div className="text-[10px] opacity-90">
                                                                {pkg.discountSubtext}
                                                            </div>
                                                        </div>
                                                        {/* Banner tail */}
                                                        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent ${
                                                            pkg.id === 'complete' 
                                                                ? 'border-t-green-600' 
                                                                : 'border-t-red-500'
                                                        }`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 flex flex-col h-full">
                                            {/* Header */}
                                            <div className="text-center mb-6">
                                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                                                    pkg.popular ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                                                }`}>
                                                    {pkg.icon}
                                                </div>
                                                <h3 className="text-lg font-bold text-neutral-800 mb-2">
                                                    {pkg.name}
                                                </h3>
                                                <p className="text-neutral-600 mb-3 text-sm">{pkg.subtitle}</p>
                                                <p className="text-neutral-700 text-sm">{pkg.description}</p>
                                            </div>

                                            {/* Pricing */}
                                            <div className="text-center mb-6 p-4 bg-neutral-50 rounded-lg">
                                                <div className="text-2xl font-bold text-neutral-800 mb-1">
                                                    {pkg.price}
                                                </div>
                                                <div className="flex items-center justify-center text-neutral-600 text-sm">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    <span className="text-xs">{pkg.duration}</span>
                                                </div>
                                            </div>

                                            {/* Test Details for Direct Entry */}
                                            {pkg.id === 'direct' && pkg.testDetails && (
                                                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                                    <h4 className="text-xs font-semibold text-primary mb-2">Assessment Results:</h4>
                                                    <div className="space-y-1">
                                                        {pkg.testDetails.map((detail, index) => (
                                                            <div key={index} className="flex items-center justify-between text-xs">
                                                                <span className="font-medium text-primary">{detail.score}</span>
                                                                <span className="text-neutral-600">→ {detail.access}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Features */}
                                            <div className="mb-6 flex-grow">
                                                <h4 className="font-semibold text-neutral-800 mb-3 text-sm">What's Included:</h4>
                                                <div className="space-y-2">
                                                    {pkg.features.map((feature, index) => (
                                                        <div key={index} className="flex items-start">
                                                            <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                                                                pkg.popular ? 'text-primary' : 'text-primary'
                                                            }`} />
                                                            <span className="text-neutral-700 text-xs">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA - This will be pushed to bottom */}
                                            <div className="text-center mt-auto">
                                                <Button
                                                    onClick={() => handleSelectPackage(pkg.id)}
                                                    disabled={loading || (pkg.id === 'direct' || pkg.id === 'special')}
                                                    className={`w-full py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                                                        pkg.popular 
                                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg' 
                                                            : 'bg-primary hover:bg-primary/90 text-white'
                                                    } ${loading && selectedPackage === pkg.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {loading && selectedPackage === pkg.id ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            {pkg.cta}
                                                            <ChevronRight className="w-4 h-4 ml-2" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lock overlay for cards 3 and 4 - OUTSIDE the blurred div */}
                                    {(pkg.id === 'direct' || pkg.id === 'special') && (
                                        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl z-30 pointer-events-none">
                                            <Lock className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>


                        {/* Additional Info */}
                        <div className="mt-12 text-center">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <Info size={24} className="text-primary mt-1" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                                            Expert Track Benefits
                                        </h3>
                                        <p className="text-neutral-600">
                                            The Expert Track package provides all 3 levels with a 20% discount and ensures 
                                            continuous learning progression at significant savings. Perfect for students and 
                                            early-career professionals committed to mastering PCB design.
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
