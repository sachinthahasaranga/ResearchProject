import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girl3 from '../../assets/images/banner/girl3.png';
const subTitle = "Online English education";
const title = <h2 className="title"><span className="d-lg-block">Learn The</span>English Skills You Need <span className="d-lg-block">To Succeed</span></h2>;
const desc = "Best Free English lerning Platform's in the World";


const catagoryList = [
    {
        name: 'Papers',
        link: '#',
    },
    {
        name: 'Grammar',
        link: '#',
    },
    {
        name: 'Listning activites',
        link: '#',
    },
    {
        name: 'videos',
        link: '#',
    },
]


const shapeList = [
    {
        name: '16M Students Happy',
        link: '#',
        className: 'ccl-shape shape-1',
    },
    {
        name: '100+ Total Courses',
        link: '#',
        className: 'ccl-shape shape-2',
    },
    {
        name: '89% Successful Students',
        link: '#',
        className: 'ccl-shape shape-3',
    },
    {
        name: '23M+ Learners',
        link: '#',
        className: 'ccl-shape shape-4',
    },
    {
        name: '36+ Languages',
        link: '#',
        className: 'ccl-shape shape-5',
    },
]

const Banner = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-page/${searchQuery.trim()}`);
        }
    };


    return (
        <section className="banner-section">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-xxl-5 col-xl-6 col-lg-10">
                            <div className="banner-content">
                                <h6 className="subtitle text-uppercase fw-medium">{subTitle}</h6>
                                {title}
                                <p className="desc">{desc}</p>
                                <form onSubmit={handleSearchSubmit}>
                                    <div className="banner-icon">
                                        <i className="icofont-search"></i>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search English Videos"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <button type="submit">Search</button>
                                </form>
                                <div className="banner-catagory d-flex flex-wrap">
                                    <p>Most Popular : </p>
                                    <ul className="lab-ul d-flex flex-wrap">
                                        {catagoryList.map((val, i) => (
                                            <li key={i}><a href={val.link}>{val.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7 col-xl-6">
                            <div className="banner-thumb">
                                <img src="assets/images/banner/01.png" alt="img" />
                                {/* <img src={girl3} alt="img" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="all-shapes"></div>
            <div className="cbs-content-list d-none">
                <ul className="lab-ul">
                    {shapeList.map((val, i) => (
                        <li className={val.className} key={i}><a href={val.link}>{val.name}</a></li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
 
export default Banner;