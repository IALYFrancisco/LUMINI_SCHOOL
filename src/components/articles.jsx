import { ArticlesSlider } from "./articles-slider"

export function Articles(){
    return(
        <section className="blog-container">
            <section>
                <div className="left">
                    <div className="cards-container">
                        <ArticlesSlider></ArticlesSlider>
                    </div>
                </div>
                <div className="right">
                    <h2>Mettez-vous à nos places juste un instant</h2>
                    <p>On partage aussi au monde entier notre point de vue vis à vis d'un sujet. On parle à travers nos articles des événements passés 🌿, nos perceptions du présent 🍃 et nos visions du futur 🍂.</p>
                    <button>Voir touts les articles</button>
                </div>
            </section>
        </section>
    )
}