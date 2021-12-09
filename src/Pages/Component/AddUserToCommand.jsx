import React, { useState } from 'react'
import Modal from './Modal'

export default function AddUserToCommand(props) {

    const [name, setName] = useState(-1);
    const [team, userToTeam] = useState(-1);
    const [modalActive, setModalActive] = useState(false);
    const [content, setContent] = useState([]);
    const [switcher, setSwitcher] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        if ((Number(name) !== -1) && (Number(team) !== -1)) {
            props.addToTeam(name, team); 
            setContent({
                userName: (props.users.filter(user => (user.id === Number(name)))[0].name),
                userTeam: (props.teams.filter(user => (user.id === Number(team)))[0].name)
            });
        }    
    }

    function handleClick() {
        if ((Number(name) !== -1) && (Number(team) !== -1) && (switcher === true)) {
            setModalActive(true);
            setSwitcher(false);
        }
    }

    function handleChangeUser(event) {
        setName(event.target.value);
        setSwitcher(true);   
    }

    function handleChangeTeam(event) {
        userToTeam(event.target.value);
        setSwitcher(true);
    }

    return (
        <form className="addUserToTeam" onSubmit={handleSubmit}>
            <select value={name} onChange={handleChangeUser}>
                <option key={`user-null`} value={-1}>Не выбрано</option>
                {props.users.map(user => (
                    <option key={`user-${user.id}`} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select value={team} onChange={handleChangeTeam}>
                <option key={`command-null`} value={-1}>Не выбрано</option>
                {props.teams.map(team => (
                    <option key={`team-${team.id}`} value={team.id}>{team.name}</option>
                ))}
            </select>
            <button type="submit" onClick={handleClick}>Добавить</button>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Пользователь <b>{content.userName}</b> был добавлен в команду <b>{content.userTeam}</b>!</p>
            </Modal>
        </form>
    )
}
