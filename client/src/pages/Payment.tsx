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
    Loader2
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);   // already there
const [imagePreview, setImagePreview]   = useState<string | null>(null); // NEW


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
                
                // Get package details based on selected package
                const selectedPackage = userData.selectedPackage;
                if (selectedPackage) {
                    setPackageDetails(getPackageInfo(selectedPackage));
                }
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const getPackageInfo = (packageId) => {
        const packages = {
            level1: {
                id: "level1",
                name: "Level 1 Foundation",
                subtitle: "Start from basics",
                price: "₨15,000",
                priceValue: 15000,
                duration: "6 weeks",
                description: "Build solid fundamentals and work from there",
                icon: <BookOpen className="w-8 h-8" />,
                features: [
                    "PCB Design Basics",
                    "Schematic Design",
                    "Component Placement",
                    "Basic Routing",
                    "Design Verification",
                    "3 Practice Projects",
                    "Certificate",
                    "Community Access"
                ]
            },
            complete: {
                id: "complete",
                name: "Complete Package",
                subtitle: "Beginner to advanced",
                price: "₨35,000",
                priceValue: 35000,
                duration: "Comprehensive",
                description: "Complete journey with future cohort access",
                icon: <Crown className="w-8 h-8" />,
                features: [
                    "Everything in Level 1",
                    "Advanced Techniques",
                    "Multi-layer Design",
                    "Signal Integrity",
                    "Industry Projects",
                    "Mentorship Sessions",
                    "Job Assistance",
                    "Future Cohort Access",
                    "Discounted Level 2 & 3",
                    "Lifetime Updates"
                ]
            }
        };
        return packages[packageId] || null;
    };

    const paymentMethods = [
        {
            id: "easypaisa",
            name: "EasyPaisa",
            icon: <Smartphone size={24} className="text-green-600" />,
            details: {
                account: "03001234567",
                accountName: "PCB Training Institute",
                instructions: [
                    "Open your EasyPaisa app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03001234567",
                    `Enter amount: ${packageDetails?.price || "₨15,000"}`,
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
                accountName: "PCB Training Institute",
                instructions: [
                    "Open your JazzCash app or dial *786#",
                    "Select 'Send Money' option",
                    "Enter the account number: 03007654321",
                    `Enter amount: ${packageDetails?.price || "₨15,000"}`,
                    "Complete the transaction",
                    "Take a screenshot or copy the transaction ID"
                ]
            }
        },
        {
            id: "bank",
            name: "Bank Transfer",
            icon: <Building2 size={24} className="text-blue-600" />,
            details: {
                account: "1234567890123456",
                accountName: "PCB Training Institute",
                instructions: [
                    "Visit your bank or use online banking",
                    "Transfer to Account: 1234567890123456",
                    "Account Title: PCB Training Institute",
                    "Bank: Meezan Bank Limited",
                    `Amount: ${packageDetails?.price || "₨15,000"}`,
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // store the file
  setSelectedImage(file);
  setOcrStatus("");
  setError("");    
  processImageWithOCR(file);

  // create / replace preview URL               ←-------------- NEW
  if (imagePreview) URL.revokeObjectURL(imagePreview);
  setImagePreview(URL.createObjectURL(file));  //            NEW
};



    const preprocessImage = (canvas, context) => {
        // Get image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Convert to grayscale and apply threshold
        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            // Apply threshold for better contrast
            const threshold = gray > 128 ? 255 : 0;
            data[i] = threshold;     // Red
            data[i + 1] = threshold; // Green
            data[i + 2] = threshold; // Blue
            // Alpha stays the same
        }

        context.putImageData(imageData, 0, 0);
        return canvas;
    };

    const processImageWithOCR = async (imageFile) => {
        setIsProcessingOCR(true);
        setOcrStatus("Processing image...");

        try {
            // Create canvas for image preprocessing
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = new Image();

            img.onload = async () => {
                // Set canvas size
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw image on canvas
                context.drawImage(img, 0, 0);
                
                // Preprocess image
                const processedCanvas = preprocessImage(canvas, context);
                
                // Convert canvas to blob
                processedCanvas.toBlob(async (blob) => {
                    await performOCR(blob);
                }, 'image/png');
            };

            img.src = URL.createObjectURL(imageFile);
        } catch (error) {
            console.error("Image preprocessing error:", error);
            // Fallback to original image
            await performOCR(imageFile);
        }
    };

    const performOCR = async (imageBlob: Blob) => {
  try {
    const worker = await createWorker('eng');   // ← NEW

    // (optional) fine-tune parameters – still supported
    await worker.setParameters({
      tessedit_char_whitelist:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:- ',
      tessedit_pageseg_mode: '6',               // block of text
    });

    setOcrStatus('Extracting text…');
    const {
      data: { text },
    } = await worker.recognize(imageBlob);

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


    /**
 * Try to pull a transaction / reference number from raw OCR text.
 * Covers EasyPaisa, JazzCash, SadaPay, NayaPay, generic bank/UPI,
 * PayPal-style 17-char IDs, pure numerics, hyphenated refs, etc.
 */
const extractTransactionId = (text: string): string | null => {
  // normalise white-space & punctuation
  const clean = text
    .replace(/[\n\r]/g, " ")            // new-lines → space
    .replace(/[|]+/g, " ")              // table borders
    .replace(/\s+/g, " ")               // collapse runs
    .trim();

  // --- provider-specific & common tags --------------------------
  const tagged = [
    // EasyPaisa / JazzCash apps usually print “Transaction ID : XXXXXX”
    /(?:transaction|txn|trans)\s*id\s*[:\-]?\s*([A-Z0-9\-]{6,25})/i,
    /(?:reference|ref)\s*(?:no|number)?\s*[:\-]?\s*([A-Z0-9\-]{6,25})/i,
    // NayaPay / SadaPay screens often label “TID”
    /\bTID[:\-]?\s*([A-Z0-9\-]{6,25})\b/i,
    // “Payment ID”, “Order ID” variations
    /\b(?:payment|order)\s*id\s*[:\-]?\s*([A-Z0-9\-]{6,25})\b/i
  ];
  for (const rx of tagged) {
    const m = clean.match(rx);
    if (m) return m[1].toUpperCase();
  }

  // --- generic fall-backs --------------------------------------
  // PayPal-style exactly 17-char IDs (letters+digits)
  const paypalLike = /\b[A-Z0-9]{17}\b/i;
  const paypalHit = clean.match(paypalLike);
  if (paypalHit) return paypalHit[0].toUpperCase();

  // long pure numerics (bank references, IBFT slips) 10-20 digits
  const longDigits = /\b\d{10,20}\b/;
  const digitHit = clean.match(longDigits);
  if (digitHit) return digitHit[0];

  // mixed alpha-numeric 8-25 chars (last resort)
  const mixed = /\b[A-Z0-9]{8,25}\b/i;
  const mixedHit = clean.match(mixed);
  if (mixedHit) return mixedHit[0].toUpperCase();

  return null; // nothing usable
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
            // Update user document with payment information
            await updateDoc(doc(db, "users", user.uid), {
                paymentMethod: selectedMethod,
                transactionId: transactionId.trim(),
                paymentAmount: packageDetails?.priceValue || 15000,
                paymentStatus: 'pending_verification',
                paymentSubmittedAt: serverTimestamp(),
                status: "payment_submitted"
            });

            // Navigate to success page
            setLocation("/payment-success");
        } catch (error) {
            console.error("Error submitting payment:", error);
            setError("Failed to submit payment information. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

    if (!userDetails || !packageDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main>
            {/* Header Section */}
            <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <CreditCard size={64} className="mx-auto mb-6 text-green-300" />
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
                            <h3 className="text-sm font-semibold text-green-600 text-center">Select a Package</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-green-300 -mt-8"></div>

                        {/* Step 4 - Complete */}
                        <div className="flex flex-col items-center min-w-[140px]">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-3 shadow-lg">
                                ✓
                            </div>
                            <h3 className="text-sm font-semibold text-green-600 text-center">Enroll in the Program</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Completed</p>
                        </div>

                        {/* Connector Line */}
                        <div className="hidden md:block w-16 h-0.5 bg-primary -mt-8"></div>

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
                            <h3 className="text-sm font-semibold text-primary text-center">Payment</h3>
                            <p className="text-xs text-neutral-600 text-center mt-1">Complete enrollment</p>
                        </div>
                    </div>
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
                                        <span className="text-2xl font-bold text-primary">{packageDetails.price}</span>
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
                                        className={`p-4 rounded-lg border-2 transition-all ${
                                            selectedMethod === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-neutral-200 hover:border-neutral-300'
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
      </>
    ) : (
      <>
        <Upload size={48} className="text-neutral-400 mb-2" />
        <span className="text-neutral-600">Click to upload payment screenshot</span>
        <span className="text-sm text-neutral-500 mt-1">PNG / JPG up&nbsp;to&nbsp;10 MB</span>
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
                                        <li>• Keep your transaction receipt for future reference</li>
                                        <li>• Contact support if you face any issues with payment</li>
                                        <li>• All payments are secure and your data is protected</li>
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
