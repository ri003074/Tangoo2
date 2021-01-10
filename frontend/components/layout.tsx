import Link from 'next/link'
import React from 'react'
import NavLink from 'next/link'
import { Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { random } from '../store'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({ username: '', password: '' })
    const [token, setToken] = useState("")

    const setRandom = () => {
        dispatch(random())
    }

    React.useEffect(() => {
        setToken(localStorage.getItem('token'))
    });

    const handleUserInfoChange = () => evt => {
        console.log("change")
        const value = evt.target.value
        const name = evt.target.name
        console.log(value)
        console.log(name)
        setUserInfo({ ...userInfo, [name]: value })
    }

    const logIn = () => {
        console.log("login!")
        console.log(userInfo)
        axios.post(
            `http://localhost:8000/api/v1/auth/token/login`,
            userInfo, {
        })
            .then(res => {
                console.log(res.data.auth_token);
                localStorage.clear();
                localStorage.setItem('token', "Token " + res.data.auth_token);
                window.location.reload()
            })
    }

    const logOut = () => {
        localStorage.setItem("token", "");
        window.location.reload();
    }

    return (
        < div >

            <nav className="navbar navbar-expand-lg">
                <Navbar.Brand>
                    <Link href="/">Tangoo</Link>
                </Navbar.Brand>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link href="/"><a className="nav-link">Home <span className="sr-only">(current)</span></a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/add"><a className="nav-link">Add</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/quiz"><a className="nav-link">Quiz</a></Link>
                        </li>
                    </ul>

                    {
                        token ? (
                            <div className="mr-5" onClick={() => logOut()}>logOut</div>
                        ) : (
                                <form className="form-inline">
                                    <input
                                        type="text"
                                        className="form-control mr-sm-2"
                                        placeholder="username"
                                        style={{ border: 'none' }}
                                        name="username"
                                        value={userInfo.username}
                                        onChange={handleUserInfoChange()}
                                    />
                                    <input
                                        type="password"
                                        className="form-control mr-sm-2"
                                        placeholder="password"
                                        style={{ border: 'none' }}
                                        name="password"
                                        value={userInfo.password}
                                        onChange={handleUserInfoChange()}
                                    />
                                    <div className="mr-5" onClick={() => logIn()}>logIn</div>
                                </form>

                            )
                    }
                </div>
            </nav >
            { children}
        </div >
    )
}