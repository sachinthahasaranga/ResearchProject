import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2"; 
import { Link } from "react-router-dom";

const newsTitle = "Want Us To Contact through Email?";
const siteTitle = "Site Map";
const useTitle = "Useful Links";
const socialTitle = "Social Contact";
const supportTitle = "Our Support";

const siteList = [
  { text: "Documentation", link: "#" },
  { text: "Feedback", link: "#" },
];

const useList = [
  { text: "About Us", link: "#" },
  { text: "Help Link", link: "#" },
  { text: "Terms & Conditions", link: "#" },
  { text: "Contact Us", link: "#" },
  { text: "Privacy Policy", link: "#" },
];

const socialList = [
  { text: "Facebook", link: "#" },
  { text: "Twitter", link: "#" },
  { text: "Instagram", link: "#" },
  { text: "YouTube", link: "#" },
  { text: "Github", link: "#" },
];

const supportList = [
  { text: "Help Center", link: "#" },
  { text: "Status", link: "#" },
  { text: "Changelog", link: "#" },
  { text: "Contact Support", link: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailParams = {
      message: "User requested to be contacted via email.", 
      fullName: email,
      email: email,
      subject: "User requested to be contacted via email.",
      message: "User requested to be contacted via email.",
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
        emailParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY 
      )
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            title: "Request Sent!",
            text: "We will contact you via email shortly.",
            confirmButtonText: "OK",
          });

          console.log(result.text);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send your request. Please try again later.",
            confirmButtonText: "Retry",
          });

          console.log(error.text);
        }
      );

    setEmail("");
  };

  return (
    <div className="news-footer-wrap">
      <div className="fs-shape">
        <img src="assets/images/shape-img/03.png" alt="fst" className="fst-1" />
        <img src="assets/images/shape-img/04.png" alt="fst" className="fst-2" />
      </div>

      <div className="news-letter">
        <div className="container">
          <div className="section-wrapper">
            <div className="news-title">
              <h3>{newsTitle}</h3>
            </div>
            <div className="news-form">
              <form onSubmit={handleSubmit}>
                <div className="nf-list">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                  <input type="submit" name="submit" value="Contact Us" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top padding-tb pt-0">
          <div className="container">
            <div className="row g-4 row-cols-xl-4 row-cols-md-2 row-cols-1 justify-content-center">
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{siteTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {siteList.map((val, i) => (
                            <li key={i}>
                              <a href={val.link}>{val.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{useTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {useList.map((val, i) => (
                            <li key={i}>
                              <a href={val.link}>{val.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{socialTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {socialList.map((val, i) => (
                            <li key={i}>
                              <a href={val.link}>{val.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{supportTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {supportList.map((val, i) => (
                            <li key={i}>
                              <a href={val.link}>{val.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
