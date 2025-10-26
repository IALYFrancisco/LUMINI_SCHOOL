import Sidebar from "../../components/dashboard/sidebar"
import '../../../public/styles/dashboard/dashboard.css'
import Formations from "../../components/dashboard/formations"
export default function Dashboard(){
    return(
        <section id="dashboard-view">
            <Sidebar></Sidebar>
            <section className="sections-container">
                <Formations></Formations>
            </section>
        </section>
    )
}