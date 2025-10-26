import { Link } from "react-router-dom"

export default function Sidebar(){
    return(
        <aside>
            <ul>
                <li className="logo">
                    <Link to="/">LUMINI School</Link>
                </li>
                <li></li>
                <li></li>
            </ul>
        </aside>
    )
}