
import { Link } from "react-router-dom";

const subTitle = "Hi There!";
const title = <h2 className="title"><span>I Am</span> Lincon Sein</h2>;
const desc = "Senior English Teacher";
const btnText = "View Lincon’s Courses";



const BannerFive = () => {
    return (
        <section className="banner-section style-5">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row">
                        <div className="offset-md-6 col-xl-6">
                            <div className="banner-content"> 
                                <h4 className="subtitle">{subTitle}</h4>
                                {title}
                                <p className="desc">{desc}</p>
                                <Link to="/course" className="lab-btn"><span>{btnText}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BannerFive;