


const subTitle = "Smart & Relaxing Career";
const title = "Why You Should Start Driving";
const desc = "Proactively enhance prospective resources for next generation convergence. Dramatically myocardinate high-quality vortals through transparent.";


const chooseList = [
    {
        text: 'Smart & Relaxing Career',
    },
    {
        text: 'No Required Higher Education',
    },
    {
        text: 'WorldWide Working Opportunity',
    },
    {
        text: 'Lots of Working Opportunity',
    },
]


const Choose = () => {
    return (
        <div className="choose-section padding-tb">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <div className="section-header">
                            <span className="subtitle yellow-color">{subTitle}</span>
                            <h2 className="title">{title}</h2>
                            <p>{desc}</p>
                            <ul className="lab-ul">
                                {chooseList.map((val, i) => (
                                    <li key={i}><i className="icofont-circled-right"></i>{val.text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="section-wrapper">
                            <div className="choose-thumb">
                                <img src="assets/images/choose/01.png" alt="education" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Choose;