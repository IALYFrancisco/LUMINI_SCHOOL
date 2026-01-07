import { useEffect, useRef, useState } from 'react'
import '../../../../public/styles/dashboard/payment.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../../loading'
import { useForm } from 'react-hook-form'
import DateRefactoring from '../../../contexts/DateRefactoring'
import { useAuth } from '../../../contexts/AuthContext'


export default function Payments(){
    
    const { formationId } = useParams()
    let [ formation, setFormation ] = useState(null)
    
    var [ mvolaIsSelected, setMvolaIsSelected ] = useState(false)
    var [ paypalIsSelected, setPayPalIsSelected ] = useState(false)

    const { user } = useAuth()

    const { reset, register } = useForm()

    const mvolaRef = useRef()
    const paypalRef = useRef()

    const SelectMvolaMode = ()=>{
        if(!mvolaRef.current.classList.value.includes("selected")){
            setMvolaIsSelected(true)
            setPayPalIsSelected(false)
        }else{
            setMvolaIsSelected(false)
            setPayPalIsSelected(true)
        }
        mvolaRef.current.classList.toggle("selected")
        paypalRef.current.classList.remove("selected")
    }
    
    const SelectPayPalMode = ()=>{
        if(!paypalRef.current.classList.value.includes("selected")){
            setMvolaIsSelected(false)
            setPayPalIsSelected(true)
        }
        paypalRef.current.classList.toggle("selected")
        mvolaRef.current.classList.remove("selected")
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?_id=${formationId}`)
        .then((response)=>{
            setFormation(response.data[0])
            reset({
                title: response.data[0].title,
                prerequisites: response.data[0].prerequisites,
                beginDate: DateRefactoring(response.data[0].beginDate),
                endDate: DateRefactoring(response.data[0].endDate),
                coursePlace: response.data[0].coursePlace,
                coursePrice: response.data[0].coursePrice,
                description: response.data[0].description,
                phoneNumber: user.phoneNumber
            })
        })
    }, [formationId, reset, user.phoneNumber])
    
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
                            <fieldset className="payment-sections-container">
                                <section className="left">
                                    <div className="element">
                                        <label htmlFor="title">Nom du formation :</label>
                                        <input type="text" id="title" disabled readOnly { ...register('title') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="prerequisites">Les prérequis du formation :</label>
                                        <input type="text" id="prerequisites" disabled readOnly { ...register('prerequisites') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="beginDate">Date et heure de début du formation :</label>
                                        <input type="datetime-local" id="beginDate" disabled readOnly { ...register('beginDate') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="endDate">Date et heure de fin du formation :</label>
                                        <input type="datetime-local" id="endDate" disabled readOnly { ...register('endDate') }/>
                                    </div>
                                </section>
                                <section className="right">
                                    <div className="element">
                                        <label htmlFor="coursePlace">Lieu du formation :</label>
                                        <input type="text" id="coursePlace" disabled readOnly { ...register('coursePlace') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="coursePrice">Coût de la formation (en Ar) :</label>
                                        <input type="text" id="coursePrice" disabled readOnly { ...register('coursePrice') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="description">Description la formation :</label>
                                        <textarea id="description" disabled readOnly { ...register('description') }/>
                                    </div>
                                </section>
                            </fieldset>
                            <fieldset className='payment-details-container'>
                                <h3>Informations sur le paiement :</h3>
                                <div className="section-container">
                                    <div className="left">
                                        <div className="element">
                                            <label htmlFor="">Mode de paiement :</label>
                                            <section className="payment-mode-container">
                                                <div className="mode mvola" title='Paiment par mvola.' ref={mvolaRef} onClick={SelectMvolaMode}>
                                                    <img src="/images/logo-de-mvola.png" alt="" />
                                                </div>
                                                <div className="mode paypal" title='Paiment par PayPal' ref={paypalRef} onClick={SelectPayPalMode}>
                                                    <img src="/images/logo-de-paypal.webp" alt="" />    
                                                </div>
                                            </section>
                                        </div>
                                        { mvolaIsSelected && <div className="element">
                                            <label htmlFor="">Numéro téléphone de paiement :</label>
                                            <input type="tel" id="" { ...register('phoneNumber') } />
                                        </div> }
                                        <div className="element">
                                            <button>Faire la transaction</button>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="element">
                                            <label htmlFor="">Montant totale à payer (en Ar) :</label>
                                            <input type="number" id="" readOnly disabled { ...register("coursePrice") } required/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </section>
        </> }
        </>
    )
}