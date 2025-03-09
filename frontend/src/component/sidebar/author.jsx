


const name = "Rajib Raj"
const degi = "Assistant Teacher"
const desc = "I'm an Afro-Latina digital artist originally from Long Island, NY. I love to paint design and photo manpulate in Adobe Photoshop while helping others learn too. Follow me on Instagram or tweet me"


const socialList = [
    {
        link: '#',
        iconName: 'icofont-facebook',
        className: 'facebook',
    },
    {
        link: '#',
        iconName: 'icofont-twitter',
        className: 'twitter',
    },
    {
        link: '#',
        iconName: 'icofont-linkedin',
        className: 'linkedin',
    },
    {
        link: '#',
        iconName: 'icofont-instagram',
        className: 'instagram',
    },
    {
        link: '#',
        iconName: 'icofont-pinterest',
        className: 'pinterest',
    },
]

const Author = () => {
    return (
        <div className="authors">
            <div className="author-thumb">
                <img src="assets/images/author/01.jpg" alt="rajibraj91" />
            </div>
            <div className="author-content">
                <h5>{name}</h5>
                <span>{degi}</span>
                <p>{desc}</p>
                <ul className="lab-ul social-icons">
                    {socialList.map((val, i) => (
                        <li key={i}>
                            <a href={val.link} className={val.className}><i className={val.iconName}></i></a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default Author;