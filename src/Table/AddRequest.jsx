import React, { useState } from 'react'
import './Table.css'

const formStyle = {
    display: 'flex', 
    marginBottom: '3rem',  
    padding: '0' 
}

export default function AddRequest(props) {
    const [activeUserId, setActiveId] = useState(-1);
    const [unAvailableUsers, setUnAvailable] = useState([]);
    const getUnAvailableUsers = () => {
        let vacationUsers = props.users.filter(user => user.vacation).map(illUser => illUser.id);
        let helper = unAvailableUsers.filter(person => !vacationUsers.includes(person))
        let unAvailableUsersList = [...helper, ...vacationUsers]
        if (!unAvailableUsersList.includes(activeUserId)) {
            unAvailableUsersList.push(activeUserId);
        } else if (unAvailableUsersList.length === props.users.length) {
            unAvailableUsersList = [activeUserId, ...vacationUsers]
            setUnAvailable([])  
        }
        return unAvailableUsersList;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (activeUserId !== -1) {
            const unAvailableUsersList = getUnAvailableUsers();
            const availableUsers = props.users.filter(user => !unAvailableUsersList.includes(user.id))
            if (availableUsers.length === 0) {
                alert('Нет свободных разработчиков!')
                return;
            }
            let request = Math.floor(Math.random() * availableUsers.length);
            props.addRequest(activeUserId, availableUsers[request].id)
            setUnAvailable([...unAvailableUsersList, availableUsers[request].id])
        }
    }

    return (  
        <form style={formStyle} onSubmit={handleSubmit}>
            <button type="submit" title="Данная кнопка автоматически отправляет задачу другому доступному работнику">Добавить задачу</button>
            <select className="selectBlock" value={activeUserId} title="В данном поле производится выбор работника от которого будет отправлена задача" onChange={(event) => setActiveId(Number(event.target.value))}>
                <option key={`user-null`} value={-1}>Не выбрано</option>
                {props.users.map(user => (
                    <option key={`user-${user.id}`} value={user.id}>{user.name}</option>
                ))}
            </select>   
        </form>
)}