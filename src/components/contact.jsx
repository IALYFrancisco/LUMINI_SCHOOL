export function Contact(){
    return(
        <section className="contact">
            <div className="left">
                <h2>Laissez-nous un message :</h2>
                <p>Laissez-nous un message et on vous répondra après 🤞. Tout type de message est permit alors n'hésitez pas à écrire.</p>
                <form action="">
                    <div className="element">
                        <label htmlFor="">Entrez votre nom complet :</label>
                        <input type="text" name="" id="" placeholder="Ex: John Doe"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Objet de votre contact :</label>
                        <input type="text" name="" id="" placeholder="Ex: Demande de partenariat avec LUMINI School"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre email :</label>
                        <input type="email" name="" id="" placeholder="Ex: johndoe@example.com"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Votre numéro téléphone :</label>
                        <input type="tel" name="" id="" placeholder="Ex: +261 30 00 000 00"/>
                    </div>
                    <div className="element">
                        <label htmlFor="">Saisissez vos messages :</label>
                        <textarea name="" id="" placeholder="J'ai l'honneur de vous écrire ..."></textarea>
                    </div>
                    <div className="element">
                        <button>Envoyer le message</button>
                    </div>
                </form>
            </div>
            <div className="right">

            </div>
        </section>
    )
}