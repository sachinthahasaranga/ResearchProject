
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';


const sponsorList = [
    {
        imgUrl: 'assets/images/sponsor/01.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/sponsor/02.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/sponsor/03.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/sponsor/04.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/sponsor/05.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
    {
        imgUrl: 'assets/images/sponsor/06.png',
        imgAlt: 'sponsor rajibraj91 rajibraj',
    },
]


const Sponsor = () => {
    return (
        <div className="sponsor-section section-bg">
            <div className="container">
                <div className="section-wrapper">
                    <div className="sponsor-slider">
                        <Swiper
                            spaceBetween={20}
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
                                    slidesPerView: 1,
                                },
                                768: {
                                    width: 768,
                                    slidesPerView: 3,
                                },
                                1200: {
                                    width: 1200,
                                    slidesPerView: 5.5,
                                },
                            }}
                        >
                            {sponsorList.map((val, i) => (
                                <SwiperSlide key={i}>
                                    <div className="sponsor-iten">
                                        <div className="sponsor-thumb">
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
    );
}
 
export default Sponsor;