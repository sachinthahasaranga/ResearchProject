
import { Link } from "react-router-dom";

const subTitle = "Choose Any One Course";
const title = "Learn Everything with Professor";
const btnText = "Get Started Now";

const categoryList = [
    {
        imgUrl: 'assets/images/category/01.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Software',
    },
    {
        imgUrl: 'assets/images/category/02.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Design & Art',
    },
    {
        imgUrl: 'assets/images/category/03.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Photography',
    },
    {
        imgUrl: 'assets/images/category/04.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Language',
    },
    {
        imgUrl: 'assets/images/category/05.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Marketing',
    },
    {
        imgUrl: 'assets/images/category/06.jpg',
        imgAlt: 'category rajibraj91 rajibraj',
        iconName: 'icofont-brand-windows',
        title: 'Music',
    },
]

const CategoryThree = () => {
    return (
        <div className="category-section style-4 padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
                        {categoryList.map((val, i) => (
                            <div className="col" key={i}>
                                <div className="category-item">
                                    <div className="category-inner">
                                        <div className="category-thumb">
                                            <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                        </div>
                                        <div className="category-content">
                                            <div className="cate-icon">
                                                <i className={`${val.iconName}`}></i>
                                            </div>
                                            <Link to="/course"><h6>{val.title}</h6></Link>
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
 
export default CategoryThree;