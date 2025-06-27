import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info, Check, Crown, Users, Zap, Star, User, ArrowLeft, Package, GraduationCap, Calculator, CreditCard, Trophy, Brain } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Level Selection Pane Component
const LevelSelectionPane = ({ selectedLevel, levels, onContinue, loading, userResults }) => {
    const getSelectedLevelData = () => {
        if (!selectedLevel) {
            return {
                title: "Select a Level",
                price: "-",
                duration: "Choose your level",
                description: "Please select a level to see details.",
                features: ["Select a level to view details"],
                requirements: []
            };
        }

        const level = levels.find(lvl => lvl.id === selectedLevel);
        return {
            title: level?.name || "Select a Level",
            price: level?.price || "-",
            duration: level?.duration || "",
            description: level?.description || "",
            features: level?.features || [],
            requirements: level?.requirements || []
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
                        <h3 className="text-lg font-bold">Level Details</h3>
                    </div>
                    <p className="text-primary-100 text-sm">Based on your {userResults?.percentage}% score</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">{current.title}</h4>
                    
                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="text-3xl font-bold text-neutral-800 mb-2">
                            {current.price}
                        </div>
                        <div className="flex items-center text-neutral-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{current.duration}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm mb-4">{current.description}</p>

                    {/* Requirements */}
                    {current.requirements.length > 0 && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <h5 className="font-semibold text-green-800 mb-2 text-sm">Prerequisites Met:</h5>
                            <div className="space-y-1">
                                {current.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center text-green-700">
                                        <Check className="w-3 h-3 mr-2" />
                                        <span className="text-xs">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-neutral-800 mb-3 text-sm">What You'll Learn:</h5>
                        <div className="space-y-2">
                            {current.features.map((feature, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-neutral-700 text-xs">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

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
                                        Enroll in This Level
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

const DirectEntryLevelSelection = () => {
    const [, setLocation] = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
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

    const handleSelectLevel = async (levelId) => {
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
                selectedLevel: levelId,
                levelSelectedAt: new Date(),
            });

            // Navigate to payment
            setLocation("/payment");
        } catch (error) {
            console.error("Error selecting level:", error);
            alert("Failed to select level. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setLocation("/exam-results");
    };

    const allLevels = [
        {
            id: "level-1",
            name: "Level 1 - Foundation",
            price: "₨8,000",
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
            requirements: [
                "Basic electronics knowledge",
                "Computer literacy"
            ],
            levelNumber: 1,
            difficulty: "Beginner"
        },
        {
            id: "level-2",
            name: "Level 2 - Intermediate",
            price: "₨8,000",
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
            requirements: [
                "Assessment score ≥50%",
                "Understanding of basic PCB concepts"
            ],
            levelNumber: 2,
            difficulty: "Intermediate"
        },
        {
            id: "level-3",
            name: "Level 3 - Advanced",
            price: "₨8,000",
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
            requirements: [
                "Assessment score ≥75%",
                "Strong PCB design foundation"
            ],
            levelNumber: 3,
            difficulty: "Advanced"
        }
    ];

    // Filter levels based on user's available levels
    const getUserLevels = () => {
        return allLevels.map(level => ({
            ...level,
            available: availableLevels.includes(`Level ${level.levelNumber}`),
            recommended: level.levelNumber === Math.max(...availableLevels.map(l => parseInt(l.split(' ')[1])))
        }));
    };

    const levels = getUserLevels();

    if (dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading available levels...</p>
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
                        <Target size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Select Your Level
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Based on your assessment score of {userResults?.percentage || 0}%, you can access these levels.
                        </p>
                        <p className="text-lg opacity-90">
                            Choose the level that matches your learning goals and start your journey.
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
                            <h3 className="text-sm font-semibold text-primary text-center">Select Level</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Choose your starting point</p>
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

            {/* Level Selection with Details Pane */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                                Available Levels
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Based on your assessment performance, you have access to the following levels.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Level Cards */}
                            <div className="lg:col-span-2 space-y-6">
                                {levels.map((level) => (
                                    <div
                                        key={level.id}
                                        className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                                            !level.available
                                                ? 'border-neutral-200 opacity-60 cursor-not-allowed'
                                                : selectedLevel === level.id
                                                    ? 'border-primary ring-2 ring-primary/20 hover:shadow-xl'
                                                    : 'border-primary/30 hover:border-primary/60 hover:shadow-xl'
                                        }`}
                                        onClick={() => level.available && setSelectedLevel(level.id)}
                                    >
                                        {/* Level Badge */}
                                        <div className="absolute -top-3 left-6">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                                                level.available 
                                                    ? (level.recommended ? 'bg-green-500 text-white' : 'bg-primary text-white')
                                                    : 'bg-neutral-400 text-white'
                                            }`}>
                                                Level {level.levelNumber} - {level.difficulty}
                                            </div>
                                        </div>

                                        {/* Recommended Badge */}
                                        {level.recommended && level.available && (
                                            <div className="absolute -top-4 right-6">
                                                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                    Recommended
                                                </div>
                                            </div>
                                        )}

                                        {/* Lock Icon for Unavailable Levels */}
                                        {!level.available && (
                                            <div className="absolute top-6 right-6">
                                                <Lock className="w-6 h-6 text-neutral-400" />
                                            </div>
                                        )}

                                        {/* Selection Indicator */}
                                        {selectedLevel === level.id && level.available && (
                                            <div className="absolute top-6 right-6">
                                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 pt-8">
                                            <div className="flex items-start space-x-4">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                                    level.available
                                                        ? (selectedLevel === level.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary')
                                                        : 'bg-neutral-200 text-neutral-400'
                                                }`}>
                                                    {level.available ? (
                                                        level.levelNumber === 1 ? <BookOpen className="w-6 h-6" /> :
                                                        level.levelNumber === 2 ? <Target className="w-6 h-6" /> :
                                                        <Trophy className="w-6 h-6" />
                                                    ) : (
                                                        <Lock className="w-6 h-6" />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                                                        {level.name}
                                                    </h3>
                                                    <p className="text-neutral-600 text-sm mb-2">
                                                        {level.available ? `${level.price} • ${level.duration}` : "Not Available"}
                                                    </p>
                                                    <p className="text-neutral-700 text-sm mb-4">{level.description}</p>

                                                    {/* Quick Features */}
                                                    <div className="grid grid-cols-1 gap-2 mb-4">
                                                        {level.features.slice(0, 3).map((feature, index) => (
                                                            <div key={index} className="flex items-center">
                                                                <Check className={`w-3 h-3 mr-2 flex-shrink-0 ${
                                                                    level.available ? 'text-primary' : 'text-neutral-400'
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
                                                        {level.available ? (
                                                            selectedLevel === level.id ? (
                                                                <div className="text-primary font-semibold text-sm">
                                                                    ✓ Selected - Use continue button to proceed
                                                                </div>
                                                            ) : (
                                                                <div className="text-neutral-500 text-sm">
                                                                    Click to select this level
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="text-neutral-500 text-sm">
                                                                🔒 Requires higher assessment score
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Level Details Pane */}
                            <div className="hidden lg:block">
                                <LevelSelectionPane 
                                    selectedLevel={selectedLevel}
                                    levels={levels}
                                    onContinue={handleSelectLevel}
                                    loading={loading}
                                    userResults={userResults}
                                />
                            </div>
                        </div>

                        {/* Mobile Level Details */}
                        <div className="lg:hidden mt-8">
                            {selectedLevel && (
                                <LevelSelectionPane 
                                    selectedLevel={selectedLevel}
                                    levels={levels}
                                    onContinue={handleSelectLevel}
                                    loading={loading}
                                    userResults={userResults}
                                />
                            )}
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
                                                <strong>Recommendation:</strong> Start with Level {Math.max(...availableLevels.map(l => parseInt(l.split(' ')[1])))} for optimal learning progression.
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

export default DirectEntryLevelSelection;
