import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";

export function ArticlesSlider() {
    const swiperRef = useRef()
    return(
        <>
            <div className="prev" onClick={()=> swiperRef.current?.slideNext()}>
                <img src="images/chevron-noir.png" alt="" />
            </div>
            <div className="next" onClick={()=> swiperRef.current?.slidePrev()}>
                <img src="images/chevron-noir.png" alt="" />
            </div>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={3}
                onSwiper={(swiper)=> (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
            >
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src="images/ergotherapie.webp" alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>Histoire du numérique</h4>
                            <p>A l'époque où la digitalisation n'était pas encore née, les gens utilisent des machines de frappe.</p>
                            <button>Lire plus</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}