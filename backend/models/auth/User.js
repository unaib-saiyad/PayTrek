const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: function () { return this.username; }
    },
    lastName: {
        type: String,
        default: ""
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    },
  });
  const User = mongoose.model('user', UserSchema);
  User.createIndexes();
  module.exports = User;