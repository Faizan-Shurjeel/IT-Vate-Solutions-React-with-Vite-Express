// src/components/AssessmentWrapper.tsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import WelcomeAssessment from "../pages/WelcomeAssessment";

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
      <div className="p-8 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Assessment Completed</h2>
        <p>You have already completed the test.</p>
        <p>Your assigned level is: <strong>{level}</strong></p>
      </div>
    );
  }

  // testCompleted is false -> show the test page
  return <WelcomeAssessment />;
};

export default AssessmentWrapper;
