
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

const title = "Language is The Dress of Thought";
const desc = "Learn Unlimited Language & Explore Yourself";
const btnText = "Get Started Now";


const flagSlider = [
    {
        imgUrl: 'assets/images/flag/01.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/02.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/03.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/04.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/05.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/06.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/07.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/08.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/09.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/10.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/11.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/12.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/13.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/flag/14.jpg',
        imgAlt: 'flag rajibraj91 rajibraj',
    },
]


const BannerSeven = () => {
    return (
        <section className="banner-section style-7">
            <div className="container">
                <div className="section-wrapper">
                    <div className="banner-top">
                        <div className="row justify-content-center">
                            <div className="offset-xl-6 col-xl-6">
                                <div className="banner-content">
                                    <h2 className="title">{title}</h2>
                                    <p className="desc">{desc}</p>
                                    <Link to="/signup" className="lab-btn"><span>{btnText}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-bottom">
                        <div className="bannerflag-slider overflow-hidden">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={2}
                                loop={'true'}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                                breakpoints={{
                                    0: {
                                        width: 0,
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 8,
                                    },
                                    1200: {
                                        width: 1200,
                                        slidesPerView: 13.2,
                                    },
                                }}
                            >
                                {flagSlider.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="flag-item">
                                            <div className="flag-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default BannerSeven;