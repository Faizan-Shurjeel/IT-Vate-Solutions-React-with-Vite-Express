import React from "react";
import { Button } from "@/components/ui/button";
import { Target, ChevronRight, BookOpen, Award, Zap, Users, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const Onboarding = () => {
    const [, setLocation] = useLocation();

    const handleCreateProfile = () => {
        setLocation("/register");
    };

    const handleLogin = () => {
        setLocation("/login");
    };

    const features = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Core Concepts",
            description: "Master the fundamental principles of PCB design"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Professional Practices",
            description: "Learn industry-standard workflows and best practices"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Advanced Techniques",
            description: "Develop expertise in complex design challenges"
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Target size={64} className="mx-auto mb-6 text-green-300" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Start Your Journey
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            Transform your career with professional PCB design expertise
                        </p>
                        <p className="text-lg opacity-90">
                            Join our comprehensive training program and become an industry-ready PCB designer
                        </p>
                    </div>
                </div>
            </section>
            {/* Progress Steps */}
<section className="py-8 bg-white border-b border-neutral-200">
    <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-8 overflow-x-auto">
            {/* Step 0 - Active */}
            <div className="flex flex-col items-center min-w-[140px]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                    0
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                            Current Step
                        </span>
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-primary text-center">Start Your Journey</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Get an overview</p>
            </div>

            {/* Connector Line */}
            <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

            {/* Step 1 - Locked */}
            <div className="flex flex-col items-center min-w-[140px] opacity-50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                    1
                </div>
                <h3 className="text-sm font-medium text-neutral-500 text-center">Create Your Profile</h3>
                <p className="text-xs text-neutral-400 text-center mt-1">Register with us</p>
            </div>

            {/* Connector Line */}
            <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

            {/* Step 2 - Locked */}
            <div className="flex flex-col items-center min-w-[140px] opacity-50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                    2
                </div>
                <h3 className="text-sm font-medium text-neutral-500 text-center">Choose Your Track</h3>
                <p className="text-xs text-neutral-400 text-center mt-1">Bundle or progressive</p>
            </div>

            {/* Connector Line */}
            <div className="hidden md:block w-16 h-0.5 bg-neutral-300 -mt-8"></div>

            {/* Step 3 - Locked */}
            <div className="flex flex-col items-center min-w-[140px] opacity-50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 font-bold text-lg mb-3">
                    3
                </div>
                <h3 className="text-sm font-medium text-neutral-500 text-center">Confirm Your Track</h3>
                <p className="text-xs text-neutral-400 text-center mt-1">Review your choice</p>
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


            {/* Main Content */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Training Section */}
                        <div className="text-center mb-16">
                            
                            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                                Gain real-world skills with our immersive, industry-focused programs—designed for students and professionals ready to lead.
                            </p>
                        </div>

                        {/* PCB Designer Programme Card */}
                        <div className="bg-white rounded-xl shadow-lg border-2 border-primary hover:border-primary/80 ring-2 ring-primary/20 transition-all duration-300 hover:shadow-xl mb-12">
                            {/* Popular Badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                    Featured Program
                                </div>
                            </div>

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-primary text-white">
                                        <Target className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                                        Certified PCB Design Professional
                                    </h3>
                                    <p className="text-neutral-700 text-lg">
                                        Build expertise in PCB design through structured, hands-on learning—from fundamentals to advanced practices.
                                    </p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {features.map((feature, index) => (
                                        <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-blue-100 text-blue-600">
                                                {feature.icon}
                                            </div>
                                            <h4 className="font-semibold text-neutral-800 mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-neutral-600 text-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Section */}
                                <div className="text-center">
                                    <Button
                                        onClick={handleCreateProfile}
                                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg mb-4"
                                    >
                                        Enroll Now
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                    <p className="text-neutral-600 text-sm">
                                        Ready to start your PCB design journey?
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </main>
    );
};

export default Onboarding;
