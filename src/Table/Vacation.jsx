import React from 'react'

const styles = {
    width: '5%'
}

const tableScroll = {
    height: '350px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginTop: '2rem'
}

export default function Vacation(props) {
    
    function handlerChange(event) {
        props.setVacation(event.target.id)
    }
    
    return (
        <div style={tableScroll}>
            <table style={{textAlign: 'center'}} className="table table-bordered table-dark"> 
            <tbody> 
                <tr>
                    <th colSpan="3"><h3 style={ {textAlign: 'center'} }>Отпуск/Больничный</h3></th>
                </tr>
                {props.users.map(column => ( 
                <tr key={`tr-${column.id}`}>
                    <th style={styles}>{column.id + 1}</th>        
                    <td style={{wordBreak: 'break-word'}}>{column.name}</td>
                    <td style={styles}><input type="checkbox" id={column.id} onChange={handlerChange}></input></td>
                </tr>
                ))}   
            </tbody>
            </table>
        </div>
    )
}