import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiCopy, FiSend, FiArrowUpRight } from "react-icons/fi";
import { Toast } from "../UI/Toast";

const SayHello = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const email = "naymulislam241@gmail.com";
  const whatsapp = "+8801401380467";

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, "success");
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xudagwa";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_pen7cig";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "VmQcV6jIkiYGDGVuG";

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          setLoading(false);
          if (result.text === "OK" || result.status === 200) {
            showToast("Thank you for reaching out! Your message was sent.", "success");
            e.target.reset();
          } else {
            showToast("Message received! Thank you for writing.", "success");
            e.target.reset();
          }
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          showToast("Could not send form directly. Please email naymulislam241@gmail.com", "error");
        }
      );
  };

  return (
    <section className="py-20 border-b border-stone-200/80 dark:border-stone-800/80" id="contact">
      <div className="max-w-2xl mx-auto px-6 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
            04 / Connect
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mt-1">
            Say Hello
          </h2>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
            Whether you have a software engineering role, want to consult on full-stack architecture, or simply wish to say hi—I welcome thoughtful conversations.
          </p>
        </div>

        {/* Direct Channels */}
        <div className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-[#F5F1EA]/60 dark:bg-[#1E1C1A]/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="font-mono text-xs text-stone-500">Email:</span>
            <div className="flex items-center gap-2">
              <a href={`mailto:${email}`} className="font-medium text-stone-900 dark:text-stone-100 editorial-link">
                {email}
              </a>
              <button
                onClick={() => handleCopy(email, "Email")}
                className="text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                title="Copy email"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm pt-2 border-t border-stone-200/50 dark:border-stone-800/50">
            <span className="font-mono text-xs text-stone-500">WhatsApp:</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/8801401380467?text=${encodeURIComponent("Hello Naymul, I visited your website!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-900 dark:text-stone-100 editorial-link inline-flex items-center gap-1"
              >
                <span>+880 140-1380467</span>
                <FiArrowUpRight className="text-xs" />
              </a>
              <button
                onClick={() => handleCopy(whatsapp, "WhatsApp number")}
                className="text-xs font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                title="Copy phone"
              >
                <FiCopy />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-1">
              NAME
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors placeholder:text-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-1">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors placeholder:text-stone-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-500 dark:text-stone-400 mb-1">
              MESSAGE
            </label>
            <textarea
              name="message"
              required
              rows="4"
              placeholder="What are you working on or thinking about?"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-transparent text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors placeholder:text-stone-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <FiSend className="text-xs" />
          </button>
        </form>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage("")}
      />
    </section>
  );
};

export default SayHello;
