
import { Link } from "react-router-dom";

const title = "Most Popular Post";

const postList = [
    {
        imgUrl: 'assets/images/blog/01.jpg',
        imgAlt: 'rajibraj91',
        title: 'Poor People’s Campaign Our Resources',
        date: 'Jun 05,2022',
    },
    {
        imgUrl: 'assets/images/blog/02.jpg',
        imgAlt: 'rajibraj91',
        title: 'Poor People’s Campaign Our Resources',
        date: 'Jun 05,2022',
    },
    {
        imgUrl: 'assets/images/blog/03.jpg',
        imgAlt: 'rajibraj91',
        title: 'Poor People’s Campaign Our Resources',
        date: 'Jun 05,2022',
    },
    {
        imgUrl: 'assets/images/blog/04.jpg',
        imgAlt: 'rajibraj91',
        title: 'Poor People’s Campaign Our Resources',
        date: 'Jun 05,2022',
    },
]

const PopularPost = () => {
    return (
        <div className="widget widget-post">
            <div className="widget-header">
                <h5 className="title">{title}</h5>
            </div>
            <ul className="widget-wrapper">
                {postList.map((val, i) => (
                    <li className="d-flex flex-wrap justify-content-between" key={i}>
                        <div className="post-thumb">
                            <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                        </div>
                        <div className="post-content">
                            <Link to="/blog-single"><h6>{val.title}</h6></Link>
                            <p>{val.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default PopularPost;