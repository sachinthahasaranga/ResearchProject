

const subTitle = "Let’s Start";
const title = "Driving Career";
const desc = "Drive Your Car with Hapyness";


const BannerSix = () => {
    return (
        <section className="banner-section style-6">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="banner-content text-center"> 
                                <h4 className="subtitle">{subTitle}</h4>
                                <h2 className="title">{title}</h2>
                                <p className="desc">{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BannerSix;