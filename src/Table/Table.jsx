import React, { useState } from 'react'
import './Table.css'

const thStyle = {
    wordBreak: 'break-word'
};

const tdStyle = {
    color: 'yellow', 
    background: 'repeating-linear-gradient(-60deg, green 0, green 2px, transparent 1px, transparent 5px)', 
    backgroundColor: 'black' 
};

/* 
Описать проверку на наличие записей в бд, интегрировать, если сущ.
*/
export default function Table(props) {
    
    const [table, selectTable] = useState('');
    const [switcher, setSwitch] = useState(false)

    function handleChange(event) {
        selectTable(Number(event.target.value));
        props.selectedTable(Number(event.target.value));
        if (Number(event.target.value) !== -1) {
            setSwitch(true);
        } else {
            setSwitch(false);
        }
    }

    return (
        <div id="table-scroll">
            <select style={{ minWidth: "20%", marginRight: "0.5rem", marginBottom: "0.5rem" }} onChange={handleChange}>
                    <option key={`table-null`} value={-1}>Не выбрано</option>
                    {props.teams.map(team => (
                        <option key={`team-${team.id}`} value={team.id}>{team.name}</option>
                    ))}
            </select>
            <table style={switcher ? { visibility: "visible"} : { visibility: "hidden" }} className="table table-dark table-bordered">
            <thead>         
                <tr>
                    <th style={{ verticalAlign: 'middle' }}>
                        Кто/Кому
                    </th>
                    {props.users.map((item) => (
                        item.teams.map((team) => (
                            team === table 
                            && <th style={thStyle} key={`th-${item.id}`}>
                                {item.name}
                            </th>
                        ))
                    ))}
                </tr>
            </thead>
            <tbody> 
                {props.users.map((column) => (
                    column.teams.map((teamI) => (    
                        teamI === table 
                        && <tr key={`tr-${column.id}`}>
                            <th style={thStyle} key={`th-${column.id}`}>
                                {column.name}
                            </th>
                            {props.users.map((row) => (
                                row.teams.map((teamO) => (    
                                    teamO === table 
                                    && (column.vacation === true || row.vacation === true 
                                    ? <td style={tdStyle} key={`td-${row.id}`}>Отпуск</td>
                                    : column.id === row.id
                                    ? <td style={{ color: 'red' }} key={`td-${row.id}`}>x</td>
                                    : <td key={`td-${row.id}`}>{row[column.id] ? row[column.id] : 0}</td>)
                                ))
                            ))}
                        </tr>
                    ))
                ))}
            </tbody>
            </table>
        </div>
    )
}
