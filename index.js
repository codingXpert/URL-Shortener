import express from 'express';
import dotEnv from 'dotenv/config';
import db from './config/mongoose.js';
import router from './routes/index.js';
const app = express();
const PORT = 8000;

//middlewares
app.use(express.json());
app.use("/api", router);


app.listen(PORT, (err) => {
    if(err){
        console.log("Error while running the server", err);
    }else{
        console.log("Server is running on port ::", PORT);
    }
});