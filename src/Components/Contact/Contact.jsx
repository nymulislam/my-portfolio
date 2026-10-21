import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { GrSend } from "react-icons/gr";
import "./contact.css";
import { Toast } from "../UI/Toast";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3500);
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
            showToast("Thank you! Your message has been sent successfully.", "success");
            e.target.reset();
          } else {
            showToast("Message received! Thank you for writing.", "success");
            e.target.reset();
          }
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          showToast("Could not send directly. Please email naymulislam241@gmail.com", "error");
        }
      );
  };

  return (
    <section className="contact py-24 relative" id="contact">
      <div className="ambient-glow bottom-10 right-1/3 w-80 h-80 bg-blue-500/10"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="section_title">Get in touch</h2>
        <span className="section_subtitle">Contact Me</span>

        <div className="contact_container grid">
          {/* Left Column: Talk to me */}
          <div className="contact_content">
            <h3 className="contact_title">Talk to me</h3>

            <div className="contact_info">
              {/* Email Card */}
              <div className="contact_card">
                <i className="bx bx-mail-send contact_card-icon"></i>
                <h3 className="contact_card-title">Email</h3>
                <span className="contact_card-data">naymulislam241@gmail.com</span>

                <a
                  href="mailto:naymulislam241@gmail.com"
                  className="contact_button"
                >
                  Write me{" "}
                  <i className="bx bx-right-arrow-alt contact_button-icon"></i>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="contact_card">
                <i className="bx bxl-whatsapp contact_card-icon"></i>
                <h3 className="contact_card-title">WhatsApp</h3>
                <span className="contact_card-data">+880140-1380467</span>

                <a
                  href="https://api.whatsapp.com/send?phone=+8801401380467&text=Hello%20Naymul,%20I%20reviewed%20your%20portfolio!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact_button"
                >
                  Write me{" "}
                  <i className="bx bx-right-arrow-alt contact_button-icon"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact_content">
            <h3 className="contact_title">Write me your message</h3>

            <form ref={form} onSubmit={sendEmail} className="contact_form">
              <div className="contact_form-div">
                <label className="contact_form-tag">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Insert your name"
                  className="contact_form-input"
                  required
                />
              </div>

              <div className="contact_form-div">
                <label className="contact_form-tag">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Insert your email"
                  className="contact_form-input"
                  required
                />
              </div>

              <div className="contact_form-div contact_form-area">
                <label className="contact_form-tag">
                  Your Message
                </label>
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="Write your message here..."
                  className="contact_form-input"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-tactile uppercase w-full sm:w-auto"
              >
                <span>{loading ? "Sending..." : "Send"}</span>
                <GrSend className="text-lg animate-pulse" />
              </button>
            </form>
          </div>
        </div>
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

export default Contact;
