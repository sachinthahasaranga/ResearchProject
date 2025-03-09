
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

const subTitle = "Don’t Miss the Day";
const title = "The People Says About Us";


const clientList = [
    {
        imgUrl: 'assets/images/clients/01.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Angel Mili',
        degi: 'Assistant principal',
    },
    {
        imgUrl: 'assets/images/clients/02.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Rajib Raj',
        degi: 'Assistant principal',
    },
    {
        imgUrl: 'assets/images/clients/03.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Umme Nishat',
        degi: 'Assistant principal',
    },
]


const Clients = () => {
    return (
        <div className="clients-section padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="clients-slider overflow-hidden">
                        <div className="swiper-wrapper">
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
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        width: 1200,
                                        slidesPerView: 2.8,
                                    },
                                }}
                            >
                                {clientList.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="client-item">
                                            <div className="client-inner">
                                                <div className="client-thumb">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                                <div className="client-content">
                                                    <p>{val.desc}</p>
                                                    <div className="client-info">
                                                        <h6 className="client-name">{val.name}</h6>
                                                        <span className="client-degi">{val.degi}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Clients;