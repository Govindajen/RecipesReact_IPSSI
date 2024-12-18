import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './login.css'

export default function Register () {
    const Navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        if (email !== "" && password !== "") {
            axios.post("http://localhost:3001/user", {
                name: name,
                email: email,
                password: password
            }).then((response) => {
                if (response.data.result) {
                    localStorage.setItem("userToken", response.data.userToken)
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
            <h1>Register</h1>
            <div className="inputContainer">
                <input className="inputLogin" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="inputLogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="inputLogin" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
                <button className="btn" onClick={handleSubmit}>Register</button>
                <a href="/login">Already registred? Connect here</a>
            </div>
    )
}