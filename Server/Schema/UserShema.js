const mongoose = require("mongoose");
const { Mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
    id: {type: Number, unique: true},
    name: {type: String},
    vacation: {type: Boolean}
});

const User = mongoose.model('Users', userSchema);

module.exports = { User }
