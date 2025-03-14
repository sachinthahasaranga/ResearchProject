


const title = "Course Categories";


const cscContentList = [
    {
        link: '#',
        left: 'Personal Development',
        right: '30',
    },
    {
        link: '#',
        left: 'Photography',
        right: '20',
    },
    {
        link: '#',
        left: 'Teaching and Academics',
        right: '93',
    },
    {
        link: '#',
        left: 'Art and Design',
        right: '54',
    },
    {
        link: '#',
        left: 'Business',
        right: '28',
    },
    {
        link: '#',
        left: 'Data Science',
        right: '30',
    },
    {
        link: '#',
        left: 'Development',
        right: '38',
    },
    {
        link: '#',
        left: 'Finance',
        right: '75',
    },
    {
        link: '#',
        left: 'Health & Fitness',
        right: '89',
    },
    {
        link: '#',
        left: 'Lifestyle',
        right: '37',
    },
    {
        link: '#',
        left: 'Marketing',
        right: '18',
    },
    {
        link: '#',
        left: 'Music',
        right: '20',
    },
]


const CourseSideCetagory = () => {
    return (
        <div className="course-side-cetagory">
            <div className="csc-title">
                <h5 className="mb-0">{title}</h5>
            </div>
            <div className="csc-content">
                <div className="csdc-lists">
                    <ul className="lab-ul">
                        {cscContentList.map((val, i) => (
                            <li key={i}>
                                <div className="csdc-left"><a href={val.link}>{val.left}</a></div>
                                <div className="csdc-right">{val.right}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default CourseSideCetagory;