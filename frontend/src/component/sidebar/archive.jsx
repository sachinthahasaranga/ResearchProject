

const title = "Our Archives";

const archiveList = [
    {
        link: '#',
        month: 'January',
        year: '2021',
    },
    {
        link: '#',
        month: 'February',
        year: '2021',
    },
    {
        link: '#',
        month: 'March',
        year: '2021',
    },
    {
        link: '#',
        month: 'April',
        year: '2021',
    },
    {
        link: '#',
        month: 'June',
        year: '2021',
    },
    {
        link: '#',
        month: 'July',
        year: '2021',
    },
]

const Archive = () => {
    return (
        <div className="widget widget-archive">
            <div className="widget-header">
                <h5 className="title">{title}</h5>
            </div>
            <ul className="widget-wrapper">
                {archiveList.map((val, i) => (
                    <li key={i}>
                        <a href={val.link} className="d-flex flex-wrap justify-content-between"><span><i className="icofont-double-right"></i>{val.month}</span><span>{val.year}</span></a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Archive;