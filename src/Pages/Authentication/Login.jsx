import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './login.css'

export default function Login () {
    const Navigate = useNavigate()

    const [email, setEmail] = useState("example@email.com")
    const [password, setPassword] = useState("password")

    //Navigate("/home")
    const handleSubmit = (e) => {
        if (email !== "" && password !== "") {
            axios.post("http://localhost:3001/login", {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.result) {
                    localStorage.setItem("userToken", response.data.token)
                    localStorage.setItem("user", response.data.name)
                    Navigate("/home")
                } else {
                    alert(response.data.error)
                }
            })
        }
    }

    return (
            <div className="loginContainer">
                <h1>Login</h1>
                <div className="inputContainer">
                 <input className="inputLogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="inputLogin" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="btn" onClick={handleSubmit}>Login</button>

                <a href="/register">Create a new account</a>
            </div>
    )
}