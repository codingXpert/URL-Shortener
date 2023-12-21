import mongoose from 'mongoose';

const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortedUrl:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const URL = mongoose.model("URL",urlSchema);
export default URL;