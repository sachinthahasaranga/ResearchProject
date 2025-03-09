

const title = "Subscribe to Newsletter";
const desc = "Subscribe free and get the notification and latest offers of our courses.";
const subTitle = "Enter Your Name & Email Press to Submit Button";
const btnText = "Get Started Now";


const NewsLetter = () => {
    return (
        <div className="newsletters-section padding-tb">
            <div className="container">
                <div className="newsletter-area">
                    <div className="news-mass">
                        <i className="icofont-email"></i>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="section-header">
                                <h2 className="title">{title}</h2>
                                <p>{desc}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="section-wrapper">
                                <h5>{subTitle}</h5>
                                <form className="newsletter-form">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                    />
                                    <button type="submit" className="lab-btn"><span>{btnText}</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewsLetter;