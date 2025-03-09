


const title = "Post Category";


const categoryList = [
    {
        text: 'Themeforest',
        count: '06',
        link: '#',
    },
    {
        text: 'Photodune',
        count: '11',
        link: '#',
    },
    {
        text: 'Codecanyon',
        count: '07',
        link: '#',
    },
    {
        text: 'GRaphicdriver',
        count: '09',
        link: '#',
    },
    {
        text: 'Wordpress',
        count: '50',
        link: '#',
    },
    {
        text: 'Joomla',
        count: '20',
        link: '#',
    },
    {
        text: '3docean',
        count: '93',
        link: '#',
    },
]

const PostCategory = () => {
    return (
        <div className="widget widget-category">
            <div className="widget-header">
                <h5 className="title">{title}</h5>
            </div>
            <ul className="widget-wrapper">
                {categoryList.map((val, i) => (
                    <li key={i}>
                        <a href={val.link} className="d-flex flex-wrap justify-content-between"><span><i className={"icofont-double-right"}></i>{val.text}</span><span>{val.count}</span></a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default PostCategory;