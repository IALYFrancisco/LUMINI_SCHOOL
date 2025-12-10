import { useEffect, useState } from 'react'
import '../../../../public/styles/dashboard/setting.css'
import { useAuth } from '../../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function Settings(){

    var { user, setUser } = useAuth()
    
    var { reset, register, watch, handleSubmit, formState: { dirtyFields } } = useForm()
    var [ infoFormActive, setInfoFormActive ] = useState(false)
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)
    var [ image, setImage ] = useState(null)
    var [ toggleInfosOverlay, setToggleInfosOverlay ] = useState(false)
    var [ togglePasswordOverlay, setTogglePasswordOverlay ] = useState(false)
    var [ userIsSure, setUserIsSure ] = useState(false) 

    var watchAll = watch()

    var toogleInfoForm = ()=>{
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

    const deleteAccount = (data)=>{

        let _user = {
            _id: user._id,
            password: data.deleteAccountPassword
        }

        if(watchAll.deleteAccountPassword){
            axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/delete`, { data: _user, withCredentials: true })
            .then(()=>{
                setUser(null)
            })
        }
    }

    const changePassword = (_data) => {
        if( watchAll.newChangePassword !== watchAll.confirmNewChangePassword ){
            return
        }else{
            let data = {
                _id: user._id,
                currentPassword: _data.currentChangePassword,
                newPassword: _data.newChangePassword
            }
            axios.patch(`${import.meta.env.VITE_API_BASE_URL}/user/change-password`, data, { withCredentials: true })
            .then(()=>setUser(null))
        }
    }

    const updateUser = (data) => {

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

        if(watchAll.profile){setUrlIsDefined(true)}
        else{setUrlIsDefined(false)}

        if(image){setImageIsDefined(true)}
        else{setImageIsDefined(false)}
        
    }, [image, watchAll.profile])

    var isModified = dirtyFields.name || dirtyFields.email || dirtyFields.profile || dirtyFields.phoneNumber || image

    return(
        <>
            <h2>Paramètres</h2>
            <section className="info-perso-container">
                <div className="head">
                    <p>Vous pouvez apporter des modifications sur les infromations suivantes :</p>
                </div>
                <div className="forms-container">
                    <div className="left">
                        <form onSubmit={handleSubmit(updateUser)}>
                            <fieldset disabled={!infoFormActive}>
                                <div className="form-title">
                                    <h3>Informations personnelles :</h3>
                                    <span className={ infoFormActive ? "action-badge active" : "action-badge" } onClick={toogleInfoForm}> { infoFormActive ? "Annuler" : "Modifier mon infromation"}</span>
                                </div>
                                <div className="element">
                                    <label>Nom d'utilisateur :</label>
                                    <input type="text" id="name" placeholder="Votre nom complet" { ...register("name") }/>
                                </div>
                                <div className="element">
                                    <label>Votre email :</label>
                                    <input type="email" id="email" placeholder="Ex: johndoe@example.com" { ...register("email") }/>
                                </div>
                                <div className="element">
                                    <label>Votre image de profile :</label>
                                    <input disabled={imageIsDefined} type="url" id="profile_url" placeholder="Utilisez cet champ pour une image déjà en ligne" { ...register("profile") }/>
                                    <input disabled={urlIsDefined} type="file" id="profile_file" accept="image/jpeg, image/png" onChange={ (e)=>setImage(e.target.files[0]) }/>
                                </div>
                                <div className="element">
                                    <label>Votre numéro téléphone :</label>
                                    <input type="tel" id="telephone" placeholder='Ex: 030 00 000 00' { ...register("phoneNumber") }/>
                                </div>
                                <div className="element">
                                    <button type='button' disabled={!isModified}>Soumettre</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <fieldset disabled>
                                <div className="form-title">
                                    <h3>Mot de passe :</h3>
                                    <span className="action-badge" onClick={()=>setTogglePasswordOverlay(true)}>Changer de mot de passe</span>
                                </div>
                                <div className="element">
                                    <label>Votre mot de passe :</label>
                                    <input placeholder='********************************' type="password" />
                                </div>
                            </fieldset>
                        </form>
                        <form>
                            <fieldset>
                                <h3>Zone dangereuse :</h3>
                                <button type='button' onClick={() => toggleInfosOverlay ? setToggleInfosOverlay(false) : setToggleInfosOverlay(true)}>Supprimer mon compte</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
            
            {/* overlay et modal pour le formulaire des infos personnelles */}
            <div onClick={ () => { toggleInfosOverlay ? setToggleInfosOverlay(false) : setToggleInfosOverlay(true); reset(); setUserIsSure(false)} } className={ toggleInfosOverlay ? "infos-overlay active" : "infos-overlay" }>
            </div>
            <form className={ toggleInfosOverlay ? "infos-modal active" : "infos-modal" } onSubmit={handleSubmit(deleteAccount)}>
                <span className='close-infos-overlay'>
                    
                </span>
                <h3>Suppression de compte</h3>
                <div className="message">
                    <p>Attention ! Cette action est irréversible. <br/> <span className="red">Etes-vous sûr de vouloir supprimer votre compte ?</span> Cela entraînera la suppression totale de vos données sur LUMINI School, y compris votre compte, vos inscriptions, etc</p>
                </div>
                { userIsSure && <div className="element">
                    <label>Votre mot de passe :</label>
                    <input type="password" id="" placeholder='Saisissez votre mot de passe' { ...register('deleteAccountPassword') } required/>
                </div> }
                <div className="infos-modal-actions">
                    <button type='button' onClick={()=> {setToggleInfosOverlay(false); setUserIsSure(false); reset({ password: null })}}>Non, annuler</button>
                    <button type={ userIsSure ? "submit" : "button"} onClick={()=>setUserIsSure(true)}>{ userIsSure ? "Soumettre" : "Oui, j'en suis sûr" }</button>
                </div>
            </form>
            
            {/* overlay et modal pour le formulaire de changement de mot de passe */}
            <div onClick={ () => { togglePasswordOverlay ? setTogglePasswordOverlay(false) : setTogglePasswordOverlay(true); reset(); setUserIsSure(false)} } className={ togglePasswordOverlay ? "password-overlay active" : "password-overlay" }>
            </div>
            <form className={ togglePasswordOverlay ? "password-modal active" : "password-modal" } onSubmit={handleSubmit(changePassword)}>
                <span className='close-password-overlay'>
                    
                </span>
                <h3>Changement de mot de passe :</h3>
                <div className="message">
                    <p>Choisissez un <span className="red">mot de passe fort (combiné de majuscule, miniscule, caractères spéciaux et nombres).</span> <br /> Vous seriez déconnecté quand votre mot de passe sera changé.</p>
                </div>
                <div className="element">
                    <label>Votre mot de passe actuel :</label>
                    <input type="password" id="currentPassword" placeholder='Mot de passe actuel' { ...register('currentChangePassword') } required/>
                </div>
                <div className="element">
                    <label>Votre nouveau mot de passe :</label>
                    <input type="password" id="newChangePassword" placeholder='Nouveau mot de passe' { ...register('newChangePassword') } required/>
                </div>
                <div className="element">
                    <label>Confirmer le nouveau mot de passe :</label>
                    <input type="password" id="confirmNewChangePassword" placeholder='Confirmation nouveau mot de passe' { ...register('confirmNewChangePassword') } required/>
                </div>
                <div className="password-modal-actions">
                    <button type='button' onClick={()=> {setTogglePasswordOverlay(false); reset({currentChangePassword: null, newChangePassword: null, confirmNewChangePassword: null});}}>Annuler</button>
                    <button>Soumettre</button>
                </div>
            </form>
        </>
    )
}