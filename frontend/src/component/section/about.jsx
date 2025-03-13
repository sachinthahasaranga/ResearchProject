const subTitle = "Welcome to EnglishHub";
const title = "Empowering Young Minds to Master English";
const desc = "A fun and engaging platform designed to help students improve their English skills through personalized AI-driven lessons, future-level predictions, and interactive NLP activities.";

const aboutList = [
    {
        imgUrl: 'assets/images/about/icon/01.jpg',
        imgAlt: 'about icon skilled instructors',
        title: 'Experienced Instructors',
        desc: 'Our skilled instructors provide personalized learning experiences tailored to each student’s needs, ensuring effective language acquisition at every step.',
    },
    // {
    //     imgUrl: 'assets/images/about/icon/02.jpg',
    //     imgAlt: 'about icon get certificate',
    //     title: 'Get Certified',
    //     desc: 'Receive certificates that demonstrate your progress and English proficiency after completing key learning milestones.',
    // },
    {
        imgUrl: 'assets/images/about/icon/03.jpg',
        imgAlt: 'about icon online classes',
        title: 'Interactive Online Classes',
        desc: 'Engage in dynamic online lessons that feature NLP-based listening exercises and AI-driven feedback to improve both speaking and listening skills.',
    },
]

const About = () => {
    return (
        <div className="about-section">
            <div className="container">
                <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-end flex-row-reverse">
                    <div className="col">
                        <div className="about-right padding-tb">
                            <div className="section-header">
                                <span className="subtitle">{subTitle}</span>
                                <h2 className="title">{title}</h2>
                                <p>{desc}</p>
                            </div>
                            <div className="section-wrapper">
                                <ul className="lab-ul">
                                    {aboutList.map((val, i) => (
                                        <li key={i}>
                                            <div className="sr-left">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="sr-right">
                                                <h5>{val.title}</h5>
                                                <p>{val.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="about-left">
                            <div className="about-thumb">
                                <img src="assets/images/about/01.png" alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;
