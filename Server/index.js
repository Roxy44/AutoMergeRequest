const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const ldapjs = require('ldapjs');

const { User } = require("./Schema/UserShema");
const { Request } = require("./Schema/RequestSchema");

const app = express();
const server = require('http').Server(app);
const PORT = config.get('serverPort');

/*const { Gitlab, Projects } = require('@gitbeaker/node');
const { ProjectsBundle } = require('gitlab');

const api = new Gitlab({
    host : 'https://gitlab.com',
    token: '3Asw-ZvG25ekVAbzS8F6'
});
const services = new ProjectsBundle({
    host : 'https://gitlab.com',
    token: '3Asw-ZvG25ekVAbzS8F6'
});*/

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
});

server.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Server started on port: ', PORT);
});

// mongodb
async function start() {
    
    await mongoose.connect(config.get("dbUrl"));

    /*let usersApi = await api.Users.all();
    api.Projects.all().then((projects) => {
        console.log(projects);
    });
    console.log(services.Projects.all());*/

    app.post('/addUser', (req, res) => {
        const {newId, userName, vacationStatus} = req.body;
        const user = new User({
            id: newId,
            name: userName,
            vacation: vacationStatus
        })
        user.save().then((user) => res.json(user))
        .catch((err) => res.send(err));
    });

    app.post('/removeUser', (req, res) => {
        const { userName } = req.body;
        User.findOneAndRemove({name: userName})
        .then((user) => console.log('user: ', user, " was removed"))
        .catch((err) => res.send(err));
    });

    app.post('/addRequest', (req, res) => {
        const {requestId, requestFromId, requestUserId} = req.body;
        Request.create({
            id: requestId, 
            request_from_id: requestFromId,
            request_user_id: requestUserId
        })
        .then((user) => res.json(user))
        .catch((err) => res.send(err)); 
        console.log('create one');
    });    
}

start();

// LDAP MICRAN
//var username = "", password = ""

/*function authUser(client, username, password) {
    let login = "uid=" + username + ",ou=People,dc=localnet,dc=micran";
    return new Promise((resolve, reject) => { 
        client.bind(login, password, (err) => {
            if (err) {
                reject(new Error("Authentication failed"));
            } else {
                resolve(client);
            }
        });
    });
}

let ldapClient;     

function connect() {
    return new Promise((resolve, reject) => {
        if (!ldapClient) {
            ldapClient = ldapjs.createClient({
                url: "ldap://ldap.micran.ru:390",
                reconnect: true
            });
            ldapClient.on('connect', (res) => {
                const user = getCredential();

                if (user) {
                    authUser(ldapClient, user.username, user.password); 
                }
                resolve(res);
            });
            ldapClient.on('connectError', (error) => {
                reject(error);
            });
        } else {
            reject(new Error('LDAP client already connected'));
        }
    });
}

connect()*/

    /*var opts = {
        OPT_REFERRALS: 0,
        OPT_PROTOCOL_VERSION: 3,
        login: "uid=" + username + ",ou=People,dc=localnet,dc=micran",
        filter: "uid=" + username,
        search_atr: ["sn", "cn", "mail", "employeeNumber", "entryUUID"],
    }*/
            /*client.search( base = "ou=People,dc=localnet,dc=micran", opts, controls = function(err, res) {
                if(err) {
                    console.log("search error: ", err);
                } else {
                    res.on('searchEntry', function(entry) {
                        console.log('entry: ' + JSON.stringify(entry.object));
                    });
                    res.on('searchReference', function(referral) {
                        console.log('referral: ' + referral.uris.join());
                    });
                    res.on('error', function(err) {
                        console.error('error: ' + err.message);
                    });
                    res.on('end', function(result) {
                        console.log('status: ' + result.status);
                    });
                } 
            });
        }
    });*/

// LDAP LOCALHOST
/*async function ldapStart(username, password) {
    var client = ldapjs.createClient({
        url: 'ldap://127.0.0.1:10389'
    });

    var opts = {
        filter: '(objectClass=*)',
        scope: 'sub',
        attributes: ['sn', 'cn']
    }

    client.bind(username, password, controls = function(err) {
        if(err) {
            console.log("connection error: ", err);
        } else {
            console.log("success");
            client.search( base = "ou=users,ou=system", opts, controls = function(err, res) {
                if(err) {
                    console.log("search error: ", err);
                } else {
                    res.on('searchEntry', function(entry) {
                        console.log('entry: ' + JSON.stringify(entry.object));
                    });
                    res.on('searchReference', function(referral) {
                        console.log('referral: ' + referral.uris.join());
                    });
                    res.on('error', function(err) {
                        console.error('error: ' + err.message);
                    });
                    res.on('end', function(result) {
                        console.log('status: ' + result.status);
                    });
                }  
            });
        }
    });

    server.listen(PORT, function() {
        console.log('Server started on port: ', PORT);
    });
}

ldapStart(username = "uid=admin,ou=system", password = "secret");*/