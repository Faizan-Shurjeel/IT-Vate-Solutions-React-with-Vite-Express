// src/components/AssessmentWrapper.tsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import WelcomeAssessment from "../pages/WelcomeAssessment";
import { Button } from "@/components/ui/button";
import { navigate } from "wouter/use-browser-location";
import {
    CheckCircle,
    XCircle,
    Clock,
    Award,
    TrendingUp,
    RotateCcw,
    ArrowRight,
    AlertCircle,
    Target,
    BookOpen
} from "lucide-react";
const AssessmentWrapper = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchUserDoc = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTestCompleted(data.testCompleted ?? false);
          setLevel(data.level ?? "undetermined");
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDoc();
  }, [user]);

  if (authLoading || loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  if (testCompleted) {
    return (
      <div>
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
      <div className="p-8 max-w-xl mx-auto text-center">
        
  <h2 className="text-2xl font-semibold mb-4">Assessment Completed</h2>
  <p>You have already completed the test.</p>
  <p className="mt-2">
    Your assigned level is: <strong>{level}</strong>
  </p>

  <div className="mt-6 flex justify-center">
    <Button
      onClick={() => navigate("/exam-results")}
      className="bg-primary hover:bg-primary/90 flex items-center justify-center px-6 py-3"
    >
      Continue to Results
      <ArrowRight size={18} className="ml-2" />
    </Button>
  </div>
</div>
</div>
    );
  }

  // testCompleted is false -> show the test page
  return <WelcomeAssessment />;
};

export default AssessmentWrapper;
