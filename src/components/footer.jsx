export function Footer(){
    return (
        <section className="footer-container">
            <footer>
                <section>
                    <ul>
                        <li className="logo">LUMINI School</li>
                        <li>
                            <p>LUMINI School est une organisation  qui s'est engagée au devoir de former tout les citoyens. Elle transmet ses espoirs à ses apprenties à travers des environnements et cadre de formation convivial ✍ .</p>
                        </li>
                        <li className="actions">
                            <button>Se connecter</button>
                            <button>Créer un compte</button>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Menus</h3>
                    <ul>
                        <li>Accueil</li>
                        <li>Formations</li>
                        <li>Articles</li>
                    </ul>
                </section>
                <section>
                    <h3>Nos contacts</h3>
                    <ul>
                        <li>Ecrire un message à LUMINI</li>
                        <li>
                            <img src="images/phone (1).png" alt="" />
                            +261 34 47 635 78
                        </li>
                        <li>
                            <img src="images/envelope (1).png" alt="" />
                            ialyfrancisco7@gmail.com
                        </li>
                        <li>
                            <img src="images/gps (1).png" alt="" />
                            Mangarivotra, Parcelle 21/72, Lot 765, Toamasina 501
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Légales</h3>
                    <ul>
                        <li>Conditions d'utilisation</li>
                    </ul>
                    <h3>Réseaux sociaux</h3>
                    <ul className="rs">
                        <li>
                            <img src="images/facebook.png" alt="" />
                        </li>
                        <li>
                            <img src="images/linkedin.png" alt="" />
                        </li>
                    </ul>
                </section>
            </footer>
            <section className="info-page">
                <span className="left">
                    <p>&copy; 2025 LUMINI School. Tout droit réservés.</p>
                </span>
                <span className="right">
                    <p>Fait avec 💖 par LUMINI</p>
                </span>
            </section>
        </section>
    )
}