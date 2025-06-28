import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard, Trophy, Brain } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Bundle Selection Pane Component
const BundleSelectionPane = ({ onContinue, loading, userResults }) => {
    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Package className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Bundle Details</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Based on your {userResults?.percentage || 0}% score</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">Direct Entry Bundle</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-3xl font-bold text-neutral-800">
                                ₨20,000
                            </div>
                            <div className="text-right">
                                <div className="text-lg text-neutral-500 line-through">
                                    ₨24,000
                                </div>
                                <div className="text-sm font-semibold text-green-600">
                                    Save ₨4,000
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-neutral-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">All 3 Levels (12 Weeks Total)</span>
                        </div>
                        <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center text-green-700">
                                <Star className="w-4 h-4 mr-1" />
                                <span className="text-xs font-semibold">Complete PCB Design Mastery</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm mb-4">
                        Get complete access to all 3 levels of PCB design training. Perfect for professionals who want comprehensive knowledge.
                    </p>

                    {/* Bundle Features */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">Complete Bundle Includes:</h5>
                        <div className="space-y-2">
                            {[
                                "Level 1: Foundation (4 Weeks)",
                                "Level 2: Intermediate (4 Weeks)", 
                                "Level 3: Advanced (4 Weeks)",
                                "All Course Materials",
                                "3 IT-vate Certificates",
                                "Portfolio Projects",
                                "Industry Best Practices",
                                "Lifetime Access"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-neutral-700 text-xs">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2 text-sm">Bundle Benefits:</h5>
                        <div className="space-y-1">
                            {[
                                "Save ₨4,000 compared to individual levels",
                                "Continuous learning progression",
                                "Complete skill development path"
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center text-blue-700">
                                    <Trophy className="w-3 h-3 mr-2" />
                                    <span className="text-xs">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-4 border-t border-neutral-200">
                        <Button
                            onClick={onContinue}
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
                                    Enroll in Complete Bundle
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

const DirectEntryLevelSelection = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [availableLevels, setAvailableLevels] = useState([]);
    const [userResults, setUserResults] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    // Fetch user data and available levels
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setLocation("/register");
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setAvailableLevels(userData.availableLevels || ["Level 1"]);
                    setUserResults(userData.assessmentResults || null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setAvailableLevels(["Level 1"]); // Default fallback
            } finally {
                setDataLoading(false);
            }
        };

        fetchUserData();
    }, [user, setLocation]);

    const handleSelectBundle = async () => {
        if (!user) {
            alert("Please log in to continue");
            setLocation("/register");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedPackage: "direct",
                selectedLevel: "bundle", // All levels
                selectedOption: "bundle",
                levelSelectedAt: new Date(),
            });

            // Navigate to payment
            setLocation("/payment");
        } catch (error) {
            console.error("Error selecting bundle:", error);
            alert("Failed to select bundle. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setLocation("/exam-results");
    };

    const bundleFeatures = [
        {
            level: "Level 1 - Foundation",
            duration: "4 Weeks",
            features: [
                "Introduction to PCB Design",
                "Basic Circuit Principles", 
                "Component Selection",
                "Schematic Design Basics"
            ],
            icon: <BookOpen className="w-6 h-6" />,
            color: "text-blue-600"
        },
        {
            level: "Level 2 - Intermediate", 
            duration: "4 Weeks",
            features: [
                "Advanced Layout Techniques",
                "Signal Integrity Basics",
                "Multi-layer PCB Design",
                "Component Placement Optimization"
            ],
            icon: <Target className="w-6 h-6" />,
            color: "text-orange-600"
        },
        {
            level: "Level 3 - Advanced",
            duration: "4 Weeks", 
            features: [
                "High-Speed PCB Design",
                "EMI/EMC Considerations",
                "Advanced Signal Integrity",
                "Professional Design Workflows"
            ],
            icon: <Award className="w-6 h-6" />,
            color: "text-purple-600"
        }
    ];

    if (dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading bundle details...</p>
                </div>
            </div>
        );
    }

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Package size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Direct Entry Complete Bundle
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Based on your assessment score of {userResults?.percentage || 0}%, get complete access to all levels.
                        </p>
                        <p className="text-lg opacity-90">
                            Master PCB design from foundation to advanced with our comprehensive bundle.
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

                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 2 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Training Overview</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 3 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Choose Your Track</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Direct Entry Selected</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 3C - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Assessment Complete</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">{userResults?.percentage || 0}% Score</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

                        {/* Step 4 - Current */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                4
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Select Bundle</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Complete package</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Payment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Complete enrollment</p>
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
                        Back to Results
                    </Button>
                </div>
            </section>

            {/* Bundle Selection with Details Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Complete PCB Design Bundle
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Get comprehensive training across all 3 levels with significant savings.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Bundle Overview */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Main Bundle Card */}
                                <div className="bg-white rounded-xl shadow-lg border-2 border-primary ring-2 ring-primary/20 p-8">
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                                            Direct Entry Complete Bundle
                                        </h3>
                                        <p className="text-neutral-600">All 3 levels included with maximum value</p>
                                    </div>

                                    <div className="text-center mb-6 p-6 bg-neutral-50 rounded-lg">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="text-4xl font-bold text-primary">₨20,000</div>
                                            <div className="ml-4">
                                                <div className="text-xl text-neutral-500 line-through">₨24,000</div>
                                                <div className="text-sm font-semibold text-green-600">Save ₨4,000</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center text-neutral-600">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>12 Weeks Total Duration</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-primary font-semibold text-lg mb-2">
                                            ✓ Perfect for your {userResults?.percentage || 0}% assessment score
                                        </div>
                                        <p className="text-neutral-600 text-sm">
                                            Complete your PCB design journey from foundation to mastery
                                        </p>
                                    </div>
                                </div>

                                {/* Level Breakdown */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-neutral-800">What's Included in Your Bundle:</h3>
                                    {bundleFeatures.map((level, index) => (
                                        <div key={index} className="bg-white rounded-lg shadow border border-neutral-200 p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center ${level.color}`}>
                                                    {level.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="text-lg font-semibold text-neutral-800">{level.level}</h4>
                                                        <span className="text-sm text-neutral-500">{level.duration}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {level.features.map((feature, idx) => (
                                                            <div key={idx} className="flex items-center">
                                                                <Check className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                                                                <span className="text-xs text-neutral-600">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bundle Selection Pane */}
                            <div className="hidden lg:block">
                                <BundleSelectionPane 
                                    onContinue={handleSelectBundle}
                                    loading={loading}
                                    userResults={userResults}
                                />
                            </div>
                        </div>

                        {/* Mobile Bundle Selection */}
                        <div className="lg:hidden mt-8">
                            <BundleSelectionPane 
                                onContinue={handleSelectBundle}
                                loading={loading}
                                userResults={userResults}
                            />
                        </div>

                        {/* Assessment Summary */}
                        <div className="mt-12">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <Brain size={24} className="text-blue-600 mt-1" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                            Your Assessment Results
                                        </h3>
                                        <div className="space-y-2 text-blue-700">
                                            <p>
                                                <strong>Score:</strong> {userResults?.percentage || 0}% ({userResults?.score || 0}/{userResults?.totalQuestions || 5} questions correct)
                                            </p>
                                            <p>
                                                <strong>Available Levels:</strong> {availableLevels.join(", ")}
                                            </p>
                                            <p>
                                                <strong>Recommendation:</strong> Complete Bundle gives you access to all levels with significant savings and continuous learning progression.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Bundle */}
                        <div className="mt-8">
                            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6 text-center">Why Choose the Complete Bundle?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Star className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-neutral-800 mb-2">Maximum Savings</h4>
                                        <p className="text-sm text-neutral-600">Save ₨4,000 compared to individual level purchases</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-neutral-800 mb-2">Complete Mastery</h4>
                                        <p className="text-sm text-neutral-600">From beginner to expert in one comprehensive journey</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-neutral-800 mb-2">Continuous Progress</h4>
                                        <p className="text-sm text-neutral-600">Seamless progression through all skill levels</p>
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

export default DirectEntryLevelSelection;
