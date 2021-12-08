import React, { useState } from 'react'
import Modal from './Modal'

const input = {
    minWidth: "20%",
    marginRight: "0.5rem",
    marginBottom: "0.5rem"
}

export default function AddTeam({addTeam}) {

    const [team, addToTeam] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [content, setContent] = useState('');

    function handleSubmit (event) {
        event.preventDefault();
        addTeam(team);
        addToTeam("");
    }

    function handleChange (event) {
        addToTeam(event.target.value);
        setContent(event.target.value);
        event.target.value = "";
    }

    function handleClick () {
        if (team !== '') {
            setModalActive(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div> 
                <input style={input} type="text" placeholder="Введите название команды" value={team} required onChange={handleChange} />
                <button onClick={handleClick}>Добавить</button>
                <Modal active={modalActive} setActive={setModalActive}>
                    <p>Команда <b>{content}</b> была создана!</p>
                </Modal>
            </div>
        </form>
    )
}
