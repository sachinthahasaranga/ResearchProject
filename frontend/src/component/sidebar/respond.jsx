

const title = "Leave a Comment";
const btnText = "send comment";

const Respond = () => {
    return (
        <div id="respond" className="comment-respond mb-lg-0">
            <h4 className="title-border">{title}</h4>
            <div className="add-comment">
                <form action="#" method="post" id="commentform" className="comment-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                    />
                    <input 
                        type="text"
                        name="email"
                        placeholder="Your email *" 
                    />
                    <input 
                        type="text"
                        name="subject"
                        className="w-100"
                        placeholder="Write a Subject"
                    />
                    <textarea 
                        rows="7" 
                        type="text"
                        name="message"
                        placeholder="Your Message"
                    ></textarea>
                    <button type="submit" className="lab-btn"><span>{btnText}</span></button>
                </form>
            </div>			
        </div>
    );
}

 
export default Respond;