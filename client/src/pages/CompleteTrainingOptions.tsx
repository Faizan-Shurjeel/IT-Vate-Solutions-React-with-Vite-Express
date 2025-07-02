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
                title: "Expert Track",
                price: "₨12,000",
                originalPrice: "₨15,000",
                discount: "20% OFF",
                duration: "All 3 Levels",
                description: "Complete mastery of PCB design with all levels included in one comprehensive package.",
                features: [
                    "Level 1: PCB Design Fundamentals",
                    "Level 2: Advanced PCB Techniques", 
                    "Level 3: Professional PCB Mastery",
                    "Certificate for Each Level",
                    "Direct Instructor Support",
                    "Project-Based Learning"
                ],
                savings: "₨3,000"
            };
        }

        const option = options.find(opt => opt.id === selectedOption);
        return {
            title: option?.name || "Expert Track",
            price: option?.price || "₨12,000",
            originalPrice: option?.originalPrice || "₨15,000",
            discount: option?.discount || "20% OFF",
            duration: option?.duration || "All 3 Levels",
            description: option?.description || "",
            features: option?.features || [],
            savings: "₨3,000"
        };
    };

    const current = getSelectedOptionData();

    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Crown className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Expert Track</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Complete PCB Design Mastery</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">All 3 Levels Included</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-3xl font-bold text-neutral-800">
                                {current.price}
                            </div>
                            <div className="text-right">
                                <div className="text-lg text-neutral-500 line-through">
                                    {current.originalPrice}
                                </div>
                                <div className="text-sm font-semibold text-green-600">
                                    {current.discount}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-neutral-600 mb-3">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{current.duration}</span>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center text-green-700">
                                <Star className="w-4 h-4 mr-1" />
                                <span className="text-sm font-semibold">You save {current.savings}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bundle Benefits */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">Bundle Benefits:</h5>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <Package className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-neutral-700 text-xs">All 3 levels in one purchase</span>
                            </div>
                            <div className="flex items-start">
                                <Award className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-neutral-700 text-xs">20% discount compared to individual levels</span>
                            </div>
                            <div className="flex items-start">
                                <Target className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-neutral-700 text-xs">Continuous learning progression</span>
                            </div>
                            <div className="flex items-start">
                                <GraduationCap className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-neutral-700 text-xs">Complete PCB design mastery</span>
                            </div>
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">Complete Learning Path:</h5>
                        <div className="space-y-2">
                            {current.features.slice(0, 6).map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-neutral-700 text-xs">{feature}</span>
                                </div>
                            ))}
                            {current.features.length > 6 && (
                                <div className="text-xs text-neutral-500 mt-2">
                                    +{current.features.length - 6} more features
                                </div>
                            )}
                        </div>
                    </div>

                  

                    {/* Continue Button */}
                    <div className="pt-4 border-t border-neutral-200">
                        <Button
                            onClick={() => onContinue('bundle')}
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
                                    Continue to Payment
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CompleteTrainingOptions = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSelectOption = async () => {
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
                selectedOption: "bundle",
                optionSelectedAt: new Date(),
            });

            // Navigate to payment
            setLocation("/payment");
        } catch (error) {
            console.error("Error updating option selection:", error);
            alert("Failed to select option. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        handleSelectOption();
    };

    const handleGoBack = () => {
        setLocation("/packages");
    };

    const options = [
        {
            id: "bundle",
            name: "Expert Track",
            subtitle: "All 3 Levels at Once",
            price: "₨12,000",
            originalPrice: "₨15,000",
            discount: "20% OFF",
            duration: "All 3 Levels",
            description: "Get all 3 levels with maximum savings and continuous learning progression. This comprehensive bundle ensures you master every aspect of PCB design from fundamentals to professional-level expertise.",
            features: [
                "Level 1: PCB Design Fundamentals",
                "Level 2: Advanced PCB Techniques", 
                "Level 3: Professional PCB Mastery",
               
                "Certificate for Each Level",
                "Direct Instructor Support",
                "Industry-Standard Tools Training",
                "Real-World Project Portfolio"
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
                            Expert Track
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Complete PCB Design Mastery - All 3 Levels Included
                        </p>
                        <p className="text-lg opacity-90">
                            Master PCB design from fundamentals to professional expertise with 20% savings.
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

            {/* Step 2 - Complete */}
            <div className="flex flex-col items-center min-w-[140px]">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                    ✓
                </div>
                <h3 className="text-sm font-semibold text-green-600 text-center">Choose Your Track</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
            </div>

            {/* Connector Line */}
            <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

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
                <h3 className="text-sm font-semibold text-primary text-center">Confirm Your Track</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Review your choice</p>
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

            {/* Bundle Overview with Price Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Expert Track Overview
                            </h2>
                            <p className="text-lg text-neutral-600">
                                You've selected the Expert Track. This track includes all 3 levels with maximum savings and comprehensive learning.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Bundle Details */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl shadow-lg border-2 border-primary/30 p-8">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            Recommended Bundle
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-6 mb-8">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Package className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                                                Complete PCB Design Mastery
                                            </h3>
                                            <p className="text-neutral-600 mb-4">
                                                This comprehensive bundle provides everything you need to become a PCB design expert. 
                                                From basic fundamentals to advanced professional techniques, you'll master every aspect 
                                                of PCB design with significant cost savings.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Level Details */}
                                    <div className="space-y-6 mb-8">
                                        <div className="border border-neutral-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-neutral-800 mb-2 flex items-center">
                                                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</div>
                                                Level 1: Beginner
                                            </h4>
                                            <p className="text-sm text-neutral-600 mb-2">Foundations of Schematic and PCB Design</p>
                                           
                                        </div>

                                        <div className="border border-neutral-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-neutral-800 mb-2 flex items-center">
                                                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</div>
                                                Level 2: Intermediate
                                            </h4>
                                            <p className="text-sm text-neutral-600 mb-2">Intermediate PCB Design and Manufacturing Readiness</p>
                                            
                                        </div>

                                        <div className="border border-neutral-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-neutral-800 mb-2 flex items-center">
                                                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</div>
                                                Level 3: Advanced
                                            </h4>
                                            <p className="text-sm text-neutral-600 mb-2">Advanced PCB Design and System Integration</p>
                                           
                                        </div>
                                    </div>

                                    {/* Bundle Benefits */}
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
                                            <Star className="w-5 h-5 text-yellow-500 mr-2" />
                                            Bundle Benefits
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-start">
                                                <Award className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-neutral-700">Save ₨3,000 (20% discount)</span>
                                            </div>
                                            <div className="flex items-start">
                                                <Target className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-neutral-700">Continuous learning progression</span>
                                            </div>
                                            <div className="flex items-start">
                                                <GraduationCap className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-neutral-700">Complete skill mastery</span>
                                            </div>
                                            <div className="flex items-start">
                                                <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-neutral-700">All certificates included</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price Pane */}
                            <div className="hidden lg:block">
                                <PricePane 
                                    selectedOption="bundle" 
                                    options={options}
                                    onContinue={handleContinue}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        {/* Mobile Price Summary */}
                        <div className="lg:hidden mt-8">
                            <PricePane 
                                selectedOption="bundle" 
                                options={options}
                                onContinue={handleContinue}
                                loading={loading}
                            />
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
                                            Why Choose the Expert Track?
                                        </h3>
                                        <div className="space-y-2 text-neutral-600">
                                            <p>
                                                <strong>Maximum Value:</strong> Get all 3 levels for ₨12,000 instead of ₨15,000 - saving you ₨3,000 with our 20% bundle discount.
                                            </p>
                                            <p>
                                                <strong>Complete Learning Path:</strong> Progress seamlessly from fundamentals to professional mastery without interruption.
                                            </p>
                                            <p>
                                                <strong>Industry Recognition:</strong> Earn certificates for all 3 levels, demonstrating comprehensive PCB design expertise to employers.
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
