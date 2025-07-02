import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    Clock,
    Mail,
    Phone,
    User,
    Crown,
    BookOpen,
    Home,
    MessageSquare,
    Calendar,
    Shield,
    ArrowRight,
    Package,
    GraduationCap,
    Target,
    Award,
    Zap,
    XCircle,
    AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const PaymentSuccess = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [userDetails, setUserDetails] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        if (!user) {
            setLocation("/register");
            return;
        }
        fetchUserDetails();
    }, [user]);

    const fetchUserDetails = async () => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserDetails(userData);
                
                // Get payment status from Firebase (defaults to pending_verification)
                setPaymentStatus(userData.paymentStatus || 'pending_verification');
                
                // Get package details based on selected package and level
                const selectedPackage = userData.selectedPackage;
                const selectedLevel = userData.selectedLevel;
                const selectedOption = userData.selectedOption;
                
                if (selectedPackage) {
                    setPackageDetails(getPackageInfo(selectedPackage, selectedLevel, selectedOption));
                }
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const getPackageInfo = (packageId, levelId, optionId) => {
        const packages = {
            complete: {
                bundle: {
                    id: "complete-bundle",
                    name: "Complete Training Bundle",
                    subtitle: "All 3 Levels at Once",
                    price: "₨12,000",
                    originalPrice: "₨15,000",
                    discount: "20% OFF",
                    duration: "All Levels",
                    description: "Get all 3 levels with maximum savings and continuous learning progression",
                    icon: <Package className="w-8 h-8" />,
                    features: [
                        "All 3 Levels Included",
                        "20% Discount Applied",
                        "Continuous Learning Path",
                        "Maximum Value",
                        "Single Payment",
                        "Complete Certification Track"
                    ]
                },
                "level-by-level": {
                    id: "complete-level-by-level",
                    name: "Complete Training - Level by Level",
                    subtitle: "Starting with Level 1",
                    price: "₨5,000",
                    duration: "Per Level (4 Weeks each)",
                    description: "Start at Level 1, unlock the next level after each IT-vate certificate",
                    icon: <GraduationCap className="w-8 h-8" />,
                    features: [
                        "Start from Level 1 (Required)",
                        "Unlock Next Level After Certificate",
                        "₨5,000 per level",
                        "Step-by-Step Learning",
                        "Flexible Payment Schedule",
                        "Progress at Your Own Pace"
                    ]
                }
            },
            progressive: {
                id: "progressive-level-1",
                name: "Progressive Path - Level 1",
                subtitle: "Foundation Level",
                price: "₨5,000",
                duration: "4 Weeks",
                description: "Build your foundation in PCB design with essential concepts and basic circuit design principles.",
                icon: <BookOpen className="w-8 h-8" />,
                features: [
                    "Introduction to PCB Design",
                    "Basic Circuit Principles",
                    "Component Selection",
                    "Schematic Design Basics",
                    "Design Rules & Guidelines",
                    "Hands-on Project",
                    "IT-vate Certificate upon completion"
                ]
            },
            direct: {
                "level-1": {
                    id: "direct-level-1",
                    name: "Direct Entry - Level 1",
                    subtitle: "Foundation Level",
                    price: "₨8,000",
                    duration: "4 Weeks",
                    description: "Build your foundation in PCB design with essential concepts and basic circuit design principles.",
                    icon: <BookOpen className="w-8 h-8" />,
                    features: [
                        "Introduction to PCB Design",
                        "Basic Circuit Principles",
                        "Component Selection",
                        "Schematic Design Basics",
                        "Design Rules & Guidelines",
                        "Hands-on Project",
                        "IT-vate Certificate upon completion"
                    ]
                },
                "level-2": {
                    id: "direct-level-2",
                    name: "Direct Entry - Level 2",
                    subtitle: "Intermediate Level",
                    price: "₨8,000",
                    duration: "4 Weeks",
                    description: "Advance your skills with intermediate PCB design techniques and layout optimization.",
                    icon: <Target className="w-8 h-8" />,
                    features: [
                        "Advanced Layout Techniques",
                        "Signal Integrity Basics",
                        "Multi-layer PCB Design",
                        "Component Placement Optimization",
                        "Routing Strategies",
                        "Design Verification",
                        "IT-vate Certificate upon completion"
                    ]
                },
                "level-3": {
                    id: "direct-level-3",
                    name: "Direct Entry - Level 3",
                    subtitle: "Advanced Level",
                    price: "₨8,000",
                    duration: "4 Weeks",
                    description: "Master advanced PCB design with high-speed design, EMI/EMC considerations, and professional workflows.",
                    icon: <Award className="w-8 h-8" />,
                    features: [
                        "High-Speed PCB Design",
                        "EMI/EMC Considerations",
                        "Advanced Signal Integrity",
                        "Professional Design Workflows",
                        "Industry Best Practices",
                        "Portfolio Project",
                        "IT-vate Master Certificate"
                    ]
                }
            },
            special: {
                id: "special-track",
                name: "Special Track - One on One",
                subtitle: "Personalized Training",
                price: "Contact Us",
                duration: "Flexible",
                description: "Personalized one-on-one training for any level",
                icon: <User className="w-8 h-8" />,
                features: [
                    "One-on-One Training",
                    "Any Level Available",
                    "Personalized Approach",
                    "Flexible Schedule",
                    "Custom Curriculum",
                    "Direct Mentor Access"
                ]
            }
        };

        // Handle different package structures
        if (packageId === "complete" && optionId) {
            return packages.complete[optionId] || packages.complete.bundle;
        } else if (packageId === "direct" && levelId) {
            return packages.direct[levelId] || packages.direct["level-1"];
        } else if (packageId === "progressive") {
            return packages.progressive;
        } else if (packageId === "special") {
            return packages.special;
        }
        
        return packages.progressive; // Default fallback
    };

    // Get status configuration for dynamic content
    const getStatusConfig = () => {
        switch (paymentStatus) {
            case 'verified':
                return {
                    heroIcon: <CheckCircle size={80} className="mx-auto mb-6 text-green-200" />,
                    heroGradient: "from-green-600 to-green-500",
                    heroTitle: "Payment Verified Successfully!",
                    heroSubtitle: "Welcome to IT-vate! Your enrollment is confirmed.",
                    statusIcon: <CheckCircle className="w-8 h-8 text-green-500 mr-3" />,
                    statusTitle: "Payment Verified",
                    statusBg: "bg-green-50 border-green-200",
                    statusTextColor: "text-green-600",
                    nextStepsIcon: <ArrowRight className="w-8 h-8 text-green-500 mr-3" />,
                    nextStepsTitle: "Your Next Steps",
                    showWhatsApp: true
                };
            case 'rejected':
                return {
                    heroIcon: <XCircle size={80} className="mx-auto mb-6 text-red-200" />,
                    heroGradient: "from-red-600 to-red-500",
                    heroTitle: "Payment Could Not Be Verified",
                    heroSubtitle: "There was an issue with your payment verification.",
                    heroDescription: "Please contact our support team immediately for assistance.",
                    statusIcon: <XCircle className="w-8 h-8 text-red-500 mr-3" />,
                    statusTitle: "Payment Rejected",
                    statusBg: "bg-red-50 border-red-200",
                    statusTextColor: "text-red-600",
                    nextStepsIcon: <AlertCircle className="w-8 h-8 text-red-500 mr-3" />,
                    nextStepsTitle: "What You Need to Do",
                    showWhatsApp: false
                };
            default: // pending_verification
                return {
                    heroIcon: <CheckCircle size={80} className="mx-auto mb-6 text-green-200" />,
                    heroGradient: "from-green-600 to-green-500",
                    heroTitle: "Payment Submitted Successfully!",
                    heroSubtitle: "Thank you for your enrollment. Your payment details have been received and are being processed.",
                    heroDescription: "You will receive confirmation and access details within 24 hours.",
                    statusIcon: <Clock className="w-8 h-8 text-blue-500 mr-3" />,
                    statusTitle: "Payment Under Review",
                    statusBg: "bg-green-50 border-green-200",
                    statusTextColor: "text-green-600",
                    nextStepsIcon: <Clock className="w-8 h-8 text-blue-500 mr-3" />,
                    nextStepsTitle: "What Happens Next?",
                    showWhatsApp: false
                };
        }
    };

    if (!userDetails || !packageDetails || !paymentStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading confirmation details...</p>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig();

    return (
        <main>
            {/* Hero Section */}
            <section className={`py-16 bg-gradient-to-br ${statusConfig.heroGradient} text-white`}>
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        {statusConfig.heroIcon}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {statusConfig.heroTitle}
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            {statusConfig.heroSubtitle}
                        </p>
                        <p className="text-lg opacity-90">
                            {statusConfig.heroDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-8 bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center space-x-8 overflow-x-auto">
                        {/* Step 0 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Start Your Journey</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 1 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Create Your Profile</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 2 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Choose Your Track</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 3 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Confirm Your Track</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 4 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Payment</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 5 - Active */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                                5
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                        Current Step
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-primary text-center">Confirmation</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Enrolled!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Details */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Payment Confirmation */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                {statusConfig.statusIcon}
                                {statusConfig.statusTitle}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Enrollment Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Student:</span>
                                            <span className="text-neutral-600">
                                                {userDetails.firstName} {userDetails.lastName}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Email:</span>
                                            <span className="text-neutral-600">{userDetails.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                            <span className="font-medium text-neutral-700 w-20">Date:</span>
                                            <span className="text-neutral-600">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`${statusConfig.statusBg} p-6 rounded-lg border`}>
                                    <div className="flex items-center mb-4">
                                        {packageDetails.icon}
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-neutral-800">
                                                {packageDetails.name}
                                            </h4>
                                            <p className="text-neutral-600">{packageDetails.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-neutral-700">Amount Paid:</span>
                                        <div className="text-right">
                                            <span className={`text-2xl font-bold ${statusConfig.statusTextColor}`}>
                                                {packageDetails.price}
                                            </span>
                                            {packageDetails.originalPrice && (
                                                <div className="text-sm text-neutral-500 line-through">
                                                    {packageDetails.originalPrice}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-neutral-700">Duration:</span>
                                        <span className="text-neutral-600">{packageDetails.duration}</span>
                                    </div>
                                    {userDetails.transactionId && (
                                        <div className={`mt-3 pt-3 border-t ${paymentStatus === 'verified' ? 'border-green-200' : paymentStatus === 'rejected' ? 'border-red-200' : 'border-green-200'}`}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-neutral-700">Transaction ID:</span>
                                                <span className="text-sm font-mono text-neutral-600">
                                                    {userDetails.transactionId}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Group Link - Only show if verified */}
                        {statusConfig.showWhatsApp && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                                <div className="flex items-start">
                                    <MessageSquare className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                                            🎉 Join Our WhatsApp Community
                                        </h3>
                                        <p className="text-green-700 mb-4">
                                            Connect with fellow students, get updates, and access exclusive resources in our WhatsApp group.
                                        </p>
                                        <Button
                                            onClick={() => window.open('https://chat.whatsapp.com/EcfmKkxw3nWIqGg4bEIHOj?mode=ac_t', '_blank')}
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                                        >
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Join WhatsApp Group
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Training Information Box */}
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 shadow-sm">
    <div className="flex items-start">
        <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
            <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                📚 Training Details & Requirements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Venue Information */}
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                        <Home className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-blue-800">Training Venue</h4>
                    </div>
                    <div className="text-gray-700 space-y-1">
                        <p className="font-medium">Hall No. 1, Ground Floor</p>
                        <p>Hotel Nova, Johar Town</p>
                        <p>Lahore, Pakistan</p>
                    </div>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                        <Package className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-blue-800">What to Bring</h4>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <div className="bg-yellow-100 rounded-full p-2 mr-3">
                            💻
                        </div>
                        <div>
                            <p className="font-medium text-yellow-800">Your Laptop</p>
                            <p className="text-sm text-gray-600">Required for hands-on training</p>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* Training Schedule */}
            <div className="mt-6 bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Training Schedule - July 2025</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700 mb-1">12th</div>
                        <div className="text-sm font-medium text-green-600">Level 1</div>
                        <div className="text-xs text-green-500">July 2025</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700 mb-1">19th</div>
                        <div className="text-sm font-medium text-blue-600">Level 2</div>
                        <div className="text-xs text-blue-500">July 2025</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-700 mb-1">26th</div>
                        <div className="text-sm font-medium text-purple-600">Level 3</div>
                        <div className="text-xs text-purple-500">July 2025</div>
                    </div>
                </div>
                
               
            </div>
        </div>
    </div>
</div>


                        {/* What Happens Next */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                {statusConfig.nextStepsIcon}
                                {statusConfig.nextStepsTitle}
                            </h2>
                            
                            <div className="space-y-6">
                                {paymentStatus === 'pending_verification' && (
                                    <>
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                1
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Payment Verification</h3>
                                                <p className="text-neutral-600">
                                                    Our team will verify your payment within 24 hours. 
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                2
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Enrollment Activation</h3>
                                                <p className="text-neutral-600">
                                                    Your enrollment will be confirmed.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                3
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Training Schedule</h3>
                                                <p className="text-neutral-600">
                                                    You will be notified about the training schedule and cohort start dates as per your selected package.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                4
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Begin Your Journey!</h3>
                                                <p className="text-neutral-600">
                                                    Start your PCB design training and work towards your IT-vate certification.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {paymentStatus === 'verified' && (
                                    <>
                                        <div className="flex items-start">
                                            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                1
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Join WhatsApp Group</h3>
                                                <p className="text-neutral-600">
                                                    Click the link above to join our community and stay updated with announcements.
                                                </p>
                                            </div>
                                        </div>
                                        
                                  
                                        
                                        <div className="flex items-start">
                                            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                2
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Training Schedule</h3>
                                                <p className="text-neutral-600">
                                                    You will be notified about the training schedule and cohort start dates as per your selected package.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                3
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Begin Your Journey!</h3>
                                                <p className="text-neutral-600">
                                                    Start your PCB design training and work towards your IT-vate certification.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {paymentStatus === 'rejected' && (
                                    <>
                                        <div className="flex items-start">
                                            <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                1
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Contact Support Immediately</h3>
                                                <p className="text-neutral-600">
                                                    Reach out to our support team to resolve the payment issue and complete your enrollment.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                2
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Provide Transaction Details</h3>
                                                <p className="text-neutral-600">
                                                    Have your transaction ID ready: <strong>{userDetails.transactionId}</strong>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">
                                                3
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-800 mb-2">Resubmit Payment if Needed</h3>
                                                <p className="text-neutral-600">
                                                    Our team will guide you through the process to complete your enrollment.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className={`${paymentStatus === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 mb-8`}>
                            <div className="flex items-start">
                                <Shield className={`w-6 h-6 ${paymentStatus === 'rejected' ? 'text-red-600' : 'text-blue-600'} mr-3 mt-1 flex-shrink-0`} />
                                <div>
                                    <h3 className={`text-lg font-semibold ${paymentStatus === 'rejected' ? 'text-red-800' : 'text-blue-800'} mb-2`}>
                                        Important Information
                                    </h3>
                                    <ul className={`${paymentStatus === 'rejected' ? 'text-red-700' : 'text-blue-700'} space-y-2`}>
                                        <li>• Keep your transaction ID for future reference: <strong>{userDetails.transactionId}</strong></li>
                                        {paymentStatus === 'rejected' ? (
                                            <>
                                                <li>• Contact support immediately to resolve the payment issue</li>
                                                <li>• Have your transaction details ready when contacting support</li>
                                                <li>• Your enrollment will be activated once payment is resolved</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>• Check your spam folder if you don't receive our emails</li>
                                                <li>• Contact support if you have any questions or concerns</li>
                                                <li>• Your enrollment is confirmed once payment is verified</li>
                                            </>
                                        )}
                                        {packageDetails.id === 'complete-bundle' && (
                                            <li>• You have access to all 3 levels with this package</li>
                                        )}
                                        {packageDetails.id === 'complete-level-by-level' && (
                                            <li>• Complete Level 1 to unlock Level 2</li>
                                        )}
                                        {packageDetails.id === 'progressive-level-1' && (
                                            <li>• Earn your certificate to unlock Level 2</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={() => setLocation("/")}
                                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                Return to Home
                            </Button>
                            
                            <Button
                                onClick={() => setLocation("/contact")}
                                variant="outline"
                                className={`${paymentStatus === 'rejected' ? 'border-red-500 text-red-500 hover:bg-red-500' : 'border-primary text-primary hover:bg-primary'} hover:text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300`}
                            >
                                <MessageSquare className="w-5 h-5 mr-2" />
                                {paymentStatus === 'rejected' ? 'Get Help Now' : 'Contact Support'}
                            </Button>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-8 text-center">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                                <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                                    Need Help? Contact Us
                                </h3>
                                <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">support@itvate.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">+92 300 1234567</span>
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

export default PaymentSuccess;
