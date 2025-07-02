
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    CreditCard,
    Smartphone,
    Building2,
    Copy,
    Check,
    ArrowRight,
    AlertCircle,
    Clock,
    Award,
    BookOpen,
    Target,
    Upload,
    Camera,
    User,
    Crown,
    DollarSign,
    FileImage,
    Loader2,
    ArrowLeft,
    Brain,
    Package,
    GraduationCap,
    Zap
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { createWorker } from "tesseract.js";

const Payment = () => {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const [selectedMethod, setSelectedMethod] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [copiedField, setCopiedField] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);
    
    const [ocrStatus, setOcrStatus] = useState("");
    const [isProcessingOCR, setIsProcessingOCR] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");

    useEffect(() => {
        if (!user) {
            setLocation("/register");
            return;
        }
        fetchUserDetails();
    }, [user]);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const fetchUserDetails = async () => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserDetails(userData);
                
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
                    priceValue: 12000,
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
                    priceValue: 5000,
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
                priceValue: 5000,
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
                    priceValue: 8000,
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
                    priceValue: 8000,
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
                    priceValue: 8000,
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
                priceValue: 0,
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

    const paymentMethods = [
        {
            id: "easypaisa",
            name: "EasyPaisa",
            icon: <Smartphone size={24} className="text-green-600" />,
            details: {
                account: "03001234567",
                accountName: "IT-vate Training Institute",
                instructions: [
                    "Open your EasyPaisa app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03001234567",
                    `Enter amount: ${packageDetails?.price || "₨5,000"}`,
                    "Complete the transaction",
                    "Take a screenshot or copy the transaction ID"
                ]
            }
        },
        {
            id: "jazzcash",
            name: "JazzCash",
            icon: <Smartphone size={24} className="text-red-600" />,
            details: {
                account: "03007654321",
                accountName: "IT-vate Training Institute",
                instructions: [
                    "Open your JazzCash app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03007654321",
                    `Enter amount: ${packageDetails?.price || "₨5,000"}`,
                    "Complete the transaction",
                    "Take a screenshot or copy the transaction ID"
                ]
            }
        },
        {
            id: "bank",
            name: "Meezan Bank",
            icon: <Building2 size={24} className="text-blue-600" />,
            details: {
                account: "1234567890123456",
                accountName: "IT-vate Training Institute",
                instructions: [
                    "Visit your bank or use online banking",
                    "Transfer to Account: 1234567890123456",
                    "Account Title: IT-vate Training Institute",
                    "Bank: Meezan Bank Limited",
                    `Amount: ${packageDetails?.price || "₨5,000"}`,
                    "Take a screenshot or copy the transaction reference"
                ]
            }
        }
    ];

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    // File upload function to save to project folder
    // Example with Firebase Storage


    const saveFileToProject = async (file) => {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileExtension = file.name.split('.').pop();
            const expectedFileName = `payment_${user.uid}_${timestamp}.${fileExtension}`;
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.uid);
            formData.append('userEmail', user.email);
            formData.append('packageDetails', JSON.stringify(packageDetails));
            
            console.log('Uploading file to API server...');
            
            const response = await fetch('https://itvate.habeel.xyz/api/upload-payment-screenshot', {
                method: 'POST',
                body: formData,
            });
            
            const result = await response.json();
            
            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to upload file');
            }
            
            setUploadedFileName(result.fileName);
            console.log('File uploaded successfully:', result.fileName);
            setOcrStatus(`File uploaded successfully: ${result.fileName}`);
            
            return result.fileName;
            
        } catch (error) {
            console.error('Error uploading to API server:', error);
            setOcrStatus(`Upload failed: ${error.message}. Saving locally...`);
            
            // Fallback to localStorage
            return new Promise((resolve, reject) => {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileExtension = file.name.split('.').pop();
                const fallbackFileName = `payment_${user.uid}_${timestamp}.${fileExtension}`;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const fileData = {
                            fileName: fallbackFileName,
                            base64: e.target.result,
                            originalName: file.name,
                            size: file.size,
                            type: file.type,
                            userId: user.uid,
                            userEmail: user.email,
                            packageDetails: packageDetails,
                            uploadedAt: new Date().toISOString(),
                            fallback: true
                        };
                        
                        localStorage.setItem(`payment_screenshot_${user.uid}`, JSON.stringify(fileData));
                        
                        const allScreenshots = JSON.parse(localStorage.getItem('all_payment_screenshots') || '[]');
                        allScreenshots.push(fileData);
                        localStorage.setItem('all_payment_screenshots', JSON.stringify(allScreenshots));
                        
                        setUploadedFileName(fallbackFileName);
                        setOcrStatus('File saved locally (API server failed)');
                        resolve(fallbackFileName);
                        
                    } catch (error) {
                        reject(error);
                    }
                };
                
                reader.onerror = function(error) {
                    reject(error);
                };
                
                reader.readAsDataURL(file);
            });
        }
    };
    


    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB");
            return;
        }
    
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError("Please upload an image file");
            return;
        }
    
        setSelectedImage(file);
        setOcrStatus("Uploading file...");
        setError("");
        
        // Save file to project folder
        try {
            const savedFileName = await saveFileToProject(file);
            console.log('File processing completed:', savedFileName);
            setOcrStatus("File uploaded successfully. Processing for transaction ID...");
        } catch (error) {
            console.error('Error in file upload process:', error);
            setError("File upload failed. You can still proceed by entering transaction ID manually.");
        }
        
        // Process with OCR
        processImageWithOCR(file);
    
        // Create preview
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(file));
    };
    

    const preprocessImage = (canvas, context) => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            const threshold = gray > 128 ? 255 : 0;
            data[i] = threshold;
            data[i + 1] = threshold;
            data[i + 2] = threshold;
        }

        context.putImageData(imageData, 0, 0);
        return canvas;
    };

    const processImageWithOCR = async (imageFile) => {
        setIsProcessingOCR(true);
        setOcrStatus("Processing image...");

        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();

            img.onload = async () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                const processedCanvas = preprocessImage(canvas, context);
                
                processedCanvas.toBlob(async (blob) => {
                    await performOCR(blob);
                }, 'image/png');
            };

            img.src = URL.createObjectURL(imageFile);
        } catch (error) {
            console.error("Image preprocessing error:", error);
            await performOCR(imageFile);
        }
    };

    const performOCR = async (imageBlob) => {
        try {
            const worker = await createWorker('eng');

            await worker.setParameters({
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:- ',
                tessedit_pageseg_mode: '6',
            });

            setOcrStatus('Extracting text…');
            const { data: { text } } = await worker.recognize(imageBlob);
            await worker.terminate();

            const id = extractTransactionId(text);
            if (id) {
                setTransactionId(id);
                setOcrStatus(`Transaction ID found: ${id}`);
            } else {
                setOcrStatus('Could not find transaction ID. Please enter manually.');
                console.log('Full OCR text:', text);
            }
        } catch (err) {
            console.error('OCR Error:', err);
            setOcrStatus('OCR failed. Please enter transaction ID manually.');
        } finally {
            setIsProcessingOCR(false);
        }
    };

    const extractTransactionId = (text) => {
        const clean = text
            .replace(/[\n\r]/g, " ")
            .replace(/[|]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const tagged = [
            /(?:transaction|txn|trans)\s*id\s*[:\-]?\s*([A-Z0-9\-]{6,25})/i,
            /(?:reference|ref)\s*(?:no|number)?\s*[:\-]?\s*([A-Z0-9\-]{6,25})/i,
            /\bTID[:\-]?\s*([A-Z0-9\-]{6,25})\b/i,
            /\b(?:payment|order)\s*id\s*[:\-]?\s*([A-Z0-9\-]{6,25})\b/i
        ];

        for (const rx of tagged) {
            const m = clean.match(rx);
            if (m) return m[1].toUpperCase();
        }

        const paypalLike = /\b[A-Z0-9]{17}\b/i;
        const paypalHit = clean.match(paypalLike);
        if (paypalHit) return paypalHit[0].toUpperCase();

        const longDigits = /\b\d{10,20}\b/;
        const digitHit = clean.match(longDigits);
        if (digitHit) return digitHit[0];

        const mixed = /\b[A-Z0-9]{8,25}\b/i;
        const mixedHit = clean.match(mixed);
        if (mixedHit) return mixedHit[0].toUpperCase();

        return null;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!selectedMethod) {
            setError("Please select a payment method");
            return;
        }

        if (!selectedImage) {
            setError("Please upload a payment screenshot.");
            return;
        }

        if (!transactionId.trim()) {
            setError("Please enter your transaction ID or upload payment screenshot");
            return;
        }

        if (!user) {
            setError("User not authenticated");
            return;
        }

        setIsSubmitting(true);

        try {
            await updateDoc(doc(db, "users", user.uid), {
                paymentMethod: selectedMethod,
                transactionId: transactionId.trim(),
                paymentAmount: packageDetails?.priceValue || 5000,
                paymentStatus: 'pending_verification',
                paymentSubmittedAt: serverTimestamp(),
                paymentScreenshot: uploadedFileName,
                status: "payment_submitted"
            });

            setLocation("/payment-success");
        } catch (error) {
            console.error("Error submitting payment:", error);
            setError("Failed to submit payment information. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        // Navigate back based on package type
        if (userDetails?.selectedPackage === "complete") {
            setLocation("/complete-training-options");
        } else if (userDetails?.selectedPackage === "progressive") {
            setLocation("/progressive-path-enrollment");
        } else if (userDetails?.selectedPackage === "direct") {
            setLocation("/direct-entry-level-selection");
        } else {
            setLocation("/packages");
        }
    };

    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

    if (!userDetails || !packageDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading payment details...</p>
                </div>
            </div>
        );
    }

    return (
        <main>
            {/* Header Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <CreditCard size={64} className="mx-auto mb-6 text-white/90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Complete Your Payment
                        </h1>
                        <p className="text-xl md:text-2xl mb-4">
                            You're almost there! Complete your payment to start your PCB design journey.
                        </p>
                        <p className="text-lg opacity-90">
                            Choose your preferred payment method and submit your transaction details.
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

            {/* Step 4 - Active */}
            <div className="flex flex-col items-center min-w-[140px]">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-3 shadow-lg">
                    4
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                            Current Step
                        </span>
                    </div>
                </div>
                <h3 className="text-sm font-semibold text-primary text-center">Payment</h3>
                <p className="text-xs text-neutral-600 text-center mt-1">Make payment</p>
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

            {/* Back Button */}
            <section className="py-4 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <Button
                        onClick={handleGoBack}
                        variant="ghost"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Previous Step
                    </Button>
                </div>
            </section>

            {/* Payment Section */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Package Summary */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                {packageDetails.icon}
                                <span className="ml-3">Payment Summary</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                                        {packageDetails.name}
                                    </h3>
                                    <p className="text-neutral-600 mb-4">{packageDetails.description}</p>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="text-neutral-600">Duration: {packageDetails.duration}</span>
                                    </div>
                                </div>
                                
                                <div className="bg-neutral-50 p-6 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-medium text-neutral-700">Package Price:</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-primary">{packageDetails.price}</span>
                                            {packageDetails.originalPrice && (
                                                <div className="text-sm text-neutral-500 line-through">
                                                    {packageDetails.originalPrice}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-neutral-700">Student:</span>
                                        <span className="text-neutral-600">
                                            {userDetails.firstName} {userDetails.lastName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Select Payment Method</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    {paymentMethods.map((method) => (
        <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            disabled={method.id === 'easypaisa' || method.id === 'jazzcash'}
            className={`p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 hover:border-neutral-300'
            } ${
                method.id === 'easypaisa' || method.id === 'jazzcash' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
            }`}
        >
            <div className="flex flex-col items-center">
                {method.icon}
                <span className="mt-2 font-semibold">{method.name}</span>
            </div>
        </button>
    ))}
</div>


                            {/* Payment Instructions */}
                            {selectedPaymentMethod && (
                                <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-neutral-800 mb-4">
                                        Payment Instructions - {selectedPaymentMethod.name}
                                    </h4>
                                    
                                    {/* Account Details */}
                                    <div className="bg-white p-4 rounded-lg mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Account Number:</span>
                                            <div className="flex items-center">
                                                <span className="font-mono">{selectedPaymentMethod.details.account}</span>
                                                <button
                                                    onClick={() => copyToClipboard(selectedPaymentMethod.details.account, 'account')}
                                                    className="ml-2 p-1 hover:bg-neutral-200 rounded"
                                                >
                                                    {copiedField === 'account' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Account Name:</span>
                                            <span>{selectedPaymentMethod.details.accountName}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Amount:</span>
                                            <span className="font-bold text-primary">{packageDetails.price}</span>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="space-y-2">
                                        {selectedPaymentMethod.details.instructions.map((instruction, index) => (
                                            <div key={index} className="flex items-start">
                                                <span className="bg-primary text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <span className="text-neutral-700">{instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Screenshot Upload & Transaction ID */}
                        {selectedMethod && (
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6">Submit Payment Proof</h3>
                                
                                {/* Screenshot Upload */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Upload Payment Screenshot (Transaction ID will be filled automatically.)
                                    </label>
                                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="screenshot-upload"
                                        />
                                        <label htmlFor="screenshot-upload" className="cursor-pointer">
                                            <div className="flex flex-col items-center">
                                                {imagePreview ? (
                                                    <>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Screenshot preview"
                                                            className="h-40 w-auto object-contain rounded-lg shadow"
                                                        />
                                                        <span className="text-sm text-neutral-500 mt-2">
                                                            Click to choose a different file
                                                        </span>
                                                        {uploadedFileName && (
                                                            <span className="text-xs text-green-600 mt-1">
                                                                ✓ Saved as: {uploadedFileName}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload size={48} className="text-neutral-400 mb-2" />
                                                        <span className="text-neutral-600">Click to upload payment screenshot</span>
                                                        <span className="text-sm text-neutral-500 mt-1">PNG / JPG up to 10 MB</span>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                    
                                    {/* OCR Status */}
                                    {ocrStatus && (
                                        <div className={`mt-3 p-3 rounded-lg flex items-center ${
                                            ocrStatus.includes('found') ? 'bg-green-50 text-green-700' : 
                                            ocrStatus.includes('failed') || ocrStatus.includes('Could not') ? 'bg-red-50 text-red-700' : 
                                            'bg-blue-50 text-blue-700'
                                        }`}>
                                            {isProcessingOCR && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            <span className="text-sm">{ocrStatus}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Transaction ID Input */}
                                <div className="mb-6">
                                    <label htmlFor="transactionId" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Transaction ID / Reference Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="transactionId"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter transaction ID or upload screenshot for auto-detection"
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    />
                                    <p className="text-sm text-neutral-600 mt-2">
                                        Upload a clear payment screenshot for automatic detection, or enter manually
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                        <AlertCircle size={20} className="text-red-500 mr-2" />
                                        <span className="text-red-700">{error}</span>
                                    </div>
                                )}

                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 py-3 text-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting Payment...
                                        </>
                                    ) : (
                                        <>
                                            Submit Payment Details
                                            <ArrowRight size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Important Notice */}
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                            <div className="flex items-start">
                                <AlertCircle size={24} className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
                                    <ul className="text-blue-700 space-y-1 text-sm">
                                        <li>• Your enrollment will be activated within 24 hours of payment verification</li>
                                        <li>• Upload clear payment screenshots for faster verification and automatic transaction ID detection</li>
                                        <li>• Screenshots are securely stored in our payment verification system</li>
                                        <li>• Keep your transaction receipt for future reference</li>
                                        <li>• Contact support if you face any issues with payment</li>
                
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Payment;