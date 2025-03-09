
import { Link } from "react-router-dom";

const subTitle = "Popular Category";
const title = "Popular Category For Learn";


const categoryList = [
    {
        imgUrl: 'assets/images/category/icon/07.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Computer Science',
        desc: '24 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/08.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Civil Engineering',
        desc: '63 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/09.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Business Analysis',
        desc: '43 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/10.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Data Science Analytics',
        desc: '50 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/11.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Learning Management',
        desc: '27 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/12.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Computer Engineering',
        desc: '87 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/13.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Design Architect',
        desc: '15 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/14.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Foreign Language',
        desc: '58 Course',
    },
]

const CategoryTwo = () => {
    return (
        <div className="category-section padding-tb section-bg style-2">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                        {categoryList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="category-item text-center">
                                    <div className="category-inner">
                                        <div className="category-thumb">
                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                        </div>
                                        <div className="category-content">
                                            <Link to="/course"><h6>{val.title}</h6></Link>
                                            <span>{val.desc}</span>
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
 
export default CategoryTwo;