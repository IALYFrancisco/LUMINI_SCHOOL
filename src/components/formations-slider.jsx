import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";

export function FormationsSlider() {
    const swiperRef = useRef()
    return(
        <>
            <div className="prev" onClick={()=> swiperRef.current?.slideNext()}>
                <img src="images/icon.png" alt="" />
            </div>
            <div className="next" onClick={()=> swiperRef.current?.slidePrev()}>
                <img src="images/icon.png" alt="" />
            </div>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={5}
                onSwiper={(swiper)=> (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}

            >
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <div className="formation-image">
                            <img src="images/dietetique.webp" alt="" />
                        </div>
                        <div className="formation-infos">
                            <h4>Bases du HTML et CSS</h4>
                            <p>Cette formation apprend les bases du HTML et CSS dans le cadre de création de siteweb.</p>
                            <button>S'inscrire</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}