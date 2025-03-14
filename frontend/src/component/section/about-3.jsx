


const title = <h2><span>About</span> Lincon Senses</h2>;
const desc = "Lincon Senses is Senior English Teacher of Professor University. I am Sharing my knowledge with my lovely students";

const detailsList = [
    {
        leftText: 'Role',
        clone: ':',
        rightText: 'Senior English Teacher',
    },
    {
        leftText: 'Experience',
        clone: ':',
        rightText: '15 Years',
    },
    {
        leftText: 'Specialist in',
        clone: ':',
        rightText: 'Web Developer',
    },
    {
        leftText: 'Phone',
        clone: ':',
        rightText: '+880 1234 567890',
    },
    {
        leftText: 'Mail',
        clone: ':',
        rightText: 'contact@yourmail.com',
    },
    {
        leftText: 'Location :',
        clone: ':',
        rightText: 'Grand Junction, Colorado USA',
    },
]

const countList = [
    {
        iconName: 'icofont-users-alt-4',
        count: '12600',
        desc: 'Students Enrolled',
    },
    {
        iconName: 'icofont-graduate-alt',
        count: '50',
        desc: 'Certified Trainer',
    },
    {
        iconName: 'icofont-notification',
        count: '350',
        desc: 'Professional Courses',
    },
]


const AboutThree = () => {
    return (
        <section className="about-section style-4 padding-tb">
            <div className="container">
                <div className="about-items">
                    <div className="about-item">
                        <div className="image">
                            <img src="assets/images/about/03.jpg" alt="about image" className="img-responsive" />
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="about-content">
                            {title}
                            <p>{desc}</p>
                            <ul className="details lab-ul">
                                {detailsList.map((val, i) => (
                                    <li key={i}><p>{val.leftText} <span>{val.clone}</span></p>{val.rightText}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="counter-part">
                            {countList.map((val, i) => (
                                <div className="count-item" key={i}>
                                    <div className="count-inner">
                                        <div className="count-icon">
                                            <i className={val.iconName}></i>
                                        </div>
                                        <div className="count-content">
                                            <h2><span className="count">{val.count}</span><span>+</span></h2>
                                            <p>{val.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AboutThree;