import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Clock, Award, FileText, ChevronRight, Lock, Info } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

const WelcomeAssessment = () => {
    const [showTerms, setShowTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSkipToPackages = () => {
        setLoading(true);
        navigate("/packages");
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

            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 1 - Completed */}
      <div className="flex flex-col items-center min-w-[140px]">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
          ✓
        </div>
        <h3 className="text-sm font-semibold text-green-600 text-center">Create Account</h3>
        <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
      </div>

      {/* Connector Line */}
      <div className="hidden md:block w-16 h-0.5 bg-green-200 -mt-8"></div>

      {/* Step 2 - Active */}
      <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                1
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Training Overview</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Details about the program</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 3 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                3
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Select a Package</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Choose from offered packages</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 4 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                4
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Enroll in the Program</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Finalize your enrollment</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

                        {/* Step 5 - Pending */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                                5
                            </div>
                            <h3 className="text-sm font-medium text-neutral-500 text-center">Payment</h3>
                            <p className="text-xs text-neutral-400 text-center mt-1">Make payment</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Initial Phase Notice */}
            <section className="py-12 bg-blue-50 border-b border-blue-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <Info size={24} className="text-blue-600 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                                        Initial Phase - Streamlined Process
                                    </h3>
                                    <p className="text-blue-800 mb-4">
                                        We're currently in our initial launch phase. To get you started quickly, 
                                        you can proceed directly to explore our training packages without taking 
                                        the skills assessment.
                                    </p>
                                    <div className="bg-blue-100 p-4 rounded-lg">
                                        <p className="text-sm text-blue-700">
                                            <strong>Note:</strong> The comprehensive skills assessment will be available 
                                            in our next phase to provide personalized learning paths. For now, 
                                            training packages are designed to accommodate all learners.
                                        </p>
                                    </div>
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
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                            What's Next?
                        </h2>
                        {/* <p className="text-lg text-neutral-600 mb-12">
                            Let's get you started with our comprehensive PCB Design training. You can explore 
                            our carefully crafted packages that cater to different learning preferences and career goals.
                        </p> */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <BookOpen size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Explore Packages</h3>
                                <p className="text-neutral-600">
                                    Review our training packages designed professionally.
                                </p>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <Target size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Choose Your Path</h3>
                                <p className="text-neutral-600">
                                    Select the package that best matches your needs.
                                </p>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
                                <Award size={48} className="mx-auto mb-4 text-primary" />
                                <h3 className="text-xl font-semibold mb-3">Start Learning</h3>
                                <p className="text-neutral-600">
                                    Begin your journey by enrolling and completing payment.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                onClick={handleSkipToPackages}
                                disabled={loading}
                                className="px-8 py-3 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                            >
                                {loading ? (
                                    "Loading Packages..."
                                ) : (
                                    <>
                                        Explore Training Packages
                                        <ChevronRight size={18} className="ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Details - Locked/Blurred */}
            <section className="py-16 bg-neutral-50 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto relative">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
                            <div className="text-center p-8">
                                <Lock size={48} className="mx-auto mb-4 text-neutral-400" />
                                <h3 className="text-xl font-semibold text-neutral-600 mb-3">
                                    Skills Assessment - Coming Soon
                                </h3>
                                <p className="text-neutral-500 max-w-md mx-auto">
                                    The comprehensive skills assessment will be available in our next phase. 
                                    For now, you can proceed directly to explore our training packages.
                                </p>
                            </div>
                        </div>

                        {/* Blurred Content */}
                        <div className="filter blur-sm pointer-events-none">
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
                                        <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                                            Read Terms
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 mb-6">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                                        disabled
                                    />
                                    <label className="text-sm text-neutral-600">
                                        I have read and agree to the terms and conditions for the skills assessment.
                                    </label>
                                </div>

                                <div className="text-center">
                                    <Button
                                        disabled
                                        className="px-8 py-3 rounded-lg font-medium bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                    >
                                        Continue to Skills Assessment
                                        <ChevronRight size={18} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WelcomeAssessment;