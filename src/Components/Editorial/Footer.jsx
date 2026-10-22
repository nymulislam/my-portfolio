import { useState } from "react";
import { FiX, FiSend, FiCopy, FiTerminal, FiCheck } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { Toast } from "../UI/Toast";
import Tooltip from "../UI/Tooltip";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE, DEV_COMMANDS } from "../../data/portfolioData";

const Footer = ({ onOpenCommand, onOpenResume }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDevConsole, setShowDevConsole] = useState(true);
  const [activeCmd, setActiveCmd] = useState("stack");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { activePeriod, cycleMood } = useTimeOfDay();
  const currentYear = new Date().getFullYear();

  const { email, phone: whatsapp, phoneFormatted, whatsappUrl } = PROFILE;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3200);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    if (label === "Email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
    showToast(`${label} copied to clipboard`);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xudagwa";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pen7cig";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "VmQcV6jIkiYGDGVuG";

    emailjs.sendForm(serviceId, templateId, e.target, publicKey).then(
      () => {
        setLoading(false);
        showToast("Message sent! Thank you for reaching out.");
        e.target.reset();
        setTimeout(() => setModalOpen(false), 1400);
      },
      () => {
        setLoading(false);
        showToast(`Could not send directly. Please email ${email}`);
      }
    );
  };

  return (
    <footer className="pt-4 sm:pt-6 pb-12 sm:pb-16" id="contact">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D2C3AE] dark:border-stone-800/80 pt-8 space-y-6">
          {/* Primary Editorial Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Say hello ↗ */}
            <button
              onClick={() => setModalOpen(true)}
              className="text-[15px] font-medium text-[#231D18] dark:text-stone-100 hover:text-[#9A4E24] dark:hover:text-amber-400 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-colors group py-1"
            >
              <span>Say hello</span>
              <span className="text-xs text-[#5C4E41] group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </button>

            {/* Right: Clean Dev & Social Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-6 text-[13.5px] sm:text-[14px] text-[#3B3128] dark:text-stone-300">
              <Tooltip content="Toggle developer console" position="top" align="center">
                <button
                  onClick={() => setShowDevConsole(!showDevConsole)}
                  className="hover:text-[#9A4E24] dark:hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 font-medium"
                >
                  <FiTerminal className="text-xs text-[#9A4E24] dark:text-amber-400" />
                  <span>Console</span>
                </button>
              </Tooltip>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1"
              >
                Open source
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1"
              >
                LinkedIn
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1"
              >
                GitHub
              </a>
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1 cursor-pointer"
                >
                  Resume
                </button>
              )}
            </div>
          </div>

          {/* Preserved Dev-Friendly Interactive Footer Workbench (880px Aligned Single-Line Output) */}
          {showDevConsole && (
            <div className="rounded-xl border border-[#D2C3AE] dark:border-stone-800 bg-[#E8DEC9]/65 dark:bg-[#1B1917]/90 p-3.5 sm:p-4 text-[12.5px] font-mono space-y-2.5 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D2C3AE]/80 dark:border-stone-800 pb-2.5">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[#9A4E24] dark:text-amber-400 font-medium">~/naymul</span>
                  <span className="text-[#6E5E4F] dark:text-stone-400">git:(main)</span>
                </div>

                {/* Interactive Command Switcher */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {Object.keys(DEV_COMMANDS).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveCmd(key)}
                      className={`px-2.5 py-1 sm:py-0.5 rounded text-[11.5px] cursor-pointer transition-colors whitespace-nowrap ${
                        activeCmd === key
                          ? "bg-[#231D18] text-[#F6EFE2] dark:bg-stone-200 dark:text-stone-900 font-medium"
                          : "text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800"
                      }`}
                    >
                      --{key}
                    </button>
                  ))}
                  <Tooltip content="Cycle ambient time of day" position="top" align="right">
                    <button
                      onClick={cycleMood}
                      className="px-2.5 py-1 sm:py-0.5 rounded text-[11.5px] text-[#9A4E24] dark:text-amber-400 font-medium hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      --mood={activePeriod}
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Command Output Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5 text-[12px] sm:text-[12.5px]">
                <div className="text-[#231D18] dark:text-stone-200 leading-relaxed break-words">
                  <span className="text-[#9A4E24] dark:text-amber-400 font-medium mr-2">
                    $ {DEV_COMMANDS[activeCmd].cmd}
                  </span>
                  <span className="opacity-60 mr-2">→</span>
                  <span>{DEV_COMMANDS[activeCmd].output}</span>
                  <span className="inline-block w-1.5 h-3.5 bg-[#9A4E24] dark:bg-amber-400 ml-1.5 align-middle animate-cursor-blink" />
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={() => handleCopy(email, "Email")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded border border-[#C5B49E] dark:border-stone-700 text-[11.5px] text-[#332B24] dark:text-stone-200 hover:bg-[#DFD3C0] dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    {copiedEmail ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                    <span>{copiedEmail ? "Copied" : "Copy email"}</span>
                  </button>
                  {onOpenCommand && (
                    <Tooltip content="Open Command Palette (⌘K)" position="top" align="right">
                      <button
                        onClick={onOpenCommand}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded border border-[#C5B49E] dark:border-stone-700 text-[11.5px] text-[#332B24] dark:text-stone-200 hover:bg-[#DFD3C0] dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                      >
                        <span>⌘K</span>
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subtle Copyright */}
          <div className="text-[12.5px] text-[#6E5E4F] dark:text-stone-400 font-normal">
            &copy; {currentYear} {PROFILE.name}
          </div>
        </div>
      </div>

      {/* Say Hello Contact Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/50 dark:bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F6EFE2] dark:bg-[#1B1917] border-t sm:border border-[#D5C7B4] dark:border-stone-800 p-5 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#DCD0C0] dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#231D18] dark:text-stone-50">
                  Say hello
                </h3>
                <p className="text-xs text-[#5C4E41] dark:text-stone-400 mt-0.5">
                  Send a direct message or copy my contact details.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-[#5C4E41] hover:text-[#231D18] dark:hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Quick copy contacts */}
            <div className="space-y-2.5 text-xs font-mono bg-[#EAE0CE]/70 dark:bg-stone-900/70 p-3.5 rounded-lg border border-[#DCD0C0] dark:border-stone-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#5C4E41] shrink-0">Email:</span>
                <div className="flex items-center gap-2 min-w-0">
                  <a
                    href={`mailto:${email}`}
                    className="text-[#231D18] dark:text-stone-200 hover:underline truncate"
                  >
                    {email}
                  </a>
                  <Tooltip content="Copy email address" position="top" align="right">
                    <button
                      onClick={() => handleCopy(email, "Email")}
                      className="p-1 cursor-pointer shrink-0"
                    >
                      <FiCopy className="text-xs text-[#5C4E41] hover:text-[#231D18] dark:hover:text-stone-200" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#DCD0C0]/60 dark:border-stone-800">
                <span className="text-[#5C4E41] shrink-0">WhatsApp:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#231D18] dark:text-stone-200 hover:underline"
                  >
                    {phoneFormatted}
                  </a>
                  <Tooltip content="Copy WhatsApp number" position="top" align="right">
                    <button
                      onClick={() => handleCopy(whatsapp, "WhatsApp number")}
                      className="p-1 cursor-pointer shrink-0"
                    >
                      <FiCopy className="text-xs text-[#5C4E41] hover:text-[#231D18] dark:hover:text-stone-200" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Direct Form */}
            <form onSubmit={sendEmail} className="space-y-3 pt-1">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D5C7B4] dark:border-stone-700 bg-transparent text-xs sm:text-sm text-[#231D18] dark:text-stone-100 focus:outline-none focus:border-[#9A4E24] dark:focus:border-stone-300 placeholder:text-[#6E5E4F]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D5C7B4] dark:border-stone-700 bg-transparent text-xs sm:text-sm text-[#231D18] dark:text-stone-100 focus:outline-none focus:border-[#9A4E24] dark:focus:border-stone-300 placeholder:text-[#6E5E4F]"
              />
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Your message..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5C7B4] dark:border-stone-700 bg-transparent text-xs sm:text-sm text-[#231D18] dark:text-stone-100 focus:outline-none focus:border-[#9A4E24] dark:focus:border-stone-300 placeholder:text-[#6E5E4F] resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 min-h-[42px] rounded-lg text-xs font-mono font-medium bg-[#231D18] text-[#F6EFE2] hover:opacity-90 dark:bg-stone-100 dark:text-stone-900 transition-opacity flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Sending..." : "Send message"}</span>
                <FiSend className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage("")}
      />
    </footer>
  );
};

export default Footer;
