


const title = "It’s High Time to Start Driving Career";
const videoLink = "https://www.youtube-nocookie.com/embed/jP649ZHA8Tg";



const Video = () => {
    return (
        <div className="video-section padding-tb">
            <div className="container">
                <div className="section-wrapper text-center">
                    <h3>{title}</h3>
                    <div className="video-thumb">
                        <a href={videoLink} className="video-button popup" target="_blank"><i className="icofont-ui-play"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Video;