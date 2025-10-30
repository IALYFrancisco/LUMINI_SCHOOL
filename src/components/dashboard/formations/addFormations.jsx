export default function AddFormation(){
    return(
        <>
            <section className="add-formation-form">
                <h3>Ajout d'une formation :</h3>
                <form>
                    <fieldset>
                        <div className="element">
                            <label>Titre de la formation :</label>
                            <input type="text" required />
                        </div>
                        <div className="element">
                            <label>Image de mis en avant pour la formation :</label>
                            <input type="file" name="" id="" required />
                        </div>
                        <div className="element">
                            <label>Les prérequis d'une formation :</label>
                            <input type="text" name="" id="" required placeholder="Doivent être séparés par un point-virgule" />
                        </div>
                        <div className="element">
                            <button>Soumettre</button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="element">
                            <label>Descriptions de la formation :</label>
                            <textarea cols="30" rows="10" required ></textarea>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    )
}