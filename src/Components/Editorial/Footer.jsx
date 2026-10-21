import { useState } from "react";
import { FiX, FiSend, FiCopy } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { Toast } from "../UI/Toast";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const currentYear = new Date().getFullYear();

  const email = "naymulislam241@gmail.com";
  const whatsapp = "+8801401380467";

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xudagwa";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pen7cig";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "VmQcV6jIkiYGDGVuG";

    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(
        () => {
          setLoading(false);
          showToast("Thank you for reaching out! Your message was sent.");
          e.target.reset();
          setTimeout(() => setModalOpen(false), 1500);
        },
        () => {
          setLoading(false);
          showToast("Could not send directly. Please email naymulislam241@gmail.com");
        }
      );
  };

  return (
    <footer className="pt-12 pb-0 border-t border-stone-200 dark:border-stone-800/80" id="contact">
      <div className="max-w-2xl mx-auto px-6 space-y-6">
        {/* Navigation line matching screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Say hello on left */}
          <button
            onClick={() => setModalOpen(true)}
            className="font-serif text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto font-medium"
          >
            <span>Say hello</span>
            <span className="text-xs">↗</span>
          </button>

          {/* Social links on right */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-600 dark:text-stone-400 font-mono">
            <a
              href="https://github.com/nymulislam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nymulislam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/8801401380467"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://t.ly/aR09W"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-stone-400 dark:text-stone-500 font-normal">
          &copy; {currentYear} Naymul Islam
        </div>
      </div>

      {/* Say Hello Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#FBF9F5] dark:bg-[#1E1C1A] border border-stone-300 dark:border-stone-700 p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-stone-50">
                  Say Hello
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Send a message or reach out directly.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
                aria-label="Close modal"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Quick copy contacts */}
            <div className="space-y-2 text-xs font-mono bg-stone-100/70 dark:bg-stone-900/60 p-3 rounded-lg border border-stone-200/60 dark:border-stone-800/60">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Email:</span>
                <div className="flex items-center gap-1.5">
                  <a href={`mailto:${email}`} className="text-stone-800 dark:text-stone-200 hover:underline">
                    {email}
                  </a>
                  <button onClick={() => handleCopy(email, "Email")} title="Copy email">
                    <FiCopy className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-stone-200/40 dark:border-stone-800/40">
                <span className="text-stone-500">WhatsApp:</span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/8801401380467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 dark:text-stone-200 hover:underline"
                  >
                    +880 140-1380467
                  </a>
                  <button onClick={() => handleCopy(whatsapp, "Phone")} title="Copy phone">
                    <FiCopy className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200" />
                  </button>
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
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 placeholder:text-stone-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 placeholder:text-stone-400"
              />
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Your message..."
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 placeholder:text-stone-400 resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-xs font-mono font-medium bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
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
