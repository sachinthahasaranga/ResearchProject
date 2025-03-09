
import FeatureRegister from "../sidebar/feature-register";


const featureList = [
    {
        imgUrl: 'assets/images/feature/07.png',
        imgAlt: 'feature thumb rajibraj91 rajibraj',
        title: 'Learner Drivers',
        desc: 'Dramatic myocardinate high quality through transparents.',
        btnText: 'View More',
        siteLink: '#',
    },
    {
        imgUrl: 'assets/images/feature/08.png',
        imgAlt: 'feature thumb rajibraj91 rajibraj',
        title: 'Get Driving License',
        desc: 'Dramatic myocardinate high quality through transparents.',
        btnText: 'View More',
        siteLink: '#',
    },
    {
        imgUrl: 'assets/images/feature/09.png',
        imgAlt: 'feature thumb rajibraj91 rajibraj',
        title: 'Comfort Vehicles',
        desc: 'Dramatic myocardinate high quality through transparents.',
        btnText: 'View More',
        siteLink: '#',
    },
    {
        imgUrl: 'assets/images/feature/08.png',
        imgAlt: 'feature thumb rajibraj91 rajibraj',
        title: 'Unlimited Car Support',
        desc: 'Dramatic myocardinate high quality through transparents.',
        btnText: 'View More',
        siteLink: '#',
    },
]

const FeatureThree = () => {
    return (
        <section className="feature-section style-3 padding-tb">
            <div className="feature-shape one"><img src="assets/images/shape-img/icon/03.png" alt="education" /></div>
            <div className="feature-shape two"><img src="assets/images/shape-img/09.png" alt="education" /></div>
            <div className="container">
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8 col-12">
                            <div className="feature-items">
                                <div className="row g-4 row-cols-sm-2 row-cols-1">
                                    {featureList.map((val, i) => (
                                        <div className="col" key={i}>
                                            <div className="feature-item">
                                                <div className="feature-inner text-center">
                                                    <div className="feature-thumb">
                                                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                    </div>
                                                    <div className="feature-content">
                                                        <h4>{val.title}</h4>
                                                        <p>{val.desc}</p>
                                                        <a href={val.siteLink} className="lab-btn-text">{val.btnText} <span></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <FeatureRegister />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default FeatureThree;