import mongoose from "mongoose"

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}