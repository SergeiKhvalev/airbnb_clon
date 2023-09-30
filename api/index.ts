import express, {Request, Response} from 'express';
import cors from 'cors';
const app = express();
const json = express.json();
import mongoose from 'mongoose';
import 'dotenv/config'


const cors_policy = cors({
                                    credentials:true,
                                    origin:'http://localhost:5173' // we allow fron-end app to communicate with current backend app
                                })

//mongoose.connect(process.env.MONGO_CONNECTION_URL);
if (process.env.MONGO_CONNECTION_URL) {
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
} else {
    console.error("MONGO_CONNECTION_URL is not defined in the environment variables.");
}


app.use(cors_policy, json)
app.get('/test', (req: Request, res: Response)=>{

    res.json('test ok')
})



app.post("/register",(req: Request, res: Response) =>{
    console.log(req.body)
    const {name, email, password} = req.body;

    res.json({name, email, password});

})

app.listen(4000, ()=> console.log("Server listening on port 40000"))