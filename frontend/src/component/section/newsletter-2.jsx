

const title = <h2 className="title">Subscribe to <b>Newsletter</b></h2>;
const desc = "Subscribe free in our website and get the notification and latest offers of our courses.";
const btnText = "Submit Now";


const NewsletterTwo = () => {
    return (
        <div className="newsletters-section style-2 padding-tb">
            <div className="container">
                <div className="newsletter-area">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="section-header text-center">
                                {title}
                                <p>{desc}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="section-wrapper">
                                <form className="newsletter-form">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
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
 
export default NewsletterTwo;