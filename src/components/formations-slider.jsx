import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";

export function FormationsSlider() {
    const swiperRef = useRef()

    var [ formations, setFormations ] = useState([])
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`)
            .then((response)=>setFormations(response.data))
            .catch(()=>setFormations([]))
            .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>Chargement ...</p>
    if(formations) return(
        <>
            <div className="prev" onClick={()=> swiperRef.current?.slideNext()}>
                <img src="images/chevron.png" alt="" />
            </div>
            <div className="next" onClick={()=> swiperRef.current?.slidePrev()}>
                <img src="images/chevron.png" alt="" />
            </div>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={5}
                onSwiper={(swiper)=> (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    0 : { slidesPerView: 1 },
                    460 : { slidesPerView: 2 },
                    644 : { slidesPerView: 3 },
                    1024 : { slidesPerView: 4 },
                    1320 : { slidesPerView: 5 }
                }}

            >
            { formations && <>
                { formations.map( formation => (
                    <SwiperSlide>
                        <div className="card" key={formation._id}>
                            <div className="formation-image">
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/${formation.image}`} alt="" />
                            </div>
                            <div className="formation-infos">
                                <h4>{formation.title}</h4>
                                <p>{formation.description}</p>
                                <Link to={`/registrations/formation/${formation._id}`}>
                                    <button>S'inscrire</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </>}
            </Swiper>
        </>
    )
}