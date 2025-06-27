import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Register from "@/pages/Register";
import WelcomeAssessment from "@/pages/WelcomeAssessment";
import AssessmentWrapper from "./components/AssessmentWrapper";
import Exam from "@/pages/Exam";
import ExamResults from "@/pages/ExamResults";
import Payment from "@/pages/Payment";
import Packages from "@/pages/Packages";
import EnrollmentConfirmation from "@/pages/EnrollmentConfirmation";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Onboarding from "@/pages/Onboarding";
import CompleteTrainingOptions from "@/pages/CompleteTrainingOptions"
import ProgressivePathEnrollment from "@/pages/ProgressivePathEnrollment";
import DirectEntryAssessment from "@/pages/DirectEntryAssessment";
import DirectEntryLevelSelection from "@/pages/DirectEntryLevelSelection";
import ProgressivePathRecommendation from "@/pages/ProgressivePathRecommendation";
import AdminPanel from "@/pages/AdminPanel";

// Add to your routes



function Router() {
  return (
    <>
      <Navbar />
      <BackToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/careers" component={Careers} />
        <Route path="/contact" component={Contact} />
        <Route path="/register" component={Register} />
        <Route path="/exam" component={Exam} />
        <Route path="/exam-results" component={ExamResults} />
        <Route path="/payment" component={Payment} />
        <Route path="/packages" component={Packages} />
        <Route path="/enroll" component={EnrollmentConfirmation} />
        <Route path="/payment-success" component={PaymentSuccess} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/complete-training-options" component={CompleteTrainingOptions} />
        <Route path="/progressive-path-enrollment" component={ProgressivePathEnrollment} />
        <Route path="/direct-entry-assessment" component={DirectEntryAssessment} />
        <Route path="/direct-entry-level-selection" component={DirectEntryLevelSelection} />
        <Route path="/progressive-path-recommendation" component={ProgressivePathRecommendation} />
        <Route path="/admin-panel" component={AdminPanel} />
        <Route path="/assessment">
          <ProtectedRoute>
          <AssessmentWrapper />
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
