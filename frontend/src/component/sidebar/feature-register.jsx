

const title = "Find Your Course";

const FeatureRegister = () => {
    return (
        <div className="feature-register">
            <h3>{title}</h3>
            <form>
                <input type="text" name="name" placeholder="Your Name" className="reg-input" />
                <input type="email" name="email" placeholder="Your Email" className="reg-input" />
                <input type="text" name="phone" placeholder="Your Phone" className="reg-input" />
                <select className="reg-input">
                    <option>Beginner</option>
                    <option>Intermidiate</option>
                    <option>Advance</option>
                </select>
                <select className="reg-input">
                    <option>Car</option>
                    <option>Motor Cycle</option>
                    <option>Track</option>
                </select>
                <input type="text" name="date" placeholder="Date" className="reg-input" />
                <input type="text" name="time" placeholder="Time" className="reg-input" />
                <button className="lab-btn" type="submit"><span>Register Now</span></button>
            </form>
        </div>
    );
}
 
export default FeatureRegister;