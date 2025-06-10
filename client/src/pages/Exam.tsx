import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Clock,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Loader,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { 
    collection, 
    getDocs, 
    doc, 
    updateDoc, 
    setDoc,
    query,
    orderBy 
} from "firebase/firestore";
import { db } from "@/utils/firebase";

// Types
interface Question {
    id: string;
    questionId: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

interface ExamResult {
    score: number;
    totalQuestions: number;
    answers: (number | null)[];
    completedAt: Date;
    timeTaken: number;
}

const Exam = () => {
    const { user, loading: authLoading } = useAuth();
    const [, setLocation] = useLocation();
    
    // State management
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes for 5 questions
    const [loading, setLoading] = useState(false);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [examStartTime] = useState(Date.now());

    // Function to shuffle array using Fisher-Yates algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Function to get random subset of questions
    const getRandomQuestions = (allQuestions: Question[], count: number = 5): Question[] => {
        if (allQuestions.length <= count) {
            return shuffleArray(allQuestions);
        }
        
        const shuffled = shuffleArray(allQuestions);
        return shuffled.slice(0, count);
    };

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            setLocation("/register");
        }
    }, [authLoading, user, setLocation]);

    // Fetch questions from Firestore
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setQuestionsLoading(true);
                setError(null);
                
                const questionsRef = collection(db, "questions");
                const q = query(questionsRef, orderBy("questionId", "asc"));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    throw new Error("No questions found in the database");
                }
                
                const fetchedQuestions: Question[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetchedQuestions.push({
                        id: doc.id,
                        questionId: data.questionId || 0,
                        question: data.question || "",
                        options: data.options || [],
                        correctAnswer: data.correctAnswer || 0,
                    });
                });
                
                if (fetchedQuestions.length === 0) {
                    throw new Error("No valid questions found");
                }
                
                // Store all questions and select 5 random ones
                setAllQuestions(fetchedQuestions);
                const randomQuestions = getRandomQuestions(fetchedQuestions, 5);
                setQuestions(randomQuestions);
                setAnswers(new Array(5).fill(null)); // Always 5 questions
                
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError(error instanceof Error ? error.message : "Failed to load questions");
            } finally {
                setQuestionsLoading(false);
            }
        };

        if (user && !authLoading) {
            fetchQuestions();
        }
    }, [user, authLoading]);

    // Timer effect - reduced time for 5 questions
    useEffect(() => {
        if (questionsLoading || questions.length === 0) return;

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
    }, [questionsLoading, questions.length]);

    // Update selected answer when changing questions
    useEffect(() => {
        const ans = answers[currentQuestion];
        setSelectedAnswer(ans !== undefined ? ans : null);
    }, [currentQuestion, answers]);

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
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleSubmitExam();
        }
    };

    const calculateScore = () => {
        return answers.reduce((acc, answer, index) => {
            if (answer === null) return acc;
            return answer === questions[index].correctAnswer ? acc + 1 : acc;
        }, 0);
    };

    const handleSubmitExam = async () => {
        if (loading) return;
        
        setLoading(true);
        
        try {
            const score = calculateScore();
            const timeTaken = Math.floor((Date.now() - examStartTime) / 1000);
            
            const examResult: ExamResult = {
                score,
                totalQuestions: questions.length,
                answers,
                completedAt: new Date(),
                timeTaken
            };

            // Save exam results to user's document
            if (user) {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    testCompleted: true,
                    examResult,
                    level: determineLevel(score, questions.length),
                    lastExamDate: new Date()
                });

                // Save detailed exam attempt with the specific questions used
                const examAttemptRef = doc(db, "examAttempts", `${user.uid}_${Date.now()}`);
                await setDoc(examAttemptRef, {
                    userId: user.uid,
                    userEmail: user.email,
                    ...examResult,
                    questions: questions.map((q, index) => ({
                        questionId: q.questionId,
                        question: q.question,
                        options: q.options,
                        selectedAnswer: answers[index],
                        correctAnswer: q.correctAnswer,
                        isCorrect: answers[index] === q.correctAnswer
                    }))
                });
            }
            
            // Store results in sessionStorage for results page
            sessionStorage.setItem('examResults', JSON.stringify({
                score,
                totalQuestions: questions.length,
                percentage: Math.round((score / questions.length) * 100),
                level: determineLevel(score, questions.length),
                timeTaken
            }));
            
            setLocation("/exam-results");
            
        } catch (error) {
            console.error("Error submitting exam:", error);
            setError("Failed to submit exam. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const determineLevel = (score: number, total: number): string => {
        const percentage = (score / total) * 100;
        if (percentage >= 75) return "Level 3";
        if (percentage >= 50) return "Level 2";
        if (percentage < 50) return "Level 1";
    };

    // Function to restart with new random questions
    const handleNewQuestions = () => {
        if (allQuestions.length > 0) {
            const newRandomQuestions = getRandomQuestions(allQuestions, 5);
            setQuestions(newRandomQuestions);
            setAnswers(new Array(5).fill(null));
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setTimeLeft(900); // Reset timer
            setError(null);
        }
    };

    const answeredQuestions = answers.filter(answer => answer !== null).length;

    // Loading state
    if (authLoading || questionsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-neutral-700 mb-2">
                        {authLoading ? "Authenticating..." : "Loading Questions..."}
                    </h2>
                    <p className="text-neutral-500">Please wait while we prepare your assessment.</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                        Unable to Load Assessment
                    </h2>
                    <p className="text-neutral-600 mb-6">{error}</p>
                    <div className="flex gap-4 justify-center">
                        <Button 
                            onClick={() => window.location.reload()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Try Again
                        </Button>
                        {allQuestions.length > 0 && (
                            <Button 
                                onClick={handleNewQuestions}
                                variant="outline"
                            >
                                New Questions
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // No questions found
    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                        No Questions Available
                    </h2>
                    <p className="text-neutral-600 mb-6">
                        The assessment is currently unavailable. Please contact support or try again later.
                    </p>
                    <Button 
                        onClick={() => setLocation("/dashboard")}
                        className="bg-primary hover:bg-primary/90"
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main>
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        PCB Design Assessment
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Test your knowledge with 5 randomly selected PCB design questions. This focused assessment will help us understand your current skill level.
                    </p>
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

                        {/* Step 3 - Current */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                3
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Assessment Test</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Skills evaluation</p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Results</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Recommendations</p>
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
                                        <span className={`ml-2 font-bold text-lg ${
                                            timeLeft <= 180 ? 'text-red-500' : 'text-primary'
                                        }`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                    {timeLeft <= 180 && (
                                        <div className="text-red-500 text-sm font-medium">
                                            ⚠️ Less than 3 minutes remaining!
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-neutral-600">
                                        <span className="font-medium">Progress: </span>
                                        <span className="font-bold text-primary">
                                            {answeredQuestions}/5
                                        </span>
                                    </div>
                                    <div className="text-neutral-600">
                                        <span className="font-medium">Question: </span>
                                        <span className="font-bold text-primary">
                                            {currentQuestion + 1}/5
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="mt-4">
                                <div className="w-full bg-neutral-200 rounded-full h-2">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(answeredQuestions / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Question Card - THIS WAS MISSING */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-neutral-200 mb-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                                    Question {currentQuestion + 1} of 5
                                </h2>
                                <p className="text-lg text-neutral-700 leading-relaxed">
                                    {questions[currentQuestion]?.question}
                                </p>
                            </div>

                            {/* Answer Options */}
                            <div className="space-y-4">
                                {questions[currentQuestion]?.options.map((option, index) => (
                                    <label
                                        key={`${currentQuestion}-${index}`}
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
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <div className="text-neutral-600">
                                <span className="text-sm">
                                    {selectedAnswer !== null ? "Answer selected" : "Please select an answer"}
                                </span>
                            </div>
                            
                            <Button
                                onClick={handleNext}
                                disabled={selectedAnswer === null || loading}
                                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center px-6 py-3"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin mr-2" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        {currentQuestion === questions.length - 1 ? "Submit Exam" : "Next Question"}
                                        <ChevronRight size={18} className="ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Updated Guidelines Section */}
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
                                    You have 15 minutes to complete 5 randomly selected questions. The exam will auto-submit when time runs out.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <CheckCircle size={32} className="mx-auto mb-4 text-green-500" />
                                <h3 className="text-lg font-semibold mb-2">Random Selection</h3>
                                <p className="text-neutral-600">
                                    Each test presents 5 randomly selected questions from our question bank, ensuring a unique experience every time.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <AlertCircle size={32} className="mx-auto mb-4 text-orange-500" />
                                <h3 className="text-lg font-semibold mb-2">No Going Back</h3>
                                <p className="text-neutral-600">
                                    Once you proceed to the next question, you cannot return to previous questions. Choose carefully!
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
