import "./contact.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { GrSend } from "react-icons/gr";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xudagwa",
        "template_pen7cig",
        form.current,
        "VmQcV6jIkiYGDGVuG"
      )
      .then(
        (result) => {
          console.log(result.text);
          if (result.text === "OK") {
            e.target.reset()
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <section className="contact mb-10" id="contact">
      <h2 className="section_title">Get in touch</h2>
      <span className="section_subtitle">Contact Me</span>

      <div className="contact_container container grid">
        <div className="contact_content">
          <h3 className="contact_title">Talk to me</h3>

          <div className="contact_info">
            <div className="contact_card">
              <i className="bx bx-mail-send contact_card-icon"></i>

              <h3 className="contact_card-title">Email</h3>
              <span className="contact_card-data">
                naymulislam241@gmail.com
              </span>

              <a
                href="mailto:naymulislam241@gmail.com"
                className="contact_button"
              >
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact_button-icon"></i>
              </a>
            </div>

            <div className="contact_card">
              <i className="bx bxl-whatsapp contact_card-icon"></i>

              <h3 className="contact_card-title">Whatsapp</h3>
              <span className="contact_card-data">+880140-1380467</span>

              <a
                href="https://api.whatsapp.com/send?phone=+8801401380467&text=Hello"
                className="contact_button"
              >
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact_button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact_content">
          <h3 className="contact_title">Write me your message</h3>

          <form ref={form} onSubmit={sendEmail} className="contact_form">
            <div className="contact_form-div">
              <label htmlFor="" className="contact_form-tag">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Insert your name"
                className="contact_form-input"
              />
            </div>

            <div className="contact_form-div">
              <label htmlFor="" className="contact_form-tag">
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
              <label htmlFor="" className="contact_form-tag">
                Your Message
              </label>
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Your message"
                className="contact_form-input"
              ></textarea>
            </div>

            <button type="submit" className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase">
              {" "}
              Send
              <GrSend className="text-lg animate-pulse" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
