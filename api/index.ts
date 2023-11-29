import express, {Request, Response} from 'express';
import cors from 'cors';
const app = express();
const mongoose = require("mongoose");
import 'dotenv/config'
const User = require('./models/user');
import bcryptjs from 'bcryptjs'; // package to encrypt passwords
import jwt, {JwtPayload} from "jsonwebtoken"; // package to create webtoken
import cookieParser from 'cookie-parser';
import {UserModel} from "./models/user";
const imageDownloader = require('image-downloader');




const bcryptSalt = bcryptjs.genSaltSync(10); /*In the bcryptjs library, the genSalt() function is used to generate a salt that can be used for hashing passwords. Salting is a crucial aspect of password hashing, adding additional randomness to each hashed password. This helps enhance security by preventing attackers from using precomputed tables (rainbow tables) for common passwords.*/
const jwtSecret: string = "addasdsdspgfkg"; // secret wich we use to create token


//mongoose.connect(process.env.MONGO_CONNECTION_URL);
if (process.env.MONGO_CONNECTION_URL) {
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
} else {
    console.error("MONGO_CONNECTION_URL is not defined in the environment variables.");
}

app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
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
    const userDoc = await UserModel.findOne({email}); /*In Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js, the findOne() function is used to query a MongoDB collection and retrieve a single document that matches the specified criteria. This function is particularly useful when you want to find one document based on certain conditions.
*/
    //console.log(userDoc)
    if(userDoc){// if we found in DB doc with provided email. => check if password the same

            const isPassOk = bcryptjs.compareSync(password, userDoc.password)// because need unencrypted
        if(isPassOk){
            jwt.sign({ // token creation. For token creation token using user`s info
                email:userDoc.email,
                id:userDoc._id,

            }, jwtSecret, {}, (err, token) =>{
                if(err)
                    throw err;
                    res.cookie('token', token).json(userDoc);// If error not occure we responde with token
            });

        } else{
            res.status(422).json("pass not ok");
    }
}
    else {
        res.status(422).json("not found");
    }
})

app.get('/profile', (req: Request, res: Response) => {
    const{token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData: any )=> { // to decrypt token, which has encrypted info (email, id, name), which come from encryption within login endpoint
            if(err) throw err;
            const {name, email, _id} = await UserModel.findById(userData.id)
            res.json({name, email, _id});
        })
    }else {
        res.json(null);
    }
})


app.post('/logout', (req: Request, res: Response) => {
    res.cookie("token", "").json(true); // in order to logout we send cookie with empty string

})

app.post('/upload-by-link',  (req: Request, res: Response) =>{
    const {link} = req.body;
    console.log(typeof link[0]);
    const newName = "photo"+Date.now() +'.jpg';
    console.log(__dirname+"\\uploads")

   const options = {
        url: link[0],
        dest: __dirname + "\\uploads"+ newName,     // will be saved to /path/to/dest/photo.jpg
    };

    imageDownloader.image(options)
        .then(({ filename }: any)=> {
            console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
        })
        .catch((err: Error) => console.error(err));


    // await imageDownloader.image({ // we use image-downloader library
    //     url: link,
    //     dest: __dirname + "api/uploads"+ newName,
    // })
    res.json(newName);

})



app.listen(4000, ()=> console.log("Server listening on port 4000"));