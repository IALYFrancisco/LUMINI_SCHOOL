import { useEffect, useState } from 'react'
import '../../../../public/styles/dashboard/payment.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../../loading'


export default function Payments(){
    
    const { formationId } = useParams()
    let [ formation, setFormation ] = useState(null)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${formationId}`)
        .then((response)=>{
            setFormation(response.data[0])
        })
    }, [formationId])
    
    if(!formation) return <Loading/>
    return(
        <> { formation && <>
            <h2>Paiement de droit du formation <span className='title-for-payment'>"{formation.title}"</span></h2>
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
        </> }
        </>
    )
}