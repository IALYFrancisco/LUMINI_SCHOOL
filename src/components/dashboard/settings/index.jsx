import '../../../../public/styles/dashboard/setting.css'

export default function Settings(){
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
                                    <input type="text" name="" id="" />
                                </div>
                                <div className="element">
                                    <label>Votre email :</label>
                                    <input type="email" name="" id="" />
                                </div>
                                <div className="element">
                                    <label>Votre numéro téléphone :</label>
                                    <input type="tel" name="" id="" />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}