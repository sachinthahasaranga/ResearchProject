import { useState, Fragment } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2"; 
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import GoogleMap from "../component/sidebar/googlemap";

const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send Our Message";

const contactList = [
  {
    imgUrl: "assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "Negombo, Sri Lanka",
  },
  {
    imgUrl: "assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone Number",
    desc: "+94 712-758-785",
  },
  {
    imgUrl: "assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send Email",
    desc: "sachinthahasaranga@gmil.com",
  },
  {
    imgUrl: "assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our Website",
    desc: "www.sachinthahasaranga.com",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Service ID:", process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log("Template ID:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been sent successfully.",
            confirmButtonText: "OK",
          });

          setFormData({
            fullName: "",
            email: "",
            // number: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send your message. Please try again later.",
            confirmButtonText: "Retry",
          });

          console.log(error.text);
        }
      );
  };

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Get In Touch With Us"} curPage={"Contact Us"} />
      <div className="map-address-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((val, i) => (
                    <div className="contact-item" key={i}>
                      <div className="contact-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{val.title}</h6>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-12">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{conSubTitle}</span>
            <h2 className="title">{conTitle}</h2>
          </div>
          <div className="section-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <input
                  type="text"
                  name="number"
                  placeholder="Mobile Number *"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="form-group w-100">
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group w-100">
                <textarea
                  rows="8"
                  type="text"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group w-100 text-center">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default ContactPage;
