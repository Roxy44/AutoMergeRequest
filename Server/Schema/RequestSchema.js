const mongoose = require("mongoose");
const { Mongoose, Schema } = require("mongoose");

const requestSchema = new Schema({
    id: {type: Number, unique: true},
    request_from_id: {type: Number},
    request_user_id: {type: Number},
});

const Request = mongoose.model('requests', requestSchema);

module.exports = { Request }

