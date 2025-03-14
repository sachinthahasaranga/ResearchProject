
import { Link } from "react-router-dom";

const btnText = "Sign up for Free";
const title = "Learn Anytime, Anywhere";
const desc = "Take courses on your any device with our app & learn all time what you want. Just download & install & start to learn";

const AppSection = () => {
    return (
        <div className="app-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <Link to="/signup" className="lab-btn mb-4"><span>{btnText}</span></Link>
                    <h2 className="title">{title}</h2>
                    <p>{desc}</p>
                </div>
                <div className="section-wrapper">
                    <ul className="lab-ul">
                        <li><a href="#"><img src="assets/images/app/01.jpg" alt="education" /></a></li>
                        <li><a href="#"><img src="assets/images/app/02.jpg" alt="education" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default AppSection;