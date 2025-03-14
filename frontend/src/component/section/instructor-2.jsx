
import CountUp from 'react-countup';
import { Link } from "react-router-dom";

const subTitle = "Why Choose Us";
const title = "Become Online Instructor";
const desc = "Take courses on your any device with our app & learn all time what you want. Just download & install & start to learn";
const btnText = "Apply  Now";


const countList = [
    {
        iconName: 'icofont-users-alt-4',
        count: '12600',
        text: 'Students Enrolled',
    },
    {
        iconName: 'icofont-graduate-alt',
        count: '50',
        text: 'Certified Trainer',
    },
    {
        iconName: 'icofont-notification',
        count: '350',
        text: 'Professional Courses',
    },
]

const InstructorTwo = () => {
    return (
        <div className="instructor-section style-2 padding-tb section-bg-ash">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-1 row-cols-md-2 row-cols-xl-3 align-items-center">
                        <div className="col">
                            {countList.map((val, i) => (
                                <div className="count-item" key={i}>
                                    <div className="count-inner">
                                        <div className="count-icon">
                                            <i className={val.iconName}></i>
                                        </div>
                                        <div className="count-content">
                                            <h2><span className="count"><CountUp end={val.count} /></span><span>+</span></h2>
                                            <p>{val.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col">
                            <div className="instructor-content">
                                <span className="subtitle">{subTitle}</span>
                                <h2 className="title">{title}</h2>
                                <p>{desc}</p>
                                <Link to="/signup" className="lab-btn"><span>{btnText}</span></Link>
                            </div>
                        </div>
                        <div className="col">
                            <div className="instructor-thumb">
                                <img src="assets/images/instructor/01.png" alt="education" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default InstructorTwo;