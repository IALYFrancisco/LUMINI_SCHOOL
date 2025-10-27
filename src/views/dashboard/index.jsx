import Sidebar from "../../components/dashboard/sidebar"
import '../../../public/styles/dashboard/dashboard.css'
import { Outlet } from "react-router-dom"

export default function Dashboard(){
    return(
        <section id="dashboard-view">
            <Sidebar></Sidebar>
            <section className="sections-container">
                <Outlet/>
            </section>
        </section>
    )
}