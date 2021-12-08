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
        <form style={ { display: 'flex', marginBottom: '0.5rem', padding: '0'}} onSubmit={handleSubmit}>
            <input style={{minWidth: '20%'}} type="text" value={name} maxLength="30" placeholder="Введите имя пользователя" required onChange={handleChange}/>
            <button style={ { marginLeft: '0.5rem' } } type="submit">Добавить пользователя</button>
            <button style={ { marginLeft: '0.5rem' } } type="button" onClick={handleClick}>Удалить пользователя</button>
        </form>
)}