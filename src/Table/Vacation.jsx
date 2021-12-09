import React, { useState } from 'react'
import './Table.css'

const styles = {
    width: '5%'
}

export default function Vacation(props) {
    
    const [visibleStatus, setVisibility] = useState("hidden");
    
    function handlerChange(event) {
        props.setVacation(event.target.id)
    }
    
    function onClick(event) {
        if (visibleStatus === "hidden") {
            setVisibility("visible"); 
        } else {
            setVisibility("hidden");
        }
    }

    return (
        <div className="vacation">
            <button style={{ marginBottom: "0.5rem" }} onClick={onClick}>Отпуска</button>
            <div style={{ visibility: visibleStatus }} id="vacation-scroll">
                <table className="table table-bordered table-dark"> 
                <tbody> 
                    {props.users.map(column => ( 
                    <tr key={`tr-${column.id}`}>
                        <th style={styles}>{column.id + 1}</th>        
                        <td style={{ width: "10%", wordBreak: 'break-word' }}>{column.name}</td>
                        <td style={styles}><input type="checkbox" checked={(column.vacation === true) && true} id={column.id} onChange={handlerChange}></input></td>
                    </tr>
                    ))}   
                </tbody>
                </table>
            </div>
        </div>
    )
}