import { Header } from "../components/header"
import { Avis } from "../components/avis"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Formations } from "../components/formations"
import { Articles } from "../components/articles"
import '../../public/styles/home.css'
import { useSeoMeta } from "@unhead/react"

function Home(){

    useSeoMeta({

        title: 'Accueil | LUMINI School - Plateforme de formation en informatique',

        ogTitle: 'Accueil | LUMINI School - Plateforme de formation en informatique',

        twitterTitle: 'Accueil | LUMINI School - Plateforme de formation en informatique'

    })

    return (
        <>
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