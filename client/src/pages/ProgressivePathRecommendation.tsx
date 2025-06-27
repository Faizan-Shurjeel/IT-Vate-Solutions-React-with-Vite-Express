import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard, Trophy, Brain, AlertCircle, TrendingUp, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Recommendation Pane Component
const RecommendationPane = ({ onContinue, loading, userResults }) => {
    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Lightbulb className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Our Recommendation</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Based on your {userResults?.percentage || 0}% score</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-4">Progressive Path</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="text-3xl font-bold text-neutral-800 mb-2">
                            ₨5,000
                        </div>
                        <div className="flex items-center text-neutral-600 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">Per Level (4 Weeks each)</span>
                        </div>
                        <div className="p-2 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center text-green-700">
                                <Trophy className="w-4 h-4 mr-1" />
                                <span className="text-xs font-semibold">Start with Level 1</span>
                            </div>
                        </div>
                    </div>

                    {/* Why This Path */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">Why This Path is Perfect for You:</h5>
                        <div className="space-y-2">
                            {[
                                "Build strong fundamentals from the ground up",
                                "Learn at your own pace with step-by-step guidance",
                                "Pay as you progress - no large upfront cost",
                                "Unlock next level only after mastering current one",
                                "Gain confidence with each completed level"
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                                    <span className="text-neutral-700 text-xs">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Success Rate */}
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2 text-sm">Success Statistics:</h5>
                        <div className="text-blue-700 text-xs">
                            <p>• 95% of students who start with Progressive Path complete Level 1</p>
                            <p>• 87% continue to Level 2 after certification</p>
                            <p>• Average improvement: 40% better performance in Level 2</p>
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
                                    Start with Progressive Path
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

const ProgressivePathRecommendation = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userResults, setUserResults] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    // Fetch user assessment results
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
                    setUserResults(userData.assessmentResults || null);
                    
                    // If user somehow has good score, redirect them
                    if (userData.assessmentResults?.percentage >= 50) {
                        setLocation("/direct-entry-level-selection");
                        return;
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchUserData();
    }, [user, setLocation]);

    const handleContinueToProgressive = async () => {
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
                selectedLevel: "level-1",
                packageRecommendedAt: new Date(),
                fromAssessment: true
            });

            // Navigate to progressive path enrollment (Level 1)
            setLocation("/progressive-path-enrollment");
        } catch (error) {
            console.error("Error selecting progressive path:", error);
            alert("Failed to select path. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setLocation("/exam-results");
    };

    const improvementAreas = [
        {
            title: "PCB Fundamentals",
            description: "Basic circuit principles and component understanding",
            icon: <Target className="w-6 h-6" />,
            color: "bg-orange-50 border-orange-200 text-orange-700"
        },
        {
            title: "Schematic Design",
            description: "Creating clear and accurate schematic diagrams",
            icon: <FileText className="w-6 h-6" />,
            color: "bg-blue-50 border-blue-200 text-blue-700"
        },
        {
            title: "Layout Basics",
            description: "Component placement and basic routing principles",
            icon: <BookOpen className="w-6 h-6" />,
            color: "bg-green-50 border-green-200 text-green-700"
        }
    ];

    const progressionPath = [
        {
            level: "Level 1",
            title: "Foundation",
            duration: "4 Weeks",
            price: "₨5,000",
            description: "Master the fundamentals with hands-on practice",
            outcomes: ["Basic PCB design skills", "Schematic creation", "Component selection"],
            certificate: "IT-vate Foundation Certificate"
        },
        {
            level: "Level 2", 
            title: "Intermediate",
            duration: "4 Weeks",
            price: "₨5,000",
            description: "Advance to intermediate techniques and multi-layer design",
            outcomes: ["Signal integrity basics", "Advanced routing", "Design verification"],
            certificate: "IT-vate Intermediate Certificate",
            locked: true
        },
        {
            level: "Level 3",
            title: "Advanced", 
            duration: "4 Weeks",
            price: "₨5,000",
            description: "Master professional workflows and high-speed design",
            outcomes: ["High-speed PCB design", "EMI/EMC considerations", "Professional workflows"],
            certificate: "IT-vate Master Certificate",
            locked: true
        }
    ];

    if (dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading recommendations...</p>
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
                        <Lightbulb size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            We Recommend Progressive Path
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Based on your assessment score of {userResults?.percentage || 0}%, starting with Level 1 will give you the strongest foundation.
                        </p>
                        <p className="text-lg opacity-90">
                            Build your skills step-by-step and unlock your full potential.
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
                            <h3 className="text-sm font-semibold text-primary text-center">Path Recommendation</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Progressive Path suggested</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Enrollment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Start Level 1</p>
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

            {/* Recommendation Content */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Your Personalized Learning Path
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Our recommendation engine suggests Progressive Path as the optimal choice for your current skill level.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Assessment Insight */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                                    <div className="flex items-center mb-6">
                                        <Brain className="w-8 h-8 mr-3 text-primary" />
                                        <h3 className="text-2xl font-bold text-neutral-800">Assessment Insights</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                            <div className="text-3xl font-bold text-orange-600 mb-2">{userResults?.percentage || 0}%</div>
                                            <div className="text-sm text-neutral-600">Overall Score</div>
                                        </div>
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">{userResults?.score || 0}/{userResults?.totalQuestions || 5}</div>
                                            <div className="text-sm text-neutral-600">Questions Correct</div>
                                        </div>
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                            <div className="text-3xl font-bold text-green-600 mb-2">L1</div>
                                            <div className="text-sm text-neutral-600">Recommended Start</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Areas for Improvement */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                                    <h3 className="text-2xl font-bold text-neutral-800 mb-6">Areas to Strengthen</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {improvementAreas.map((area, index) => (
                                            <div key={index} className={`p-4 rounded-lg border ${area.color}`}>
                                                <div className="flex items-center mb-3">
                                                    {area.icon}
                                                    <h4 className="font-semibold ml-2">{area.title}</h4>
                                                </div>
                                                <p className="text-xs">{area.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Learning Progression */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                                    <h3 className="text-2xl font-bold text-neutral-800 mb-6">Your Learning Journey</h3>
                                    <div className="space-y-6">
                                        {progressionPath.map((step, index) => (
                                            <div key={index} className={`border-2 rounded-lg p-6 ${
                                                step.locked 
                                                    ? 'border-neutral-200 bg-neutral-50 opacity-60' 
                                                    : 'border-primary/30 bg-white'
                                            }`}>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                                            step.locked 
                                                                ? 'bg-neutral-200 text-neutral-500' 
                                                                : 'bg-primary text-white'
                                                        }`}>
                                                            {step.locked ? (
                                                                <Lock className="w-6 h-6" />
                                                            ) : (
                                                                <BookOpen className="w-6 h-6" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-bold text-neutral-800">{step.level} - {step.title}</h4>
                                                            <p className="text-neutral-600 text-sm">{step.duration} • {step.price}</p>
                                                        </div>
                                                    </div>
                                                    {step.locked && (
                                                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                            Unlocks after previous level
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-neutral-700 mb-4">{step.description}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h5 className="font-semibold text-neutral-800 mb-2">Learning Outcomes:</h5>
                                                        <ul className="space-y-1">
                                                            {step.outcomes.map((outcome, idx) => (
                                                                <li key={idx} className="flex items-center text-sm text-neutral-600">
                                                                    <Check className="w-3 h-3 mr-2 text-green-600" />
                                                                    {outcome}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-semibold text-neutral-800 mb-2">Certificate:</h5>
                                                        <div className="flex items-center text-sm text-neutral-600">
                                                            <Award className="w-4 h-4 mr-2 text-primary" />
                                                            {step.certificate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation Pane */}
                            <div className="hidden lg:block">
                                <RecommendationPane 
                                    onContinue={handleContinueToProgressive}
                                    loading={loading}
                                    userResults={userResults}
                                />
                            </div>
                        </div>

                        {/* Mobile Recommendation */}
                        <div className="lg:hidden mt-8">
                            <RecommendationPane 
                                onContinue={handleContinueToProgressive}
                                loading={loading}
                                userResults={userResults}
                            />
                        </div>

                        
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProgressivePathRecommendation;
