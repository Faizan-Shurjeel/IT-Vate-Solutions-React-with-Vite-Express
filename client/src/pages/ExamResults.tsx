import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    XCircle,
    Clock,
    Award,
    TrendingUp,
    ArrowRight,
    AlertCircle,
    Target,
    BookOpen,
    Trophy,
    Star
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const ExamResults = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processingLevel, setProcessingLevel] = useState(false);

    useEffect(() => {
        // Get results from sessionStorage
        const storedResults = sessionStorage.getItem('examResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        } else {
            // Redirect to dashboard if no results found
            setLocation("/dashboard");
        }
        setLoading(false);
    }, [setLocation]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const getLevelAccess = (percentage) => {
        if (percentage >= 75) {
            return {
                levels: ["Level 1", "Level 2", "Level 3"],
                message: "Excellent! You can access all levels.",
                color: "text-green-600 bg-green-50 border-green-200",
                recommendation: "Start with Level 3 for advanced training"
            };
        } else if (percentage >= 50) {
            return {
                levels: ["Level 1", "Level 2"],
                message: "Good performance! You can access Level 1 and 2.",
                color: "text-blue-600 bg-blue-50 border-blue-200",
                recommendation: "Start with Level 2 for intermediate training"
            };
        } else {
            return {
                levels: ["Level 1"],
                message: "Start with Level 1 to build your foundation.",
                color: "text-orange-600 bg-orange-50 border-orange-200",
                recommendation: "We recommend starting with Progressive Path (Level 1)"
            };
        }
    };

    const getRecommendations = (percentage) => {
        if (percentage >= 75) {
            return {
                title: "Outstanding Performance!",
                description: "You have demonstrated advanced PCB design knowledge.",
                recommendations: [
                    "Start with Level 3 for advanced concepts",
                    "Focus on high-speed design and EMI/EMC",
                    "Explore specialized areas like RF design",
                    "Consider mentoring others in the field"
                ]
            };
        } else if (percentage >= 50) {
            return {
                title: "Solid Foundation",
                description: "You have good basics with room for improvement.",
                recommendations: [
                    "Start with Level 2 for intermediate concepts",
                    "Focus on signal integrity principles",
                    "Practice complex routing scenarios",
                    "Study design for manufacturing (DFM)"
                ]
            };
        } else {
            return {
                title: "Building Your Foundation",
                description: "Focus on fundamental concepts first.",
                recommendations: [
                    "Start with Level 1 or Progressive Path",
                    "Master basic PCB layout principles",
                    "Practice schematic capture skills",
                    "Study electronics fundamentals"
                ]
            };
        }
    };

    const handleContinueToLevelSelection = async () => {
        if (!user || !results) return;
        
        setProcessingLevel(true);
        
        try {
            // Update user document with assessment results and available levels
            const userRef = doc(db, "users", user.uid);
            const levelAccess = getLevelAccess(results.percentage);
            
            await updateDoc(userRef, {
                assessmentCompleted: true,
                assessmentResults: results,
                availableLevels: levelAccess.levels,
                assessmentCompletedAt: new Date()
            });

            // Navigate to level selection based on results
            if (results.percentage < 50) {
                // Redirect to Progressive Path with message
                setLocation("/progressive-path-recommendation");
            } else {
                // Go to level selection with available levels
                setLocation("/direct-entry-level-selection");
            }
        } catch (error) {
            console.error("Error updating user level access:", error);
            alert("Failed to process results. Please try again.");
        } finally {
            setProcessingLevel(false);
        }
    };

    if (loading || !results) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading your results...</p>
                </div>
            </div>
        );
    }

    const levelAccess = getLevelAccess(results.percentage);
    const recommendations = getRecommendations(results.percentage);

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Award size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Assessment Complete!
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Thank you for completing the PCB Design Assessment.
                        </p>
                        <p className="text-lg opacity-90">
                            Here are your personalized results and level recommendations.
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
                            <h3 className="text-sm font-semibold text-green-600 text-center">Assessment Test</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
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
                            <h3 className="text-sm font-semibold text-primary text-center">Results</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Level recommendations</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Level Selection</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Choose your level</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Score Overview */}
                            <div className="lg:col-span-2">
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 mb-8">
                                    <div className="text-center mb-8">
                                        <div className="relative inline-block">
                                            <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center mx-auto mb-4">
                                                <div className="text-center">
                                                    <div className="text-4xl font-bold text-primary">{results.percentage}%</div>
                                                    <div className="text-sm text-neutral-600">Score</div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                                            {results.score} out of {results.totalQuestions} Correct
                                        </h2>
                                        <div className={`inline-block px-4 py-2 rounded-full border ${levelAccess.color}`}>
                                            <span className="font-semibold">{levelAccess.message}</span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                            <Target size={32} className="mx-auto mb-2 text-green-500" />
                                            <div className="text-2xl font-bold text-neutral-800">{results.score}</div>
                                            <div className="text-sm text-neutral-600">Correct Answers</div>
                                        </div>
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                            <XCircle size={32} className="mx-auto mb-2 text-red-500" />
                                            <div className="text-2xl font-bold text-neutral-800">{results.totalQuestions - results.score}</div>
                                            <div className="text-sm text-neutral-600">Incorrect Answers</div>
                                        </div>
                                        <div className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                            <Clock size={32} className="mx-auto mb-2 text-blue-500" />
                                            <div className="text-2xl font-bold text-neutral-800">{formatTime(results.timeTaken)}</div>
                                            <div className="text-sm text-neutral-600">Time Taken</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                                    <div className="flex items-center mb-6">
                                        <TrendingUp size={24} className="text-primary mr-3" />
                                        <h3 className="text-2xl font-bold text-neutral-800">{recommendations.title}</h3>
                                    </div>
                                    <p className="text-neutral-600 mb-6 text-lg">{recommendations.description}</p>
                                    
                                    <h4 className="text-lg font-semibold text-neutral-800 mb-4">Recommended Next Steps:</h4>
                                    <div className="space-y-3">
                                        {recommendations.recommendations.map((rec, index) => (
                                            <div key={index} className="flex items-start">
                                                <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-neutral-700">{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Level Access Panel */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200">
                                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Available Levels</h3>
                                    <div className="space-y-3">
                                        {levelAccess.levels.map((level, index) => (
                                            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                                <Trophy className="w-5 h-5 mr-3 text-green-600" />
                                                <span className="font-semibold text-green-800">{level}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                        <div className="flex items-center text-primary">
                                            <Star className="w-4 h-4 mr-2" />
                                            <span className="text-sm font-semibold">{levelAccess.recommendation}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200">
                                    <h4 className="font-semibold text-neutral-800 mb-4">Ready to Continue?</h4>
                                    <p className="text-sm text-neutral-600 mb-4">
                                        Based on your results, you can now select from your available levels.
                                    </p>
                                    <Button
                                        onClick={handleContinueToLevelSelection}
                                        disabled={processingLevel}
                                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold rounded-lg"
                                    >
                                        {processingLevel ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Continue to Level Selection
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                            Your Personalized Learning Path
                        </h2>
                        <p className="text-lg text-neutral-600 mb-12">
                            Based on your assessment results, we've determined your optimal starting level for maximum learning efficiency.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                                <BookOpen size={32} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-lg font-semibold mb-2">Customized Curriculum</h3>
                                <p className="text-neutral-600">
                                    Skip content you already know and focus on areas that need improvement.
                                </p>
                            </div>
                            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                                <Target size={32} className="mx-auto mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Focused Learning</h3>
                                <p className="text-neutral-600">
                                    Targeted exercises and projects based on your skill level and goals.
                                </p>
                            </div>
                            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                                <Award size={32} className="mx-auto mb-4 text-orange-500" />
                                <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
                                <p className="text-neutral-600">
                                    Learn from industry professionals with real-world PCB design experience.
                                </p>
                            </div>
                        </div>
                    </div>  
                </div>
            </section>
        </main>
    );
};

export default ExamResults;
