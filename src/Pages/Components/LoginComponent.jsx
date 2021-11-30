import React from 'react'

export default function LoginComponent() {
    return (
    <div className="login">
        <div className="input">
            <input type="text" placeholder="Введите логин"></input>
                <div className="password">
                    <input type="password" className="password" placeholder="Введите пароль"></input>
                </div>
                <div className="button">
                    <button>Войти</button>
                </div>
        </div>         
    </div>
    )
}
