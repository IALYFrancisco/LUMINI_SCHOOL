import { Header } from "../components/header"
import { Avis } from "../components/avis"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Formations } from "../components/formations"
import { Articles } from "../components/articles"
import '../../public/styles/home.css'
import { useHead, useSeoMeta } from "@unhead/react"

function Home(){

    useHead({
        link: [
            { rel: 'canonical', href: 'https://luminischool.onrender.com' }
        ]
    })

    useSeoMeta({

        title: 'Accueil | LUMINI School - Plateforme de formation en informatique',

        ogTitle: 'Accueil | LUMINI School - Plateforme de formation en informatique',
        ogUrl: 'https://luminischool.onrender.com',

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