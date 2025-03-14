
import CountDown from "../sidebar/countdown";

const subTitle = "Save The Day";
const title = <h2 className="title fw-normal text-white">Join on Day Long Free Workshop for <span className="fw-bold">Advance</span> <span className="theme-color fw-bold">PHP</span> <span className="fw-bold">Language</span></h2>;


const Workshop = () => {
    return (
        <div className="workshop-section padding-tb">
            <div className="container">
                <div className="row row-cols-xl-2 row-cols-1">
                    <div className="col">
                        <div className="section-header">
                            <span className="subtitle">{subTitle}</span>
                            {title}
                        </div>
                        <div className="section-wrapper">
                            <div className="workshop-date">
                                <CountDown />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Workshop;