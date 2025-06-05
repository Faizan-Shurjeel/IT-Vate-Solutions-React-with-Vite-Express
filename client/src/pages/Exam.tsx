import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Clock,
    ChevronRight,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

// Sample questions - replace with Firestore data later
const sampleQuestions = [
    {
        id: 1,
        question: "What does PCB stand for in electronics?",
        options: [
            "Printed Circuit Board",
            "Personal Computer Base",
            "Power Control Block",
            "Processor Control Board"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "Which layer is typically used for ground connections in a multi-layer PCB?",
        options: [
            "Top layer only",
            "Bottom layer only",
            "Dedicated ground plane layer",
            "Signal layer"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "What is the purpose of via in PCB design?",
        options: [
            "To add decorative elements",
            "To connect different layers of the PCB",
            "To increase board thickness",
            "To reduce manufacturing cost"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "Which file format is commonly used for PCB manufacturing?",
        options: [
            "PDF files",
            "Gerber files",
            "Word documents",
            "PowerPoint files"
        ],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "What is the typical thickness of a standard PCB?",
        options: [
            "0.8mm",
            "1.6mm",
            "2.4mm",
            "3.2mm"
        ],
        correctAnswer: 1
    }
];

const Exam = () => {
    const { user, loading: authLoading } = useAuth();
    const [, setLocation] = useLocation();
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null));
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            setLocation("/register");
        }
    }, [authLoading, user, setLocation]);

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < sampleQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(answers[currentQuestion + 1]);
        } else {
            handleSubmitExam();
        }
    };

    const handleSubmitExam = async () => {
        setLoading(true);
        // TODO: Submit answers to Firestore
        // Calculate score, update user profile, etc.
        
        // For now, just show alert and redirect
        const score = answers.reduce((acc, answer, index) => {
            return answer === sampleQuestions[index].correctAnswer ? acc + 1 : acc;
        }, 0);
        
        alert(`Exam completed! Your score: ${score}/${sampleQuestions.length}`);
        setLocation("/dashboard"); // or wherever you want to redirect
        setLoading(false);
    };

    const answeredQuestions = answers.filter(answer => answer !== null).length;

    if (authLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        PCB Design Assessment
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Test your knowledge of PCB design fundamentals. This assessment will help us understand your current skill level and customize your training accordingly.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Timer and Progress */}
                        <div className="bg-neutral-50 p-6 rounded-lg shadow-md mb-8">
                            <div className="flex justify-between items-center flex-wrap gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-neutral-600">
                                        <Clock size={20} className="mr-2" />
                                        <span className="font-medium">Time Remaining: </span>
                                        <span className="ml-2 font-bold text-primary text-lg">
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-neutral-600">
                                        <span className="font-medium">Progress: </span>
                                        <span className="font-bold text-primary">
                                            {answeredQuestions}/{sampleQuestions.length}
                                        </span>
                                    </div>
                                    <div className="text-neutral-600">
                                        <span className="font-medium">Question: </span>
                                        <span className="font-bold text-primary">
                                            {currentQuestion + 1}/{sampleQuestions.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="mt-4">
                                <div className="w-full bg-neutral-200 rounded-full h-2">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(answeredQuestions / sampleQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                                        Question {currentQuestion + 1}
                                    </span>
                                    {answers[currentQuestion] !== null && (
                                        <CheckCircle size={20} className="text-green-500" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                                    {sampleQuestions[currentQuestion].question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="space-y-4 mb-8">
                                {sampleQuestions[currentQuestion].options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-neutral-100 ${
                                            selectedAnswer === index
                                                ? 'border-primary bg-primary/5'
                                                : 'border-neutral-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion}`}
                                            value={index}
                                            checked={selectedAnswer === index}
                                            onChange={() => handleAnswerSelect(index)}
                                            className="mr-4 w-4 h-4 text-primary"
                                        />
                                        <span className="text-neutral-700 font-medium">
                                            {String.fromCharCode(65 + index)}. {option}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-neutral-500">
                                    {selectedAnswer === null ? (
                                        <div className="flex items-center">
                                            <AlertCircle size={16} className="mr-1 text-orange-500" />
                                            Please select an answer
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <CheckCircle size={16} className="mr-1 text-green-500" />
                                            Answer selected
                                        </div>
                                    )}
                                </div>
                                
                                <Button
                                    onClick={handleNext}
                                    disabled={selectedAnswer === null || loading}
                                    className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-md"
                                >
                                    {currentQuestion === sampleQuestions.length - 1 ? (
                                        <>
                                            {loading ? "Submitting..." : "Submit Exam"}
                                        </>
                                    ) : (
                                        <>
                                            Next Question
                                            <ChevronRight size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                            Assessment Guidelines
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <Clock size={32} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-lg font-semibold mb-2">Time Limit</h3>
                                <p className="text-neutral-600">
                                    You have 30 minutes to complete all questions. The exam will auto-submit when time runs out.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <CheckCircle size={32} className="mx-auto mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Single Answer</h3>
                                <p className="text-neutral-600">
                                    Each question has only one correct answer. You can change your selection before moving to the next question.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <AlertCircle size={32} className="mx-auto mb-4 text-orange-500" />
                                <h3 className="text-lg font-semibold mb-2">No Going Back</h3>
                                <p className="text-neutral-600">
                                    Once you proceed to the next question, you cannot return to previous questions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Exam;