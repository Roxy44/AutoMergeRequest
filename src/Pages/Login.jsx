import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './Login.css'
//import socket from '../socket'

export default function Login({checkUserRole}) {
    const navigate = useNavigate();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        if (login && password !== "") {
            let id;
            if (login === "a") {
                id = 0;
            } else if (login === "l") {
                id = 1;
            } else {
                id = 2;
            }
            checkUserRole(id);
            navigate("/home");
        }
    }
    
    function handleChange(event) {
        event.target.type === "text" ? setLogin(event.target.value) : setPassword(event.target.value);
        event.target.value = ""
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="input">
                <input type="text" placeholder="Введите логин" value={login} required onChange={handleChange} />
                <div className="password">
                    <input type="password" className="password" placeholder="Введите пароль" value={password} required onChange={handleChange} />
                </div>
                <div className="button">
                    <button type="submit" class="btn btn-warning">Войти</button>
                </div>
            </div>         
        </form>
)}
