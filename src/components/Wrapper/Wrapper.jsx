import './wrapper.css'
import Navbar from "../Navbar"

export default function Wrapper ({children}) {
    return (
        <div className="wrapper">
            <Navbar />

            {children}
        </div>
    )
}