
import CountUp from 'react-countup';


const achievementList = [
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
    {
        iconName: 'icofont-clock-time',
        count: '50',
        desc: 'Years of Experience',
    },
]


const AchievementThree = () => {
    return (
        <div className="achievement-section style-3 padding-tb">
            <div className="container">
                <div className="section-wrapper">
                    <div className="counter-part">
                        <div className="row g-4 row-cols-lg-4 row-cols-sm-2 row-cols-1 justify-content-center">
                            {achievementList.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="count-item">
                                        <div className="count-inner">
                                            <div className="count-icon">
                                                <i className={val.iconName}></i>
                                            </div>
                                            <div className="count-content">
                                                <h2><span className="count"><CountUp end={val.count} /></span><span>+</span></h2>
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AchievementThree;