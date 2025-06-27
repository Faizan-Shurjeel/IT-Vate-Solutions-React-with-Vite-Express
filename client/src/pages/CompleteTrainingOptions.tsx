import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Price Pane Component
const PricePane = ({ selectedOption, options, onContinue, loading }) => {
    const getSelectedOptionData = () => {
        if (!selectedOption) {
            return {
                title: "Select an Option",
                price: "-",
                originalPrice: null,
                discount: null,
                duration: "Choose your path",
                description: "Please select a training option to see pricing details.",
                features: ["Select an option to view details"],
                savings: null
            };
        }

        const option = options.find(opt => opt.id === selectedOption);
        return {
            title: option?.name || "Select an Option",
            price: option?.price || "-",
            originalPrice: option?.originalPrice || null,
            discount: option?.discount || null,
            duration: option?.duration || "",
            description: option?.description || "",
            features: option?.features || [],
            savings: option?.id === 'bundle' ? "₨3,000" : null
        };
    };

    const current = getSelectedOptionData();

    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Calculator className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Price Summary</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Your selected option details</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">{current.title}</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-3xl font-bold text-neutral-800">
                                {current.price}
                            </div>
                            {current.originalPrice && (
                                <div className="text-right">
                                    <div className="text-lg text-neutral-500 line-through">
                                        {current.originalPrice}
                                    </div>
                                    <div className="text-sm font-semibold text-green-600">
                                        {current.discount}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center text-neutral-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{current.duration}</span>
                        </div>
                        {current.savings && (
                            <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                                <div className="flex items-center text-green-700">
                                    <Star className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-semibold">You save {current.savings}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm mb-4">{current.description}</p>

                    {/* Features */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">What's Included:</h5>
                        <div className="space-y-2">
                            {current.features.slice(0, 4).map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-neutral-700 text-xs">{feature}</span>
                                </div>
                            ))}
                            {current.features.length > 4 && (
                                <div className="text-xs text-neutral-500 mt-2">
                                    +{current.features.length - 4} more features
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Continue Button */}
                    {selectedOption && (
                        <div className="pt-4 border-t border-neutral-200">
                            <Button
                                onClick={() => onContinue(selectedOption)}
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold rounded-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CompleteTrainingOptions = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [lockedOption, setLockedOption] = useState(null);

    const handleSelectOption = async (optionType) => {
        if (!user) {
            alert("Please log in to continue");
            setLocation("/register");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedPackage: "complete",
                selectedOption: optionType,
                optionSelectedAt: new Date(),
            });

            // Navigate based on selection
            if (optionType === "bundle") {
                setLocation("/payment"); // Go straight to Step 4 (Payment)
            } else {
                setLocation("/level-selection"); // Go to level selection with Level 1 forced
            }
        } catch (error) {
            console.error("Error updating option selection:", error);
            alert("Failed to select option. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLockOption = (optionId) => {
        setLockedOption(optionId);
    };

    const handleContinue = (optionId) => {
        handleSelectOption(optionId);
    };

    const handleGoBack = () => {
        setLocation("/packages");
    };

    const options = [
        {
            id: "bundle",
            name: "Complete Training Bundle",
            subtitle: "All 3 Levels at Once",
            price: "₨12,000",
            originalPrice: "₨15,000",
            discount: "20% OFF",
            duration: "All Levels",
            description: "Get all 3 levels with maximum savings and continuous learning progression",
            features: [
                "All 3 Levels Included",
                "20% Discount Applied",
                "Continuous Learning Path",
                "Maximum Value",
                "Single Payment",
                "Complete Certification Track"
            ],
            cta: "Select Bundle Option",
            recommended: true,
            badge: "Best Value",
            icon: <Package className="w-8 h-8" />,
            benefits: [
                "Save ₨3,000 compared to individual levels",
                "Guaranteed progression through all levels",
                "Complete mastery of PCB design"
            ]
        },
        {
            id: "level-by-level",
            name: "Level-by-Level Progression",
            subtitle: "Start with Level 1",
            price: "₨5,000",
            duration: "Per Level",
            description: "Start at Level 1, unlock the next level after each IT-vate certificate",
            features: [
                "Start from Level 1 (Required)",
                "Unlock Next Level After Certificate",
                "₨5,000 per level",
                "Step-by-Step Learning",
                "Flexible Payment Schedule",
                "Progress at Your Own Pace"
            ],
            cta: "Select Level-by-Level",
            recommended: false,
            badge: "Flexible Payment",
            icon: <GraduationCap className="w-8 h-8" />,
            benefits: [
                "Pay as you progress",
                "Flexible learning schedule",
                "Same quality training"
            ]
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Crown size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Complete Training Options
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Choose how you'd like to structure your complete training journey.
                        </p>
                        <p className="text-lg opacity-90">
                            Bundle for maximum savings or level-by-level for flexible payments.
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
                            <h3 className="text-sm font-semibold text-green-600 text-center">Choose Your Track</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Complete Training Selected</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

                        {/* Step 3A - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                3A
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Select Your Option</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Bundle or Level-by-Level</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Payment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Make payment</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back Button */}
            <section className="py-4 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <Button
                        onClick={handleGoBack}
                        variant="ghost"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Track Selection
                    </Button>
                </div>
            </section>

            {/* Options Selection with Price Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Complete Training Options
                            </h2>
                            <p className="text-lg text-neutral-600">
                                You've selected Complete Training. Now choose how you'd like to structure your learning journey.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Options Cards */}
                            <div className="lg:col-span-2 space-y-6">
                                {options.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl group cursor-pointer ${
                                            lockedOption === option.id 
                                                ? 'border-primary ring-2 ring-primary/20' 
                                                : 'border-primary/30 hover:border-primary/60'
                                        }`}
                                        onClick={() => handleLockOption(option.id)}
                                    >
                                        {option.recommended && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                    Recommended
                                                </div>
                                            </div>
                                        )}

                                        {!option.recommended && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                                <div className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg bg-primary text-white">
                                                    {option.badge}
                                                </div>
                                            </div>
                                        )}

                                        {/* Selection Indicator */}
                                        {lockedOption === option.id && (
                                            <div className="absolute top-4 right-4">
                                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="flex items-start space-x-4">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                                    lockedOption === option.id 
                                                        ? 'bg-primary text-white' 
                                                        : 'bg-primary/10 text-primary'
                                                }`}>
                                                    {option.icon}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                                                        {option.name}
                                                    </h3>
                                                    <p className="text-neutral-600 text-sm mb-2">{option.subtitle}</p>
                                                    <p className="text-neutral-700 text-sm mb-4">{option.description}</p>

                                                    {/* Quick Features */}
                                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                                        {option.features.slice(0, 4).map((feature, index) => (
                                                            <div key={index} className="flex items-center">
                                                                <Check className="w-3 h-3 mr-1 text-primary flex-shrink-0" />
                                                                <span className="text-xs text-neutral-600">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Status Text */}
                                                    <div className="text-center">
                                                        {lockedOption === option.id ? (
                                                            <div className="text-primary font-semibold text-sm">
                                                                ✓ Selected - Use Continue button to proceed
                                                            </div>
                                                        ) : (
                                                            <div className="text-neutral-500 text-sm">
                                                                Click to select this option
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Pane */}
                            <div className="hidden lg:block">
                                <PricePane 
                                    selectedOption={lockedOption} 
                                    options={options}
                                    onContinue={handleContinue}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        {/* Mobile Price Summary */}
                        <div className="lg:hidden mt-8">
                            {lockedOption && (
                                <PricePane 
                                    selectedOption={lockedOption} 
                                    options={options}
                                    onContinue={handleContinue}
                                    loading={loading}
                                />
                            )}
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
                                            Payment Structure Information
                                        </h3>
                                        <div className="space-y-2 text-neutral-600">
                                            <p>
                                                <strong>Bundle Option:</strong> Pay ₨12,000 once and get immediate access to all 3 levels with 20% savings.
                                            </p>
                                            <p>
                                                <strong>Level-by-Level:</strong> Start with Level 1 (₨5,000), then unlock Level 2 and Level 3 after completing each certificate.
                                            </p>
                                        </div>
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

export default CompleteTrainingOptions;
