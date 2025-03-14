
import { Link } from "react-router-dom";


const title = "Build Skills With Experts Any Time Anywhere";
const desc = "Professor is Best & Perfect Venue to Grow up Your Knowledge";
const btnText = "Get Started Now";



const BannerThree = () => {
    return (
        <section className="banner-section style-3">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="banner-content"> 
                                <h2 className="title">{title}</h2>
                                <p className="desc">{desc}</p>
                                <Link to="/login" className="lab-btn"><span>{btnText}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BannerThree;