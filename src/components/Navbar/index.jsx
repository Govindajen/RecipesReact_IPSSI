import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar () {

    const user = localStorage.getItem('user')

    const handleLogout = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('user')
        window.location.assign('/login')    
    }

    return (
        <nav className="navbar">
            <Link to="/home">
              <h1 className='title'>My best Recipes</h1>
            </Link>
            <div className='links'>
                {/* <Link className="navItem" to='/home'>Home</Link> */}
                <p className='welcome'>Welcome back! <span className='name'>{user}</span></p>
                <span className='spacer'></span>
                <p className="logout" onClick={handleLogout}>Logout</p>
            </div>
        </nav>
    )
}