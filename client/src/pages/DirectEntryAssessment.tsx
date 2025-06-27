import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard, Trophy, Brain, Timer, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Assessment Info Pane Component
const AssessmentInfoPane = ({ onStartAssessment, loading }) => {
    return (
        <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex items-center mb-2">
                        <Brain className="w-6 h-6 mr-2" />
                        <h3 className="text-lg font-bold">Assessment Overview</h3>
                    </div>
                    <p className="text-primary-100 text-sm">15-minute skill evaluation</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-4">Quick Facts</h4>
                    
                    {/* Test Details */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                            <Timer className="w-5 h-5 mr-3 text-primary" />
                            <div>
                                <div className="font-semibold text-neutral-800">Duration</div>
                                <div className="text-sm text-neutral-600">15 minutes</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-primary" />
                            <div>
                                <div className="font-semibold text-neutral-800">Questions</div>
                                <div className="text-sm text-neutral-600">Multiple choice & practical</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Target className="w-5 h-5 mr-3 text-primary" />
                            <div>
                                <div className="font-semibold text-neutral-800">Focus Areas</div>
                                <div className="text-sm text-neutral-600">PCB fundamentals & design</div>
                            </div>
                        </div>
                    </div>

                    {/* Score Outcomes */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3">Score Outcomes:</h5>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center mb-1">
                                    <Trophy className="w-4 h-4 mr-2 text-green-600" />
                                    <span className="font-semibold text-green-800">75% or Higher</span>
                                </div>
                                <p className="text-xs text-green-700">Access to Level 1, 2, and 3</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center mb-1">
                                    <Award className="w-4 h-4 mr-2 text-blue-600" />
                                    <span className="font-semibold text-blue-800">50% - 74%</span>
                                </div>
                                <p className="text-xs text-blue-700">Access to Level 1 and 2</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex items-center mb-1">
                                    <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                                    <span className="font-semibold text-orange-800">Below 50%</span>
                                </div>
                                <p className="text-xs text-orange-700">Recommended to start with Level 1</p>
                            </div>
                        </div>
                    </div>

                    {/* Start Assessment Button */}
                    <div className="pt-4 border-t border-neutral-200">
                        <Button
                            onClick={onStartAssessment}
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold rounded-lg"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Starting Assessment...
                                </>
                            ) : (
                                <>
                                    Start Assessment
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

const DirectEntryAssessment = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleStartAssessment = async () => {
        if (!user) {
            alert("Please log in to take the assessment");
            setLocation("/register");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedPackage: "direct",
                assessmentStarted: true,
                assessmentStartedAt: new Date(),
            });

            // Navigate to assessment module
            setLocation("/exam");
        } catch (error) {
            console.error("Error starting assessment:", error);
            alert("Failed to start assessment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setLocation("/packages");
    };

    const assessmentTopics = [
        {
            category: "PCB Fundamentals",
            topics: ["Basic circuit principles", "Component identification", "PCB terminology", "Design rules"]
        },
        {
            category: "Schematic Design",
            topics: ["Symbol libraries", "Net connections", "Hierarchical design", "Design rule checks"]
        },
        {
            category: "Layout Principles",
            topics: ["Component placement", "Routing basics", "Layer management", "Design constraints"]
        },
        {
            category: "Manufacturing",
            topics: ["Fabrication basics", "Assembly considerations", "File generation", "Quality checks"]
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Brain size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Self-Assessment Test
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Evaluate your PCB design knowledge to determine your starting level.
                        </p>
                        <p className="text-lg opacity-90">
                            15-minute assessment to unlock the right level for your expertise.
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
                            <p className="text-xs text-neutral-600 text-center mt-1">Direct Entry Selected</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

                        {/* Step 3C - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                3C
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Self-Assessment</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">15-minute test</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Level Selection</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Based on results</p>
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

            {/* Assessment Landing with Info Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                PCB Design Assessment
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Test your existing knowledge to determine the best starting level for your training.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Assessment Details */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* What to Expect Card */}
                                <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 p-6">
                                    <div className="flex items-center mb-4">
                                        <Target className="w-8 h-8 mr-3 text-primary" />
                                        <h3 className="text-xl font-bold text-neutral-800">What to Expect</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-neutral-800">15-Minute Duration</h4>
                                                <p className="text-sm text-neutral-600">Quick but comprehensive evaluation of your PCB design knowledge</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <FileText className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-neutral-800">Mixed Question Types</h4>
                                                <p className="text-sm text-neutral-600">Multiple choice, true/false, and practical scenario questions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Brain className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-neutral-800">Adaptive Difficulty</h4>
                                                <p className="text-sm text-neutral-600">Questions adapt based on your responses to accurately assess your level</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Assessment Topics */}
                                <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 p-6">
                                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Assessment Topics</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {assessmentTopics.map((section, index) => (
                                            <div key={index} className="p-4 bg-neutral-50 rounded-lg">
                                                <h4 className="font-semibold text-primary mb-2">{section.category}</h4>
                                                <ul className="space-y-1">
                                                    {section.topics.map((topic, topicIndex) => (
                                                        <li key={topicIndex} className="flex items-center text-sm text-neutral-600">
                                                            <Check className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                                                            {topic}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Important Notes */}
                                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                                    <div className="flex items-start space-x-3">
                                        <Info className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-blue-800 mb-2">Important Notes</h3>
                                            <ul className="space-y-2 text-blue-700 text-sm">
                                                <li>• You can only take this assessment once</li>
                                                <li>• Ensure you have a stable internet connection</li>
                                                <li>• Answer honestly for the most accurate level recommendation</li>
                                                <li>• If you score below 50%, we recommend starting with Progressive Path</li>
                                                <li>• Your results will determine which levels you can access</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assessment Info Pane */}
                            <div className="hidden lg:block">
                                <AssessmentInfoPane 
                                    onStartAssessment={handleStartAssessment}
                                    loading={loading}
                                />
                            </div>
                        </div>

                        {/* Mobile Assessment Info */}
                        <div className="lg:hidden mt-8">
                            <AssessmentInfoPane 
                                onStartAssessment={handleStartAssessment}
                                loading={loading}
                            />
                        </div>

                        {/* Final Encouragement */}
                        <div className="mt-12 text-center">
                            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-4">Ready to Discover Your Level?</h3>
                                <p className="text-lg text-neutral-600 mb-6">
                                    This assessment will help us recommend the perfect starting point for your PCB design journey.
                                    Take your time and answer thoughtfully for the most accurate results.
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <div className="flex items-center text-primary">
                                        <Trophy className="w-5 h-5 mr-2" />
                                        <span className="font-semibold">Unlock Your Potential</span>
                                    </div>
                                    <div className="flex items-center text-primary">
                                        <Target className="w-5 h-5 mr-2" />
                                        <span className="font-semibold">Find Your Level</span>
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

export default DirectEntryAssessment;
