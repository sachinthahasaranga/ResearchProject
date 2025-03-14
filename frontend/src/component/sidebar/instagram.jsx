

const title = "Gallery Photos";

const instagramList = [
    {
        imgUrl: 'assets/images/blog/01.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/02.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/03.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/04.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/05.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/06.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/07.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/08.jpg',
        imgAlt: 'product',
    },
    {
        imgUrl: 'assets/images/blog/09.jpg',
        imgAlt: 'product',
    },
]

const Instagram = () => {
    return (
        <div className="widget widget-instagram">
            <div className="widget-header">
                <h5 className="title">{title}</h5>
            </div>
            <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                {instagramList.map((val, i) => (
                    <li key={i}><a href={`${val.imgUrl}`} target="_blank"><img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} /></a></li>
                ))}
            </ul>
        </div>
    );
}
 
export default Instagram;