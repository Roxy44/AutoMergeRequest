const express = require("express");
const mongoose = require("mongoose");
const { Mongoose, Schema } = require("mongoose");
const config = require("config");
const cors = require("cors");

const userSchema = new Schema({
    id: {type: Number, unique: true},
    name: {type: String},
    vacation: {type: Boolean}
})
const user = mongoose.model('Users', userSchema)

const requestSchema = new Schema({
    id: {type: Number, unique: true},
    request_user_id: {type: Number},
    request_from_id: {type: Number},
    count: {type: Number}
})
const request = mongoose.model('requests', requestSchema)

const app = express();
const server = require('http').Server(app);
const PORT = config.get('serverPort');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());

async function start() {
        await mongoose.connect(config.get("dbUrl"));

        app.post('/addUser', (req, res) => {
            const {newId, userName, vacationStatus} = req.body;
            user.create({
                id: newId,
                name: userName,
                vacation: vacationStatus
            })
            .then((user) => res.json(user))
            .catch((err) => res.send(err));
        });

        app.post('/removeUser', (req, res) => {
            const { userName } = req.body;
            user.findOneAndRemove({name: userName})
            .then((user) => console.log('user: ', user, " was removed"))
            .catch((err) => res.send(err));
        });

        app.post('/addRequest', (req, res) => {
            const {requestId, requestFromId, requestUserId} = req.body;
            
            /*request.find()
            .then((request) => res.json(request));*/

            /*if (request.find({ request_user_id: requestUserId, request_from_id: requestFromId })) {
                request.create({
                    id: requestId,
                    request_user_id: requestUserId, 
                    request_from_id: requestFromId,
                    count: "0"
                })
                .then((user) => res.json(user))
                .catch((err) => res.send(err)); 
                console.log('create one');
            }
            else {
                request.findOneAndUpdate({ request_user_id: requestUserId, request_from_id: requestFromId}, {
                    $inc: { count: 1 }
                })
                console.log('update one')
            }  */  
        });

        io.on('connection', (socket) => {
            console.log('user connected', socket.id);
        });

        server.listen(PORT, (err) => {
            if (err) {
                throw Error(err);
            }
            console.log('Server started on port: ', PORT);
        });
}

start();