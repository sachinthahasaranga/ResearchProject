
import { Link } from "react-router-dom";

const subTitle = "Popular Category";
const title = "Popular Category For Learn";
const btnText = "Browse All Categories";


const categoryList = [
    {
        imgUrl: 'assets/images/category/icon/01.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'English Videos',
        count: '24 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/02.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'Listning Activites',
        count: '04 Course',
    },
    {
        imgUrl: 'assets/images/category/icon/03.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        title: 'English Papers',
        count: '27 Course',
    },
    // {
    //     imgUrl: 'assets/images/category/icon/04.jpg',
    //     imgAlt: 'category rajibraj91 rajibraj',
    //     title: 'Data Science Analytics',
    //     count: '28 Course',
    // },
    // {
    //     imgUrl: 'assets/images/category/icon/05.jpg',
    //     imgAlt: 'category rajibraj91 rajibraj',
    //     title: 'Learning Management',
    //     count: '78 Course',
    // },
    // {
    //     imgUrl: 'assets/images/category/icon/06.jpg',
    //     imgAlt: 'category rajibraj91 rajibraj',
    //     title: 'Computer Engineering',
    //     count: '38 Course',
    // },
]


const Category = () => {
    return (
        <div className="category-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-2 justify-content-center row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1">
                        {categoryList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="category-item text-center">
                                    <div className="category-inner" style={{minHeight:"280px"}}>
                                        <div className="category-thumb">
                                            <img src={`${val.imgUrl}`} alt={val.imgAlt} />
                                        </div>
                                        <div className="category-content">
                                            <Link to="/course"><h6>{val.title}</h6></Link>
                                            <span>{val.count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        ))}
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/course" className="lab-btn"><span>{btnText}</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Category;