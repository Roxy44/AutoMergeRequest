import React from 'react'

const thStyle = {
    wordBreak: 'break-word',
};
/* 
Описать проверку на наличие записей в бд, интегрировать, если сущ.
*/
export default (props) => (
    <div id="table-scroll">
        <table className="table table-dark table-bordered">
        <thead>
            <tr>
                <th style={{ verticalAlign: 'middle' }}>Кто/Кому</th>
                {props.users.map((item) => (
                    <th style={thStyle} key={`th-${item.id}`}>
                        {item.name}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody> 
            {props.users.map((column) => (
                <tr key={`tr-${column.id}`}>
                    <th style={thStyle}>
                        {column.name}
                    </th>
                    {props.users.map((row) => (
                    column.id === row.id
                        ? <td style={{ color: 'red' }} key={`td-${row.id}`}>x</td>
                        : <td key={`td-${row.id}`}>{row[column.id] ? row[column.id] : 0}</td>
                    ))}
                </tr>
            ))}
        </tbody>
        </table>
    </div>
);
