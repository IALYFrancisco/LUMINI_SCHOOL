import axios from 'axios'
import { useForm } from 'react-hook-form'

export function Contact(){

    const { reset, register, handleSubmit } = useForm()

    const _handleSubmit = async (data)=> {
        let clientMessage = {
            name: data.name,
            object: data.object,
            email: data.email,
            telephone: data.telephone,
            message: data.message
        }

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/email/send`, clientMessage)
            .then(()=>reset())

    }

    return(
        <div className="contact-container" id="contact">
            <section className="contact">
                <div className="left">
                    <h2>Laissez-nous un message :</h2>
                    <p>Laissez-nous un message et on vous répondra après 🤞. Tout type de message est permit alors n'hésitez pas à écrire.</p>
                    <form onSubmit={handleSubmit(_handleSubmit)}>
                        <div className="element">
                            <label htmlFor="">Entrez votre nom complet :</label>
                            <input type="text" name="name" id="" placeholder="Ex: John Doe" required { ...register("name") }/>
                        </div>
                        <div className="element">
                            <label htmlFor="">Objet de votre contact :</label>
                            <input type="text" name="object" id="" placeholder="Ex: Demande de partenariat avec LUMINI School" required { ...register("object") } />
                        </div>
                        <div className="element">
                            <label htmlFor="">Votre email :</label>
                            <input type="email" name="email" id="" placeholder="Ex: johndoe@example.com" required { ...register("email") } />
                        </div>
                        <div className="element">
                            <label htmlFor="">Votre numéro téléphone :</label>
                            <input type="tel" name="telephone" id="" placeholder="Ex: +261 30 00 000 00" required { ...register("telephone") } />
                        </div>
                        <div className="element">
                            <label htmlFor="">Saisissez vos messages :</label>
                            <textarea name="message" id="" placeholder="J'ai l'honneur de vous écrire ..." required { ...register("message") } ></textarea>
                        </div>
                        <div className="element">
                            <button>
                                Envoyer le message
                                <img src="images/send.png" alt="" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <h2>Avez-vous une urgence ?</h2>
                    <p>Si vous avez une urgence, utilisez l'un des contacts suivants pour contacter directement LUMINI School.</p>
                    <div className="cards-container">
                        <div className="card">
                            <div className="icon-container">
                                <img src="images/phone.png" alt="" />
                            </div>
                            <div className="contact-info">
                                <h3>Téléphone</h3>
                                <p>+261 34 47 635 78</p>
                            </div>
                        </div>
                        <a href="mailto:ialyfrancisco7@gmail.com">
                            <div className="card">
                                <div className="icon-container">
                                    <img src="images/envelope.png" alt="" />
                                </div>
                                <div className="contact-info">
                                    <h3>Email</h3>
                                    <p>ialyfrancisco7@gmail.com</p>
                                </div>
                            </div>
                        </a>
                        <div className="card">
                            <div className="icon-container">
                                <img src="images/gps.png" alt="" />
                            </div>
                            <div className="contact-info">
                                <h3>Adresse</h3>
                                <p>Mangarivotra, Parcelle 21/72, Lot 765, Toamasina 501</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}