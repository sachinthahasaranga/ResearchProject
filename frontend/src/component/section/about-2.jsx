


const aboutList = [
    {
        imgUrl: 'assets/images/about/icon/03.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: '30,000+ Online Courses',
        desc: 'Grow your knowledge and your training and tools.',
    },
    {
        imgUrl: 'assets/images/about/icon/01.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Experts Teachers',
        desc: 'Grow your knowledge and your training and tools.',
    },
    {
        imgUrl: 'assets/images/about/icon/02.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Lifetime Access',
        desc: 'Grow your knowledge and your training and tools.',
    },
]


const AboutTwo = () => {
    return (
        <div className="about-section style-2 section-bg">
            <div className="container">
                <div className="row justify-content-center row-cols-lg-3 row-cols-sm-2 row-cols-1">
                    {aboutList.map((val, i) => (
                        <div className="col" key={i}>
                            <div className="about-right">
                                <div className="section-wrapper">
                                    <ul className="lab-ul">
                                        <li>
                                            <div className="sr-left">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="sr-right">
                                                <h5>{val.title}</h5>
                                                <p>{val.desc}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default AboutTwo;