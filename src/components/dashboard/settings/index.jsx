import { useEffect, useState } from 'react'
import '../../../../public/styles/dashboard/setting.css'
import { useAuth } from '../../../contexts/AuthContext'
import { useForm } from 'react-hook-form'

export default function Settings(){

    const { user } = useAuth()
    
    const { reset, register, watch } = useForm()
    var [ infoFormActive, setInfoFormActive ] = useState(false)
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)
    var [ image, setImage ] = useState('')

    var watchAll = watch()

    const toogleInfoForm = ()=>{
        infoFormActive ? setInfoFormActive(false) : setInfoFormActive(true)
        if(infoFormActive){
            reset({
                name: user.name,
                email: user.email,
                profile: (user.profile.includes('https') || user.profile.includes('http')) ? user.profile : `${import.meta.env.VITE_API_BASE_URL}${user.profile}`,
                phoneNumber: user.phoneNumber
            })
        }
    }

    useEffect(()=>{
        reset({
            name: user.name,
            email: user.email,
            profile: (user.profile.includes('https') || user.profile.includes('http')) ? user.profile : `${import.meta.env.VITE_API_BASE_URL}${user.profile}`,
            phoneNumber: user.phoneNumber
        })
    }, [reset, user])

    useEffect(()=>{

        if(image) setImageIsDefined(true)
        else setImageIsDefined(false)

        if(watchAll.profile) setUrlIsDefined(true)
        else setImageIsDefined(false)
        
    }, [image, watchAll.profile])

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
                            <fieldset disabled={!infoFormActive}>
                                <div className="form-title">
                                    <h3>Informations personnelles :</h3>
                                    <span className={ infoFormActive ? "action-badge active" : "action-badge" } onClick={toogleInfoForm}> { infoFormActive ? "Annuler" : "Modifier mon infromation"}</span>
                                </div>
                                <div className="element">
                                    <label>Nom d'utilisateur :</label>
                                    <input type="text" name="" id="name" placeholder="Votre nom complet" { ...register('name') }/>
                                </div>
                                <div className="element">
                                    <label>Votre email :</label>
                                    <input type="email" name="" id="email" placeholder="Ex: johndoe@example.com" { ...register('email') }/>
                                </div>
                                <div className="element">
                                    <label>Votre image de profile :</label>
                                    <input disabled={imageIsDefined} type="url" name="" id="profile_url" placeholder="Utilisez cet champ pour une image déjà en ligne" { ...register('profile') } onChange={()=>{console.log(urlIsDefined), console.log(watchAll.profile)}}/>
                                    <input disabled={urlIsDefined} type="file" name="" id="profile_file" accept="image/jpeg, image/png" onChange={ (e)=>setImage(e.target.files[0]) }/>
                                </div>
                                <div className="element">
                                    <label>Votre numéro téléphone :</label>
                                    <input type="tel" name="" id="telephone" placeholder='Ex: 030 00 000 00' { ...register('phoneNumber') }/>
                                </div>
                                <div className="element">
                                    <button>Soumettre</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <fieldset disabled>
                                <h3>Mot de passe :</h3>
                                <div className="element">
                                    <label>Votre mot de passe :</label>
                                    <input placeholder='********************************' type="password" />
                                </div>
                                <button>Soumettre</button>
                            </fieldset>
                        </form>
                        <form>
                            <fieldset>
                                <h3>Zone dangereuse :</h3>
                                <button>Supprimer mon compte</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}