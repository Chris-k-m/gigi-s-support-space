import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SpeakingPage from "./pages/SpeakingPage";
import QuizPage from "./pages/QuizPage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/speaking" element={<SpeakingPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  );
};

export default App;
