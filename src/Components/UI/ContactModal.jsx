import { useState } from "react";
import { FiX, FiSend, FiCopy, FiExternalLink } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import ModalShell from "./ModalShell";
import Tooltip from "./Tooltip";
import { PROFILE } from "../../data/portfolioData";

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D5C7B4] dark:border-amber-500/20 bg-[#EFE6D5]/35 dark:bg-[#141210]/70 text-xs sm:text-sm text-[#231D18] dark:text-stone-100 focus:outline-none focus:border-[#9A4E24] dark:focus:border-amber-400/70 placeholder:text-[#6E5E4F] dark:placeholder:text-stone-500";

const ContactModal = ({ isOpen, onClose, onCopyEmail, onCopyPhone, onNotify }) => {
  const [loading, setLoading] = useState(false);
  const { email, phoneFormatted, whatsappUrl, linkedinUrl, githubUrl } = PROFILE;

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xudagwa",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pen7cig",
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "VmQcV6jIkiYGDGVuG"
      )
      .then(
        () => {
          setLoading(false);
          onNotify?.("Message sent! Thank you for reaching out.");
          e.target.reset();
          setTimeout(onClose, 1200);
        },
        () => {
          setLoading(false);
          onNotify?.(`Could not send directly. Please email ${email}`);
        }
      );
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="contact-modal-title">
      <div className="flex items-start justify-between gap-4 border-b border-[#DCD0C0] dark:border-amber-500/15 pb-3">
        <div>
          <h3 id="contact-modal-title" className="font-serif text-xl font-normal text-[#231D18] dark:text-stone-50">
            Start a conversation
          </h3>
          <p className="text-xs text-[#5C4E41] dark:text-stone-400 mt-0.5">{PROFILE.availabilityBadge}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#5C4E41] hover:text-[#231D18] dark:hover:text-white hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/60 active:scale-[0.96] transition-all cursor-pointer"
          aria-label="Close contact dialog"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Quick copy contacts */}
      <div className="studio-modal-subcard space-y-2.5 text-xs font-mono p-3.5 rounded-lg border">
        {[
          { label: "Email:", value: email, href: `mailto:${email}`, onCopy: onCopyEmail, tip: "Copy email address" },
          { label: "WhatsApp:", value: phoneFormatted, href: whatsappUrl, onCopy: onCopyPhone, tip: "Copy WhatsApp number", external: true },
        ].map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-2 ${idx > 0 ? "pt-2 border-t border-[#DCD0C0]/60 dark:border-amber-500/10" : ""}`}
          >
            <span className="text-[#5C4E41] dark:text-stone-400 shrink-0">{row.label}</span>
            <div className="flex items-center gap-2 min-w-0">
              <a
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[#231D18] dark:text-stone-200 hover:underline truncate"
              >
                {row.value}
              </a>
              <Tooltip content={row.tip} position="top" align="right">
                <button
                  type="button"
                  onClick={row.onCopy}
                  aria-label={row.tip}
                  className="p-1 cursor-pointer shrink-0 active:scale-[0.95] transition-transform"
                >
                  <FiCopy className="text-xs text-[#5C4E41] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-amber-400" />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#DCD0C0]/60 dark:border-amber-500/10">
          <span className="text-[#5C4E41] dark:text-stone-400 shrink-0">Profiles:</span>
          <div className="flex items-center gap-3">
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#9A4E24] dark:text-amber-400 hover:underline">
              <span>LinkedIn</span>
              <FiExternalLink className="text-[10px]" />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#231D18] dark:text-stone-200 hover:underline">
              <span>GitHub</span>
              <FiExternalLink className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Direct Form */}
      <form onSubmit={sendEmail} className="space-y-3 pt-1">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="block text-[11px] font-mono text-[#5C4E41] dark:text-stone-400">Your name</label>
          <input id="contact-name" type="text" name="name" required placeholder="e.g. Sarah Chen, Technical Recruiter" className={INPUT_CLASS} />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="block text-[11px] font-mono text-[#5C4E41] dark:text-stone-400">Work or personal email</label>
          <input id="contact-email" type="email" name="email" required placeholder="name@company.com" className={INPUT_CLASS} />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-message" className="block text-[11px] font-mono text-[#5C4E41] dark:text-stone-400">Role or project details</label>
          <textarea id="contact-message" name="message" required rows="3" placeholder="Share role details, interview availability, or project scope..." className={`${INPUT_CLASS} resize-none`} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group w-full py-2.5 min-h-[42px] rounded-lg text-xs font-mono font-medium bg-[#231D18] text-[#F6EFE2] hover:opacity-90 dark:bg-stone-100 dark:text-stone-900 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <span>{loading ? "Sending..." : "Send message"}</span>
          <FiSend className="text-xs transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </form>
    </ModalShell>
  );
};

export default ContactModal;
