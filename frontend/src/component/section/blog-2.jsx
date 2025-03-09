
import { Link } from "react-router-dom";

const subTitle = "Don’t Miss the Day";
const title = "Upcomming Events";


const blogList = [
    {
        imgUrl: 'assets/images/blog/10.jpg',
        imgAlt: 'blog thumb rajibraj91 rajibraj',
        title: 'Learn Basic Web Design with HTML and CSS',
        author: 'Ummi Nishat',
        date: 'April 23,2022',
        desc: 'Proactively enhance prospective resources for next generation convergence. Dramatically myocardinate high-quality vortals through transparent.',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/blog/11.jpg',
        imgAlt: 'blog thumb rajibraj91 rajibraj',
        title: 'Scottish Creatives To Receive Funded Business.',
        author: 'Begrass Tyson',
        date: 'April 23,2022',
        desc: 'Proactively enhance prospective resources for next generation convergence. Dramatically myocardinate high-quality vortals through transparent.',
        btnText: 'Read More',
    },
    {
        imgUrl: 'assets/images/blog/12.jpg',
        imgAlt: 'blog thumb rajibraj91 rajibraj',
        title: 'Learn Basic Web Design with PHP and Laravel',
        author: 'Rajib Raj',
        date: 'April 23,2022',
        desc: 'Proactively enhance prospective resources for next generation convergence. Dramatically myocardinate high-quality vortals through transparent.',
        btnText: 'Read More',
    },
]

const BlogTwo = () => {
    return (
        <div className="blog-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
                        {blogList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="post-item style-3">
                                    <div className="post-inner">
                                        <div className="post-thumb">
                                            <Link to="/blog-single"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></Link>
                                        </div>
                                        <div className="post-content">
                                            <Link to="/blog-single"><h4>{val.title}</h4></Link>
                                            <div className="meta-post">
                                                <ul className="lab-ul">
                                                    <li><i className="icofont-ui-user"></i>{val.author}</li>
                                                    <li><i className="icofont-calendar"></i>{val.date}</li>
                                                </ul>
                                            </div>
                                            <p>{val.desc}</p>
                                            <Link to="/blog-single" className="lab-btn"><span>{val.btnText}</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BlogTwo;