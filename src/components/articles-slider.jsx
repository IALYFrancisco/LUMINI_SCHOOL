import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import DOMPurify from "dompurify"
import { Link } from "react-router-dom"

export function ArticlesSlider() {

    const [ articles, setArticles ] = useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get`, { withCredentials: true })
        .then((response)=>{
            setArticles(response.data.filter(article => article.published === true))
        })
    }, [])

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
                breakpoints={{
                    0 : { slidesPerView: 1 },
                    460 : { slidesPerView: 2 },
                    720 : { slidesPerView: 3 },
                    768 : { slidesPerView: 2 },
                    1350 : { slidesPerView: 3 }
                }}
            >
                { articles && articles.map( article => <SwiperSlide>
                    <div className="card">
                        <div className="blog-image">
                            <img src={ (article.image.includes('https') || article.image.includes('http')) ? article.image : `${import.meta.env.VITE_API_BASE_URL}/${article.image}` } alt="" />
                        </div>
                        <div className="blog-infos">
                            <h4>{article.title}</h4>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents) }}></p>
                            <Link to={`/article/${article._id}`}>
                                <button>Lire plus</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>) }
            </Swiper>
        </>
    )
}