
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';


const subTitle = "Testimonials";
const title = "What People Say";
const absTitle = "Testimonials";


const clientSliderList = [
    {
        imgUrl: 'assets/images/clients/01.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        iconNane: 'icofont-quote-left',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Laurie R. Gallegos',
        degi: 'Assistant principal',
    },
    {
        imgUrl: 'assets/images/clients/02.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        iconNane: 'icofont-quote-left',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Anthony McGuffog',
        degi: 'Payroll bookkeeper',
    },
    {
        imgUrl: 'assets/images/clients/03.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        iconNane: 'icofont-quote-left',
        desc: 'Dynamically impact tactical methods of empowerment through ubiquitous methodologies. Global utilize robust services without integrated process improvements. Completely leverage existing niche markets via exceptional leadership skills.',
        name: 'Isabel Blaubaum',
        degi: 'College instructor',
    },
]

const ClientsThree = () => {
    return (
        <div className="clients-section style-3 padding-tb">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle yellow-color">{subTitle}</span>
                    <h2 className="title">{title}</h2>
                    <h2 className="abs-title">{absTitle}</h2>
                </div>
                <div className="section-wrapper">
                    <div className="clients-slider2 overflow-hidden">
                        <Swiper
                            loop={'true'}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                prevEl: '.clients-slider2-prev',
                                nextEl: '.clients-slider2-next',
                            }}
                            modules={[Autoplay, Navigation]}
                        >
                            {clientSliderList.map((val, i) => (
                                <SwiperSlide key={i}>
                                    <div className="client-item">
                                        <div className="client-inner">
                                            <div className="client-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                <div className="quote">
                                                    <i className={val.iconNane}></i>
                                                </div>
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
                        <div className="clients-slider-nav clients-slider2-next"><i className="icofont-double-left"></i></div>
                        <div className="clients-slider-nav clients-slider2-prev"><i className="icofont-double-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ClientsThree;