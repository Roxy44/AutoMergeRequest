import React, { useState } from 'react'

export default function UserManagment({addUser, removeUser}) {

    const [name, setName] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (name !== "") {
            addUser(name);
            setName("");
        }
    }

    function handleClick(event) {
        removeUser(name);
        setName("");
    }

    function handleChange(event) {
        setName(event.target.value);
        event.target.value = "";
    }

    return (  
        <form style={ { display: 'flex', marginBottom: '0.5rem', marginTop: '1rem', padding: '0'}} onSubmit={handleSubmit}>
            <input style={{minWidth: '20%'}} type="text" value={name} maxLength="30" required onChange={handleChange} title="Поле для ввода имя нового работника"/>
            <button style={ { marginLeft: '0.5rem' } } type="submit" title="Данная кнопка добавляет нового работника с именем, написанным в текстовом поле слева">Добавить работника</button>
            <button style={ { marginLeft: '0.5rem' } } type="button" onClick={handleClick} title="Данная кнопка увольняет работника с именем, написанным в текстовом поле слева">Уволить работника</button>
        </form>
)}