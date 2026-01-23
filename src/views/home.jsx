import { Header } from "../components/header"
import { Avis } from "../components/avis"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Formations } from "../components/formations"
import { Articles } from "../components/articles"
import '../../public/styles/home.css'
import { Helmet } from "react-helmet-async"

function Home(){

    return (
        <>
            <Helmet>
                <title>Accueil | LUMINI School</title>
            </Helmet>
            <Header></Header>
            <Formations></Formations>
            <Articles></Articles>
            <Avis></Avis>
            <Contact></Contact>
            <Footer></Footer>
        </>
    )
}

export default Home