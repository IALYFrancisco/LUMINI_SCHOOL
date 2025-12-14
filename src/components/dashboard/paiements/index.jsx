import { useEffect } from 'react'
import '../../../../public/styles/dashboard/payment.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function Payments(){
    
    const { formation } = useParams()
    let [ _formation, setFormation ]

    useEffect(()=>{
        axios.get(`${import.meta.env}/formation/get?_id=${formation}`)
        .then(())
    }, [])
    
    return(
        <>
            <h2>Paiements de droit du formation <span className='title'>{}</span></h2>
            <section className="payment-container">
                <div className="head">
                    <p>Veuillez vérifier la formation auquel vous allez payer le droit 💳.</p>
                </div>
                <div className="forms-container">
                    <form>
                        <fieldset>
                            <h3>Informations sur la formation :</h3>
                        </fieldset>
                    </form>
                </div>
            </section>
        </>
    )
}