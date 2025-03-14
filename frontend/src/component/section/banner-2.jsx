


const subTitle = "Online education";
const title = <h2 className="title"><span className="d-lg-block">Build Skills With</span> Experts Any Time <span className="d-lg-block">Anywhere</span></h2>;
const desc = "Free online courses from the world’s Leading experts. join 18+ million Learners today.";


const catagoryList = [
    {
        name: 'Figma',
        link: '#',
    },
    {
        name: 'Adobe XD',
        link: '#',
    },
    {
        name: 'illustration',
        link: '#',
    },
    {
        name: 'Photoshop',
        link: '#',
    },
]


const BannerTwo = () => {
    return (
        <section className="banner-section style-2">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-xxl-5 col-xl-6 col-lg-10 me-auto">
                            <div className="banner-content"> 
                                <h6 className="subtitle text-uppercase fw-medium">{subTitle}</h6>
                                {title}
                                <p className="desc">{desc}</p>
                                <form>
                                    <div className="banner-icon">
                                        <i className="icofont-search"></i>
                                    </div>
                                    <input type="text" placeholder="Keywords of your course" />
                                    <button type="submit">Search Course</button>
                                </form>
                                <div className="banner-catagory d-flex flex-wrap">
                                    <p>Most Popular : </p>
                                    <ul className="lab-ul d-flex flex-wrap">
                                        {catagoryList.map((val, i) => (
                                            <li key={i}><a href={val.link}>{val.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7 col-xl-6">
                            <div className="thumb-part">
                                <div className="banner-thumb text-center">
                                    <img src="assets/images/banner/02.png" alt="img" />
                                </div>
                                <div className="abs-thumb d-none d-xxl-block">
                                    <img src="assets/images/banner/03.png" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BannerTwo;