


const title = "Just Create Your Free Account Now & Join the Workshop";
const btnText = "Join Now";

const WorkshopTwo = () => {
    return (
        <div className="workshop-join">
            <div className="container">
                <div className="section-wrapper">
                    <div className="workshop-title">
                        <h5>{title}</h5>
                    </div>
                    <div className="workshop-join-form">
                        <form>
                            <div className="input-area">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Username"
                                />
                                <input
                                    type="email"
                                    name="name"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="submit-area">
                                <button type="submit" className="lab-btn"><span>{btnText}</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default WorkshopTwo;