import { useState, useEffect } from "react";
import { TimeOfDayProvider } from "./context/TimeOfDayContext";
import Header from "./Components/Header/Header";
import Hero from "./Components/Editorial/Hero";
import TwoColumnSection from "./Components/Editorial/TwoColumnSection";
import Writing from "./Components/Editorial/Writing";
import Footer from "./Components/Editorial/Footer";
import CommandPalette from "./Components/UI/CommandPalette";
import ResumeModal from "./Components/UI/ResumeModal";
import { Toast } from "./Components/UI/Toast";
import { PROFILE } from "./data/portfolioData";

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setToastMsg("Email copied to clipboard");
    setTimeout(() => setToastMsg(""), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE.phone);
    setToastMsg("WhatsApp number copied to clipboard");
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <TimeOfDayProvider>
      <div className="relative min-h-screen overflow-x-hidden transition-colors duration-500">
        {/* 3-Zone Editorial Top Bar with Studio Light Switcher */}
        <Header />

        {/* Main Architect's Studio & Monograph Content */}
        <main>
          {/* Split Hero with Studio Desk Vignette, Quick Hiring Bar & Live Stack Playground */}
          <Hero onOpenResume={() => setResumeOpen(true)} />

          {/* Interactive Case Study Cards, Experience Timeline & Scalable Foundations */}
          <TwoColumnSection onOpenResume={() => setResumeOpen(true)} />

          {/* Engineering Essays & Distraction-Free Reader */}
          <Writing />
        </main>

        {/* Preserved Footer with Interactive Developer Console Workbench */}
        <Footer
          onOpenCommand={() => setCommandOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Quick Command & Studio Light Switcher Modal (⌘K) */}
        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          onCopyEmail={handleCopyEmail}
          onCopyPhone={handleCopyPhone}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Interactive Executive CV / Resume Preview Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          onCopyEmail={handleCopyEmail}
        />

        <Toast
          message={toastMsg}
          isVisible={!!toastMsg}
          onClose={() => setToastMsg("")}
        />
      </div>
    </TimeOfDayProvider>
  );
}

export default App;
