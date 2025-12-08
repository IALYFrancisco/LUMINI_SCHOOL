import { useEffect } from 'react'
import '../../../../public/styles/dashboard/setting.css'
import { useAuth } from '../../../contexts/AuthContext'
import { useForm } from 'react-hook-form'

export default function Settings(){

    const { user } = useAuth()
    const { reset, register } = useForm()

    useEffect(()=>{
        reset({
            name: user.name,
            email: user.email,
            profile: (user.profile.includes('https') || user.profile.includes('http')) ? user.profile : `${import.meta.env.VITE_API_BASE_URL}${user.profile}`,
            phoneNumber: user.phoneNumber
        })
    }, [reset, user])

    return(
        <>
            <h2>Paramètres</h2>
            <section className="info-perso-container">
                <div className="head">
                    <p>Vous pouvez apporter des modifications sur les infromations suivantes :</p>
                </div>
                <div className="forms-container">
                    <div className="left">
                        <form>
                            <h3>Informations personnelles :</h3>
                            <fieldset>
                                <div className="element">
                                    <label>Nom d'utilisateur :</label>
                                    <input type="text" name="" id="" placeholder="Votre nom complet" { ...register('name') }/>
                                </div>
                                <div className="element">
                                    <label>Votre email :</label>
                                    <input type="email" name="" id="" placeholder="Ex: johndoe@example.com" { ...register('email') }/>
                                </div>
                                <div className="element">
                                    <label>Votre image de profile :</label>
                                    <input type="url" name="" id="" placeholder="Utilisez cet champ pour une image déjà en ligne" { ...register('profile') }/>
                                    <input type="file" name="" id="" accept="image/jpeg, image/png"/>
                                </div>
                                <div className="element">
                                    <label>Votre numéro téléphone :</label>
                                    <input type="tel" name="" id="" placeholder='Ex: 030 00 000 00' { ...register('phoneNumber') }/>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}