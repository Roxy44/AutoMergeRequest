import React, { Component } from 'react'
import Table from '../Table/Table'
import UserManagment from '../Table/UserManagment'
import AddUserToCommand from './Component/AddUserToCommand'
import AddRequest from '../Table/AddRequest'
import Vacation from '../Table/Vacation'
//import socket from '../socket'
//import axios from 'axios'
import AddCommand from './Component/AddCommand'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
        users: [
            {id: 0, name: "vanya", vacation: false, teams: []},
            {id: 1, name: "petya", vacation: false, teams: []},
            {id: 2, name: "illya", vacation: true, teams: []}
        ], 
        requests: [],
        teams: [
            {id: 0, name: "zxc"},
            {id: 1, name: "scamers"}
        ],
        table: []
        };
    };

    addUser = (userName) => {
        let newId;
        if (this.state.users.length === 0) {
            newId = 0;
        } else {
            newId = this.state.users.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }

        //axios.post('/addUser', { newId, userName, vacationStatus: false });

        this.setState({
            users: [...this.state.users, {id: newId, name: userName, vacation: false, teams: []}]
        });
    };

    removeUser = (userName) => {
        if (this.state.users.length !== 0) {
            const newList = this.state.users.filter(user => !(user.name === userName));
            this.setState({
                users: newList
            });
        } 

        //axios.post('/removeUser', { userName });
    };

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

        //axios.post('addRequest', { requestId, requestFromId, requestUserId });

        this.setState({
            users: newUsers
        })
    };

    addTeam = (teamName) => {
        let newId;
        if (this.state.teams.length === 0) {
            newId = 0;
        } else {
            newId = this.state.teams.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
        }
        this.setState({
            teams: [...this.state.teams, {id: newId, name: teamName}]
        });    
    };

    addToTeam = (userId, teamId) => {
        const teamUser = this.state.users.map(user => {
            let userInTeam = user;
            if (user.id === Number(userId)) {
                userInTeam.teams = [...user.teams.filter(team => (team !== Number(teamId))), Number(teamId)];
            }
            return userInTeam;
        })
        this.setState({
            users: teamUser
        });
    };

    setVacation = (id) => {
        const newUsers = this.state.users.map(user => {
            let newUser = user;
            if (user.id === Number(id)) {
                newUser.vacation = !user.vacation;
            } 
            return newUser;
        });
        this.setState({
            users: newUsers    
        });
    };

    selectedTable = (tableName) => {
        this.setState({ 
            table: tableName 
        });
    };

    render() {
        return (  
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Система Автоматических Мердж - Реквестов</h1>
                    </div>
                </div> 
                {
                this.props.userRole === 0 ?
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <AddCommand addTeam={this.addTeam}/>
                                </div>
                                <div className="row">  
                                    <AddUserToCommand addToTeam={this.addToTeam} users={this.state.users} teams={this.state.teams}/>
                                </div>
                                <div className="row">  
                                        <UserManagment addUser={this.addUser} removeUser={this.removeUser}/>
                                </div>
                            </div>
                            <div className="col-4">
                                <Vacation setVacation={this.setVacation} users={this.state.users}/>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-12">
                                <Table users={this.state.users} teams={this.state.teams} selectedTable={this.selectedTable}/>
                            </div>
                        </div>
                    </div>
                    : 
                    this.props.userRole === 1 ?
                    <div className="container">
                        <div className="row"> 
                            <div className="col-12">
                                <AddUserToCommand addToTeam={this.addToTeam} users={this.state.users} teams={this.state.teams}/>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-12">
                                <AddRequest addRequest={this.addRequest} users={this.state.users} table={this.state.table}/>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-12">
                                <Table users={this.state.users} teams={this.state.teams} selectedTable={this.selectedTable}/>
                            </div>
                        </div>        
                    </div>
                    :
                    this.state.users.length === 0 ?
                    <div style={{color: 'black'}}>!Пользователи еще не добавлены в систему!</div>
                    : 
                    <div className="container">
                        <div className="row"> 
                            <div className="col-12">
                                <AddRequest addRequest={this.addRequest} users={this.state.users} table={this.state.table}/>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-12">
                                <Table users={this.state.users} teams={this.state.teams} selectedTable={this.selectedTable}/>
                            </div>
                        </div>     
                    </div>
                }
            </div>
        );
    }
}

export default Request;