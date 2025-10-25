import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'

export function FormationsSlider() {
    return(
        <>
            <div className="prev">
                <img src="images/icon.png" alt="" />
            </div>
            <div className="next">
                <img src="images/icon.png" alt="" />
            </div>
            <Swiper
                autoplay={{ delay: 2500 }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={5}
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