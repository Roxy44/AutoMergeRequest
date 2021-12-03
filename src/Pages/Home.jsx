import React, { Component } from 'react'
import Table from '../Table/Table'
import UserManagment from '../Table/UserManagment'
import AddUserToCommand from './Component/AddUserToCommand'
import AddRequest from '../Table/AddRequest'
import Vacation from '../Table/Vacation'
import socket from '../socket'
import axios from 'axios'


class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [
            {id: 0, name: "vanya", vacation: false},
            {id: 1, name: "petya", vacation: false},
            {id: 2, name: "illya", vacation: true}
        ], requests: []};
    }

    addUser = (userName) => {
        console.log("props: ", this.props.userRole);
        let newId;
        if (this.state.users.length === 0) {
            newId = 0;
        } else {
            newId = this.state.users.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }

        axios.post('/addUser', { newId, userName, vacationStatus: false });

        this.setState({
            users: [...this.state.users, {id: newId, name: userName, vacation: false}]
        });
    }

    removeUser = (userName) => {
        if (this.state.users.length !== 0) {
            const newList = this.state.users.filter(user => !(user.name === userName));
            this.setState({
                users: newList
            });
        } 

        axios.post('/removeUser', { userName });
    }

    addRequest = (requestFromId, requestUserId) => {
        let requestId;
        if (this.state.requests.length === 0) {
            requestId = 0;
        } else {
            requestId = this.state.requests.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }
        this.setState({
            requests: [...this.state.requests, {id: requestId, request_From: requestFromId, request_User: requestUserId}]
        });

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

        axios.post('addRequest', { requestId, requestFromId, requestUserId });

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
                {
                this.props.userRole === 0 ? 
                    <div>
                        <AddUserToCommand users={this.state.users}/>
                        <UserManagment addUser={this.addUser} removeUser={this.removeUser}/>
                        <Table users={this.state.users}/>
                        <Vacation setVacation={this.setVacation} users={this.state.users}/> 
                    </div>
                    : 
                    this.props.userRole === 1 ?
                        <div>
                            <AddUserToCommand />
                            <AddRequest addRequest={this.addRequest} users={this.state.users}/>
                            <Table users={this.state.users}/>
                        </div>
                        :
                        this.state.users.length === 0 ?
                            <div style={{color: 'black'}}>!Пользователи еще не добавлены в систему!</div>
                            : 
                            <div>
                                <AddRequest addRequest={this.addRequest} users={this.state.users}/>
                                <Table users={this.state.users}/>
                            </div>
                }
            </div>
        );
    }
}

export default Request;