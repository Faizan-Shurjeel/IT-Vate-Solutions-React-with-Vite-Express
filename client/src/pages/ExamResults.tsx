import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    XCircle,
    Clock,
    Award,
    TrendingUp,
    RotateCcw,
    ArrowRight,
    AlertCircle,
    Target,
    BookOpen
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

interface ExamResults {
    score: number;
    totalQuestions: number;
    percentage: number;
    level: string;
    timeTaken: number;
}

const ExamResults = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [results, setResults] = useState<ExamResults | null>(null);
    const [loading, setLoading] = useState(true);

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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'advanced': return 'text-green-600 bg-green-50 border-green-200';
            case 'intermediate': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'basic': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'beginner': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
        }
    };

    const getRecommendations = (level: string, percentage: number) => {
        if (percentage >= 80) {
            return {
                title: "Excellent Performance!",
                description: "You have demonstrated strong PCB design knowledge.",
                recommendations: [
                    "Consider advanced topics like high-speed design and EMI/EMC",
                    "Explore specialized PCB design areas like RF or power electronics",
                    "Take on complex multi-layer board design projects"
                ]
            };
        } else if (percentage >= 60) {
            return {
                title: "Good Foundation",
                description: "You have solid basics but can improve in some areas.",
                recommendations: [
                    "Focus on signal integrity and layout optimization",
                    "Practice with more complex routing scenarios",
                    "Study design for manufacturing (DFM) principles"
                ]
            };
        } else if (percentage >= 40) {
            return {
                title: "Building Knowledge",
                description: "You understand basic concepts but need more practice.",
                recommendations: [
                    "Review PCB layout fundamentals and best practices",
                    "Practice with schematic capture and component placement",
                    "Study basic electronics principles and circuit analysis"
                ]
            };
        } else {
            return {
                title: "Starting Your Journey",
                description: "Focus on building strong fundamentals first.",
                recommendations: [
                    "Start with basic electronics and circuit theory",
                    "Learn PCB design software and tools",
                    "Practice with simple single and double-layer designs"
                ]
            };
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

    const recommendations = getRecommendations(results.level, results.percentage);

    return (
        <main>
            {/* Header Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <Award size={64} className="mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Assessment Complete!
                        </h1>
                        <p className="text-xl">
                            Thank you for completing the PCB Design Skills Assessment. 
                            Here are your personalized results and recommendations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Step Indicator */}
            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 1 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Create Account</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Register your details</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 2 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Training Overview</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Course structure</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

                        {/* Step 3 - Completed */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Assessment Test</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Skills evaluation</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-green-500 -mt-8"></div>

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
                            <p className="text-xs text-neutral-600 text-center mt-1">Recommendations</p>
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

            {/* Results Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Score Overview */}
                        <div className="bg-neutral-50 p-8 rounded-lg shadow-md mb-8">
                            <div className="text-center mb-8">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary">{results.percentage}%</div>
                                            <div className="text-sm text-neutral-600">Score</div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                                    {results.score} out of {results.totalQuestions} Correct
                                </h2>
                                <div className={`inline-block px-4 py-2 rounded-full border ${getLevelColor(results.level)}`}>
                                    <span className="font-semibold">{results.level}</span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                                    <Target size={32} className="mx-auto mb-2 text-green-500" />
                                    <div className="text-2xl font-bold text-neutral-800">{results.score}</div>
                                    <div className="text-sm text-neutral-600">Correct Answers</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                                    <XCircle size={32} className="mx-auto mb-2 text-red-500" />
                                    <div className="text-2xl font-bold text-neutral-800">{results.totalQuestions - results.score}</div>
                                    <div className="text-sm text-neutral-600">Incorrect Answers</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                                    <Clock size={32} className="mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold text-neutral-800">{formatTime(results.timeTaken)}</div>
                                    <div className="text-sm text-neutral-600">Time Taken</div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-neutral-50 p-8 rounded-lg shadow-md mb-8">
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

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* <Button
                                onClick={() => setLocation("/exam")}
                                variant="outline"
                                className="flex items-center justify-center px-6 py-3"
                            >
                                <RotateCcw size={18} className="mr-2" />
                                Retake Assessment
                            </Button> */}
                            <Button
                                onClick={() => setLocation("/payment")}
                                className="bg-primary hover:bg-primary/90 flex items-center justify-center px-6 py-3"
                            >
                                Continue to Enrollment
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps Section */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                            Your Personalized Learning Path
                        </h2>
                        <p className="text-lg text-neutral-600 mb-12">
                            Based on your assessment results, we've created a customized training program to help you achieve your PCB design goals.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <BookOpen size={32} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-lg font-semibold mb-2">Customized Curriculum</h3>
                                <p className="text-neutral-600">
                                    Skip content you already know and focus on areas that need improvement.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Target size={32} className="mx-auto mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Focused Learning</h3>
                                <p className="text-neutral-600">
                                    Targeted exercises and projects based on your skill level and goals.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
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
