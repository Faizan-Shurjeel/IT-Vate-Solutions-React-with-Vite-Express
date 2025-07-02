import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Price Pane Component
const PricePane = ({ selectedLevel, levels, onContinue, loading }) => {
    const getSelectedLevelData = () => {
        const level = levels.find(lvl => lvl.id === selectedLevel);
        return {
            title: level?.name || "Level 1",
            price: level?.price || "₨5,000",
            duration: level?.duration || "4 Weeks",
            description: level?.description || "Start your PCB design journey",
            features: level?.features || [],
            nextLevel: level?.nextLevel || null
        };
    };

    const current = getSelectedLevelData();

    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Calculator className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Enrollment Summary</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Progressive Track - Level 1</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">{current.title}</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="text-3xl font-bold text-neutral-800 mb-2">
                            {current.price}
                        </div>
                        <div className="flex items-center text-neutral-600 mb-3">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{current.duration}</span>
                        </div>
                        <div className="p-2 bg-primary/5 rounded border border-primary/20">
                            <div className="flex items-center text-primary">
                                <Info className="w-4 h-4 mr-1" />
                                <span className="text-xs font-semibold">Pay per level as you progress</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm mb-4">{current.description}</p>

                    {/* Features */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">What's Included:</h5>
                        <div className="space-y-2">
                            {current.features.map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-neutral-700 text-xs">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Level Info */}
                    {current.nextLevel && (
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2 text-sm">After Completion:</h5>
                            <div className="flex items-center text-blue-700">
                                <Trophy className="w-4 h-4 mr-2" />
                                <span className="text-xs">Unlock {current.nextLevel} after certificate</span>
                            </div>
                        </div>
                    )}

                    {/* Continue Button */}
                    {selectedLevel && (
                        <div className="pt-4 border-t border-neutral-200">
                            <Button
                                onClick={() => onContinue(selectedLevel)}
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
                                        Enroll in Level 1
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

const ProgressivePathEnrollment = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedLevel] = useState("level-1"); // Always Level 1 for Progressive Track

    const handleEnroll = async (levelId) => {
        if (!user) {
            alert("Please log in to continue");
            setLocation("/register");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedPackage: "progressive",
                selectedLevel: levelId,
                enrollmentAt: new Date(),
            });

            // Navigate to payment
            setLocation("/payment");
        } catch (error) {
            console.error("Error updating enrollment:", error);
            alert("Failed to enroll. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setLocation("/packages");
    };

    const levels = [
        {
            id: "level-1",
            name: "Level 1 - Foundation",
            price: "₨5,000",
            duration: "4 Weeks",
            description: "Build your foundation in PCB design with essential concepts and basic circuit design principles.",
            features: [
                "Introduction to PCB Design",
                "Basic Circuit Principles",
                "Component Selection",
                "Schematic Design Basics",
                "Design Rules & Guidelines",
                "Hands-on Project",
                "IT-vate Certificate upon completion"
            ],
            nextLevel: "Level 2",
            selectable: true,
            status: "available"
        },
        {
            id: "level-2",
            name: "Level 2 - Intermediate",
            price: "₨5,000",
            duration: "4 Weeks",
            description: "Advance your skills with intermediate PCB design techniques and layout optimization.",
            features: [
                "Advanced Layout Techniques",
                "Signal Integrity Basics",
                "Multi-layer PCB Design",
                "Component Placement Optimization",
                "Routing Strategies",
                "Design Verification",
                "IT-vate Certificate upon completion"
            ],
            nextLevel: "Level 3",
            selectable: false,
            status: "locked",
            requirement: "Complete Level 1"
        },
        {
            id: "level-3",
            name: "Level 3 - Advanced",
            price: "₨5,000",
            duration: "4 Weeks",
            description: "Master advanced PCB design with high-speed design, EMI/EMC considerations, and professional workflows.",
            features: [
                "High-Speed PCB Design",
                "EMI/EMC Considerations",
                "Advanced Signal Integrity",
                "Professional Design Workflows",
                "Industry Best Practices",
                "Portfolio Project",
                "IT-vate Master Certificate"
            ],
            nextLevel: null,
            selectable: false,
            status: "locked",
            requirement: "Complete Level 2"
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <BookOpen size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Progressive Track Enrollment
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Start your journey with Level 1 and unlock each level as you progress.
                        </p>
                        <p className="text-lg opacity-90">
                            Pay per level and advance at your own pace with certificates.
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

            {/* Level Selection with Price Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Progressive Track - Level 1 Enrollment
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Start with Level 1 to build your foundation. Additional levels unlock after completing each certificate.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Level Cards */}
                            <div className="lg:col-span-2 space-y-6">
                                {levels.map((level, index) => (
                                    <div
                                        key={level.id}
                                        className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                                            level.selectable 
                                                ? 'border-primary ring-2 ring-primary/20 hover:shadow-xl' 
                                                : 'border-neutral-200 opacity-60'
                                        }`}
                                    >
                                        {/* Level Number Badge */}
                                        <div className="absolute -top-3 left-6">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                                                level.selectable 
                                                    ? 'bg-primary text-white' 
                                                    : 'bg-neutral-400 text-white'
                                            }`}>
                                                Level {index + 1}
                                            </div>
                                        </div>

                                        {/* Lock Icon for Locked Levels */}
                                        {!level.selectable && (
                                            <div className="absolute top-4 right-4">
                                                <Lock className="w-6 h-6 text-neutral-400" />
                                            </div>
                                        )}

                                        {/* Available Badge for Level 1 */}
                                        {level.selectable && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                    Available Now
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="flex items-start space-x-4">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                                    level.selectable 
                                                        ? 'bg-primary text-white' 
                                                        : 'bg-neutral-200 text-neutral-400'
                                                }`}>
                                                    {level.selectable ? <BookOpen className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                                                        {level.name}
                                                    </h3>
                                                    <p className="text-neutral-600 text-sm mb-2">
                                                        {level.selectable ? level.price + " • " + level.duration : level.requirement}
                                                    </p>
                                                    <p className="text-neutral-700 text-sm mb-4">{level.description}</p>

                                                    {/* Quick Features */}
                                                    <div className="grid grid-cols-1 gap-2 mb-4">
                                                        {level.features.slice(0, 3).map((feature, index) => (
                                                            <div key={index} className="flex items-center">
                                                                <Check className={`w-3 h-3 mr-2 flex-shrink-0 ${
                                                                    level.selectable ? 'text-primary' : 'text-neutral-400'
                                                                }`} />
                                                                <span className="text-xs text-neutral-600">{feature}</span>
                                                            </div>
                                                        ))}
                                                        {level.features.length > 3 && (
                                                            <div className="text-xs text-neutral-500 ml-5">
                                                                +{level.features.length - 3} more features
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Status */}
                                                    <div className="text-center">
                                                        {level.selectable ? (
                                                            <div className="text-primary font-semibold text-sm">
                                                                ✓ Ready to enroll
                                                            </div>
                                                        ) : (
                                                            <div className="text-neutral-500 text-sm">
                                                                🔒 Unlocks after completing previous level
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
                                    selectedLevel={selectedLevel}
                                    levels={levels}
                                    onContinue={handleEnroll}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        {/* Mobile Price Summary */}
                        <div className="lg:hidden mt-8">
                            <PricePane 
                                selectedLevel={selectedLevel}
                                levels={levels}
                                onContinue={handleEnroll}
                                loading={loading}
                            />
                        </div>

                        {/* Important Info */}
                        <div className="mt-12">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <Info size={24} className="text-blue-600 mt-1" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                            How Progressive Track Works
                                        </h3>
                                        <div className="space-y-2 text-blue-700">
                                            <p>
                                                <strong>Step 1:</strong> Enroll in Level 1 for ₨5,000 and complete the training.
                                            </p>
                                            <p>
                                                <strong>Step 2:</strong> Earn your IT-vate certificate to unlock Level 2.
                                            </p>
                                            <p>
                                                <strong>Step 3:</strong> Continue to Level 3 after completing Level 2 certificate.
                                            </p>
                                            <p>
                                                <strong>Benefit:</strong> Pay as you progress and advance at your own pace.
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

export default ProgressivePathEnrollment;
