
import SelectCatagory from "../sidebar/selectCatagory";


const title = <h2>Search Your One From <span>150+</span> Online Courses</h2>;
const desc = "We Have The Largest Collection of Courses";


const bannerList = [
    {
        iconName: 'icofont-users-alt-4',
        text: '1.5 Million Students',
    },
    {
        iconName: 'icofont-notification',
        text: 'More then 2000 Courses',
    },
    {
        iconName: 'icofont-globe',
        text: 'Learn Anything Online',
    },
]

const BannerFour = () => {
    return (
        <div className="banner-section style-4">
            <div className="container">
                <div className="banner-content">
                    {title}
                    <form>
                        <SelectCatagory select={'all'} />
                        <input type="text" name="search" placeholder="Search your theme" />
                        <button type="submit"><i className="icofont-search"></i></button>
                    </form>
                    <p>{desc}</p>
                    <ul className="lab-ul">
                        {bannerList.map((val, i) => (
                            <li key={i}><i className={val.iconName}></i> {val.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default BannerFour;