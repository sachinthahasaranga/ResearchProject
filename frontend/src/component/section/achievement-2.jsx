
import CountUp from 'react-countup';

const subTitle = "START TO SUCCESS";
const title = "Achieve Your Goals With Edukon";


const achievementList = [
    {
        count: '30',
        desc: 'Years of Language Education Experience',
    },
    {
        count: '3084',
        desc: 'Learners Enrolled in Edukon Courses',
    },
    {
        count: '330',
        desc: 'Qualified Teachers And Language Experts',
    },
    {
        count: '2300',
        desc: 'Innovative Foreign Language Courses',
    },
]

const AchievementTwo = () => {
    return (
        <div className="achievement-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="counter-part mb-4">
                        <div className="row g-4 row-cols-lg-4 row-cols-sm-2 row-cols-1 justify-content-center">
                            {achievementList.map((val, i) => (
                                <div className="col" key={i}>
                                    <div className="count-item">
                                        <div className="count-inner">
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
 
export default AchievementTwo;