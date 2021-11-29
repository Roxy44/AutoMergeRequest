import React, { Component } from 'react'
import Table from './Table/Table'
import UserManagment from './Table/UserManagment'
import AddRequest from './Table/AddRequest'
import Vacation from './Table/Vacation'
import socket from './socket'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    addUser = (userName) => {
        let newId;
        if (this.state.users.length === 0) {
            newId = 0;
        } else {
            newId = this.state.users.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }
        axios.post('/addUser', { newId, userName, vacationStatus: false });
        this.setState({
            users: [...this.state.users, {id: newId, name: userName, vacation: false}]
        })
    }

    removeUser = (userName) => {
        axios.post('/removeUser', { userName });
        if (this.state.users.length !== 0) {
            const newList = this.state.users.filter(user => !(user.userName === userName));
            this.setState({
                users: newList
            })
        }
    }

    addRequest = (requestFromId, requestUserId) => {
        let requestId;
        if (this.state.users.length === 0) {
            requestId = 0;
        } else {
            requestId = this.state.users.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }
        axios.post('addRequest', { requestId, requestFromId, requestUserId });
        const newUsers = this.state.users.map(user => { 
            if (user.id === requestUserId) {
                let newUser = user;
                if (user[requestFromId]) {
                    newUser[requestFromId] = user[requestFromId] + 1;
                } else {
                    newUser[requestFromId] = 1;
                }
                return newUser;
            } 
            return user;
        })
        this.setState({
            users: newUsers
        })
    }

    setVacation = (id) => {
        const newUsers = this.state.users.map(user => {
            let newUser = user;
            if (user.id === Number(id)) {
                newUser.vacation = !user.vacation;
            } 
            return newUser;
        })
        this.setState({
            users: newUsers    
        })
    }

    render() {
        return (  
            <div className="container">
                <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Система Автоматических Мердж - Реквестов</h1>
                <UserManagment addUser={this.addUser} removeUser={this.removeUser}/> 
                <AddRequest addRequest={this.addRequest} users={this.state.users}/>
                { 
                this.state.users.length === 0 ?
                    <div style={{color: '#9C0000'}}>Пользователи еще не добавлены в систему.</div>
                    : <div> 
                        <Table users={this.state.users}/>
                        <Vacation setVacation={this.setVacation} users={this.state.users}/>
                    </div>
                }
            </div>
        );
    }
}

export default App;