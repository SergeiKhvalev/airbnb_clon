//import mongoose, {Schema} from "mongoose";
import {UserDocument} from "../interfaces";
import {Schema} from "mongoose";
const mongoose = require('mongoose');




const UserSchema= new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
});

export const UserModel = mongoose.model('users', UserSchema);

// export default UserModel;

//module.exports = UserModel;

