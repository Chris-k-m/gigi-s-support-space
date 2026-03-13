import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SpeakingPage from "./pages/SpeakingPage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
          <BrowserRouter basename="/gigi-s-support-space">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
