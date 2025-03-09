
import Rating from "./rating";

const title = "02 Comment";


const commentList = [
    {
        imgUrl: 'assets/images/author/02.jpg',
        imgAlt: 'rajibraj91',
        name: 'Linsa Faith',
        date: 'Jun 5, 2022 at 12:41 pm',
        desc: 'The inner sanctuary, I throw myself down among the tall grass bye the trckli stream and, as I lie close to the earth',
    },
    {
        imgUrl: 'assets/images/author/03.jpg',
        imgAlt: 'rajibraj91',
        name: 'Mahdi Mahmud',
        date: 'Jun 5, 2022 at 12:41 pm',
        desc: 'The inner sanctuary, I throw myself down among the tall grass bye the trckli stream and, as I lie close to the earth',
    },
]


const Comment = () => {
    return (
        <div className="comments">
            <h4 className="title-border">{title}</h4>
            <ul className="comment-list">
                {commentList.map((val, i) => (
                    <li className="comment" key={i}>
                        <div className="com-thumb">
                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />          
                        </div>
                        <div className="com-content">
                            <div className="com-title">
                                <div className="com-title-meta">
                                    <h6>{val.name}</h6>
                                    <span> {val.date} </span>
                                </div>
                                <Rating />
                            </div>
                            <p>{val.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Comment;