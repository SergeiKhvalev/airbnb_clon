import mongoose, { Schema, Document, Model } from "mongoose";
import {userModel} from "./models/user";


// Interface for user document
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

// Interface for user model (extends the UserDocument interface)
export interface UserModel extends Model<UserDocument> {}



//=================

//import mongoose, { Schema, Document, Model } from "mongoose";
//import {userModel} from "./models/user";

//
// // Interface for user document
// export interface UserDocument  {
//     name: string;
//     email: string;
//     password: string;
// }

// Interface for user model (extends the UserDocument interface)

