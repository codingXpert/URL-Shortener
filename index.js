import express from 'express';
import dotEnv from 'dotenv/config';
const app = express();
const PORT = 8000;
import db from './config/mongoose.js';


app.listen(PORT, (err) => {
    if(err){
        console.log("Error while running the server", err);
    }else{
        console.log("Server is running on port ::", PORT);
    }
});