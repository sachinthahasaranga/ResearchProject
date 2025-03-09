

const subTitle = "What can you learn";
const title = "Learning Objectives";


const featureList = [
    {
        iconName: 'icofont-credit-card',
        title: 'Creative Thinking',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-light-bulb',
        title: 'Improve Skill',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-graduate',
        title: 'Self Learning',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-paper-plane',
        title: 'Knowledge',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-site-map',
        title: 'Self Development',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-users-alt-3',
        title: 'Community Building',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-chart-line',
        title: 'Career Building',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-dollar',
        title: 'Start Earning',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
    {
        iconName: 'icofont-flag',
        title: 'Be Confedent',
        desc: 'Proactive enhance rospect resource for next generation convergence dramatical myocardinate.',
    },
]


const FeatureTwo = () => {
    return (
        <section className="feature-section style-2 padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle yellow-color">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
                        {featureList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="feature-item">
                                    <div className="feature-inner">
                                        <div className="feature-icon">
                                            <i className={val.iconName}></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5>{val.title}</h5>
                                            <p>{val.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default FeatureTwo;