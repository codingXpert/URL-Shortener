import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoDb ${mongoose.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }  
}

export default connectDB();