import React from 'react'

const input = {
    minWidth: "20%",
    marginRight: "0.5rem"
}

export default function AddUserToCommand(props) {
    return (
        <div>
            <select style={input}>
                <option key={`user-null`} value={-1}>Не выбрано</option>
                {props.users.map(user => (
                    <option key={`user-${user.id}`} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select style={input}>
                <option key={`user-null`} value={-1}>Не выбрано</option>
                {/*props.users.map(user => (
                    <option key={`user-${user.id}`} value={user.id}>{user.name}</option>
                ))*/}
            </select>
            <button>Добавить</button>
        </div>
    )
}
