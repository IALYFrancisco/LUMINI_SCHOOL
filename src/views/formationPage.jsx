import Nav from "../components/nav"
import '../../public/styles/formationsPage.css'

export function FormationsPage(){
    return(
        <>
            <Nav></Nav>
            <section className="formations-page">
                <div className="head">
                    <h2>Toute nos formations :</h2>
                    <p>Ci-dessous la liste de toute nos formations. Elles sont issues des branches existantes du secteur de l'informatique et ont été éléborées par nous-même afin de garantir leurs contenus ✨.</p>
                    <div className="actions">
                        <input type="text" name="formation" id="" placeholder="Rehcrecher des formations"/>
                    </div>
                </div>
            </section>
        </>
    )
}