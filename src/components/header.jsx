export function Header(){
    return(
        <header>
            <div>
                <div className="left">
                    <h1>L'informatique vous intéresse ? Voulez-vous y former ?</h1>
                    <p>Vous êtes donc au bon endroit 👍. Plusieurs modules de nos formations sont faites pour vous.</p>
                    <button>En savoir plus <img src="images/arrow.png" alt="flèche pointant  à droite" /> </button>
                </div>
                <div className="right">
                    <div className="img-container">
                        <img src="images/laptop3.png" alt="jeune femme tenant un laptop"/>
                    </div>
                </div>
            </div>
        </header>
    )
}