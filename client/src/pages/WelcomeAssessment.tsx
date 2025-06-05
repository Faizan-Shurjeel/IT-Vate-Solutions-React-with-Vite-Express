import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

const WelcomeAssessment = () => {
    const [showTerms, setShowTerms] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        if (!agreedToTerms) {
            alert("Please read and agree to the terms and conditions before proceeding.");
            return;
        }
        
        setLoading(true);
        navigate("/exam");
    };

    const termsContent = `
TERMS AND CONDITIONS - PCB Designer Programme Skills Assessment

1. ASSESSMENT PURPOSE
This skills assessment is designed to evaluate your current knowledge and experience in PCB design, electronics, and related technical areas. The results will help us recommend the most suitable training path for your career goals.

2. ASSESSMENT DETAILS
- Duration: Approximately 30-45 minutes
- Format: Multiple choice and practical scenario questions
- Coverage: Basic electronics, PCB design principles, CAD tools, and industry practices
- No external resources or assistance permitted during the test

3. DATA USAGE
Your assessment responses and results will be used solely for:
- Determining your appropriate training track
- Customizing your learning experience
- Tracking your progress throughout the programme
- Providing personalized recommendations

4. CONFIDENTIALITY
All assessment data and personal information will be kept confidential and secure. We do not share individual results with third parties without explicit consent.

5. RETAKING POLICY
You may retake the assessment once if you're not satisfied with your initial results. Your highest score will be considered for programme placement.

6. TECHNICAL REQUIREMENTS
Ensure you have a stable internet connection and uninterrupted time to complete the assessment in one sitting.

By agreeing to these terms, you confirm that you understand the assessment process and consent to the collection and use of your data as described above.
    `;

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <CheckCircle size={64} className="mx-auto mb-6 text-green-300" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Welcome to Your PCB Design Journey!
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Thank you for your interest in our comprehensive PCB Designer Programme.
                        </p>
                        <p className="text-lg opacity-90">
                            You've taken the first step towards mastering one of the most in-demand skills in electronics engineering.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                            What's Next?
                        </h2>
                        <p className="text-lg text-neutral-600 mb-12">
                            Now that you've registered, we need to understand your current skill level to provide you with the most effective training path. Our personalized approach ensures you get exactly what you need to succeed.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <Target size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Skill Assessment</h3>
                                <p className="text-neutral-600">
                                    Take our comprehensive evaluation to identify your strengths and areas for improvement.
                                </p>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <BookOpen size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Personalized Path</h3>
                                <p className="text-neutral-600">
                                    Receive a customized training recommendation based on your assessment results.
                                </p>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <Award size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                                <p className="text-neutral-600">
                                    Begin your journey with industry-focused curriculum and hands-on projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Details */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
                            Skills Assessment Overview
                        </h2>

                        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex items-start space-x-4">
                                    <Clock size={24} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Duration</h3>
                                        <p className="text-neutral-600">30-45 minutes of focused assessment</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Target size={24} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Coverage</h3>
                                        <p className="text-neutral-600">Electronics fundamentals, PCB design, CAD tools</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <BookOpen size={24} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Format</h3>
                                        <p className="text-neutral-600">Multiple choice and practical scenarios</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Award size={24} className="text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Outcome</h3>
                                        <p className="text-neutral-600">Personalized training track recommendation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-center">Why Take the Assessment?</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                    <span>Skip content you already know and focus on what matters</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                    <span>Get training recommendations tailored to your experience level</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                    <span>Maximize your learning efficiency and career advancement</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                    <span>Connect with peers at similar skill levels for collaborative learning</span>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Agreement */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold flex items-center">
                                        <FileText size={20} className="mr-2" />
                                        Terms and Conditions
                                    </h3>
                                    <button
                                        onClick={() => setShowTerms(!showTerms)}
                                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        {showTerms ? "Hide" : "Read Terms"}
                                    </button>
                                </div>
                                
                                {showTerms && (
                                    <div className="bg-neutral-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap text-sm text-neutral-700 font-sans">
                                            {termsContent}
                                        </pre>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start space-x-3 mb-6">
                                <input
                                    type="checkbox"
                                    id="terms-agreement"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                                />
                                <label htmlFor="terms-agreement" className="text-sm text-neutral-600">
                                    I have read and agree to the terms and conditions for the skills assessment. 
                                    I understand that this evaluation will help determine my appropriate training path 
                                    and that my responses will be kept confidential.
                                </label>
                            </div>

                            <div className="text-center">
                                <Button
                                    onClick={handleContinue}
                                    disabled={loading || !agreedToTerms}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all ${
                                        agreedToTerms 
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg' 
                                            : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                                    }`}
                                >
                                    {loading ? (
                                        "Preparing Assessment..."
                                    ) : (
                                        <>
                                            Continue to Skills Assessment
                                            <ChevronRight size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            {!agreedToTerms && (
                                <p className="text-sm text-neutral-500 text-center mt-3">
                                    Please read and agree to the terms to continue
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WelcomeAssessment;