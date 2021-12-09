import React, { useState } from 'react'
import './Table.css'
import Modal from '../Pages/Component/Modal'

export default function AddRequest(props) {
    const [activeUserId, setActiveId] = useState(-1);
    const [unAvailableUsers, setUnAvailable] = useState([]);

    const [modalActive, setModalActive] = useState(false);
    const [content, setContent] = useState([]);

    const getUnAvailableUsers = () => {
        let vacationUsers = props.users.filter(user => user.vacation).map(illUser => illUser.id);
        let helper = unAvailableUsers.filter(person => !vacationUsers.includes(person));
        let unAvailableUsersList = [...helper, ...vacationUsers];
        if (!unAvailableUsersList.includes(activeUserId)) {
            unAvailableUsersList.push(activeUserId);
        } else if (unAvailableUsersList.length === props.users.length) {
            unAvailableUsersList = [activeUserId, ...vacationUsers];
            setUnAvailable([]);  
        }
        return unAvailableUsersList;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (activeUserId !== -1) {
            const unAvailableUsersList = getUnAvailableUsers();
            const availableUsers = props.users.filter(user => !unAvailableUsersList.includes(user.id));
            if (availableUsers.length === 0) {
                alert('Нет свободных разработчиков!');
                return;
            }

            let request = Math.floor(Math.random() * availableUsers.length);
            props.addRequest(activeUserId, availableUsers[request].id);
            setContent({
                userFrom: (props.users.filter(user => (user.id === Number(activeUserId)))[0].name),
                userTo: (props.users.filter(user => (user.id === Number(availableUsers[request].id)))[0].name)
            });
            setUnAvailable([...unAvailableUsersList, availableUsers[request].id]);
        }
    }

    const handleClick = () => {
        if(activeUserId !== -1) { 
            setModalActive(true)
        };   
    }

    return (  
        <form className="request" onSubmit={handleSubmit}>
            <select className="selectBlock" value={activeUserId} onChange={(event) => setActiveId(Number(event.target.value))}>
                <option key={`user-null`} value={-1}>Не выбрано</option>
                {props.users.map(user => (
                    user.teams.indexOf(props.table) !== -1 && 
                    <option key={`user-${user.id}`} value={user.id}>{user.name}</option>
                ))}
            </select>
            <button type="submit" onClick={handleClick}>Добавить задачу</button>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Пользователь <b>{content.userFrom}</b> отправил merge-request пользователю <b>{content.userTo}</b></p>
            </Modal>   
        </form>
)}