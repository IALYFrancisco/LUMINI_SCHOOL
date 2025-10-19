import { Header } from "../components/header"
import { Avis } from "../components/avis"
import { Contact } from "../components/contact"
import '../../public/styles/home.css'

function Home(){
    return (
        <>
            <Header></Header>
            <Avis></Avis>
            <Contact></Contact>
        </>
    )
}

export default Home