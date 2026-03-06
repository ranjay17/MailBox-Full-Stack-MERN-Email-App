import mongoose from "mongoose";

const db = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Error in connecting to mongoDB")
    }
}
export default db;