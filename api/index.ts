import express, {Request, Response} from 'express';
import cors from 'cors';
const app = express();
const json = express.json();
import mongoose from 'mongoose';
import 'dotenv/config'
const User = require('./models/user');
import  {userModel} from './models/user';
import bcryptjs from 'bcryptjs'; // package to encrypt passwords
import jwt from "jsonwebtoken"; // package to create webtoken
import cookieParser from 'cookie-parser';
import { UserDocument} from "./interfaces";




const bcryptSalt = bcryptjs.genSaltSync(10); /*In the bcryptjs library, the genSalt() function is used to generate a salt that can be used for hashing passwords. Salting is a crucial aspect of password hashing, adding additional randomness to each hashed password. This helps enhance security by preventing attackers from using precomputed tables (rainbow tables) for common passwords.*/
const jwtSecret: string = "addasdsdspgfkg"; // secret wich we use to create token



// const cors_policy = cors({
//                                     credentials:true,
//                                     origin:'http://127.0.0.1:5173' // we allow front-end app to communicate with current backend app
//                                 })

//mongoose.connect(process.env.MONGO_CONNECTION_URL);
if (process.env.MONGO_CONNECTION_URL) {
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
} else {
    console.error("MONGO_CONNECTION_URL is not defined in the environment variables.");
}

app.use(cookieParser());
app.use(json);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.get('/test', (req: Request, res: Response)=>{
    res.json('test ok')
})

//endpoint to post credentials of new user in mongoDB
app.post("/register",async (req: Request, res: Response) =>{
   // console.log(req.body)
    const {name, email, password} = req.body;
    try{
        // encrypt first, to hide password, use bcyptjs library
        const userDoc = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(password, bcryptSalt)
        })
        res.json({userDoc});
    }
    catch(e){
        res.status(422).json(e)
    }
})
// end point that check if given from UI credentials are exist in DB
app.post('/login', async (req: Request, res: Response) => {
    const {email, password} = req.body;
    // we looking for if the user with given from axios post request email and password exist in DB
    const userDoc = await userModel.findOne({email: email}); /*In Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js, the findOne() function is used to query a MongoDB collection and retrieve a single document that matches the specified criteria. This function is particularly useful when you want to find one document based on certain conditions.
*/
    if(userDoc){// if we found in DB doc with provided email. => check if password the same
        const isPassOk = bcryptjs.compareSync(password, userDoc.password)// because need unencrypted
        if(isPassOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                name:userDoc.name
            }, jwtSecret, {}, (err, token) =>{
                if(err){
                    throw err;
                }
                else {
                    res.cookie('token', token).json(userDoc);
                }
            }); // create token which has some user info (email and _id from DB)

        } else{
            res.status(422).json("pass not ok");
    }
}
    else {
        res.json("not found");
    }
})

app.get('/profile', (req: Request, res: Response) => {
    const{token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user)=> {
            if(err) throw err;
            res.json(user);
        })
    }else {
        res.json(null);
    }
})

app.listen(4000, ()=> console.log("Server listening on port 40000"));