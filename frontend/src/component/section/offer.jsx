
import { Link } from "react-router-dom";
import CountDown from "../sidebar/countdown";

const title = "Learning Spanish Language";
const desc = "It’s Perfect Time to Learn Spanish Language";
const btnText = "Register Now";
const discount = "35%";



const Offer = () => {
    return (
        <div className="offer-section padding-tb">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-6 col-12">
                        <div className="section-header">
                            <h2 className="title">{title}</h2>
                            <p>{desc}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="section-wrapper">
                            <div className="offer-area">
                                <h3 className="title"><span>{discount}</span> <b>Discount.</b> Let’s Start!</h3>
                                <CountDown />
                                <Link to="/signup" className="lab-btn"><span>{btnText}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Offer;