import { useState, useEffect, useRef } from "react";
import { TimeOfDayProvider } from "./context/TimeOfDayContext";
import Header from "./Components/Header/Header";
import Hero from "./Components/Editorial/Hero";
import TwoColumnSection from "./Components/Editorial/TwoColumnSection";
import Writing from "./Components/Editorial/Writing";
import Footer from "./Components/Editorial/Footer";
import CommandPalette from "./Components/UI/CommandPalette";
import ResumeModal from "./Components/UI/ResumeModal";
import ContactModal from "./Components/UI/ContactModal";
import AmbientStudioBackdrop from "./Components/UI/AmbientStudioBackdrop";
import { Toast } from "./Components/UI/Toast";
import { PROFILE } from "./data/portfolioData";
import { downloadResumePdf } from "./utils/generateResumePdf";

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimerRef = useRef(null);

  const showToast = (message, duration = 2600) => {
    setToastMsg(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => setToastMsg(""), duration);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    showToast("Email copied to clipboard");
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE.phone);
    showToast("WhatsApp number copied to clipboard");
  };

  const handleDownloadPdf = () => {
    showToast("Resume PDF downloaded (Naymul_Islam_Resume.pdf)", 2800);
  };

  const handleDirectDownloadPdf = () => {
    downloadResumePdf();
    handleDownloadPdf();
  };

  return (
    <TimeOfDayProvider>
      <div className="relative min-h-screen overflow-x-clip transition-colors duration-500">
        {/* Subtle Time-Reactive Studio Light Aura */}
        <AmbientStudioBackdrop />

        {/* 3-Zone Editorial Top Bar with Quick Hire Action & Studio Light Switcher */}
        <Header
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Main Architect's Studio & Monograph Content */}
        <main className="relative z-10">
          {/* Split Hero with Studio Desk Vignette, HR Action Bar, Proof Strip & Live Stack Playground */}
          <Hero
            onOpenResume={() => setResumeOpen(true)}
            onDownloadPdf={handleDirectDownloadPdf}
            onOpenContact={() => setContactOpen(true)}
            onCopyEmail={handleCopyEmail}
            onNotify={showToast}
          />

          {/* Interactive Case Study Cards, Skills Matrix, Experience & Education, Foundations */}
          <TwoColumnSection
            onOpenResume={() => setResumeOpen(true)}
            onDownloadPdf={handleDirectDownloadPdf}
          />

          {/* Engineering Essays & Distraction-Free Reader */}
          <Writing />
        </main>

        {/* Preserved Footer with Interactive Developer Console Workbench */}
        <div className="relative z-10">
          <Footer
            onOpenCommand={() => setCommandOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
            onDownloadPdf={handleDirectDownloadPdf}
            onOpenContact={() => setContactOpen(true)}
            onCopyEmail={handleCopyEmail}
          />
        </div>

        {/* Quick Command & Studio Light Switcher Modal (⌘K) */}
        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          onCopyEmail={handleCopyEmail}
          onCopyPhone={handleCopyPhone}
          onOpenResume={() => setResumeOpen(true)}
          onDownloadPdf={handleDirectDownloadPdf}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Interactive Executive CV / Resume Preview Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          onCopyEmail={handleCopyEmail}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Global Direct Contact & Quick-Copy Modal */}
        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          onCopyEmail={handleCopyEmail}
          onCopyPhone={handleCopyPhone}
          onNotify={showToast}
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
