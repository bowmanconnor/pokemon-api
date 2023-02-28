import mongoose from "mongoose";
import * as dotenv from 'dotenv';


export const connectDB = async (uri: string = undefined) => {
    if (uri == undefined) {
        // Load environment variables
        dotenv.config();
        uri = process.env.MONGO_URI
    }

    // Connect to database
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri)
    console.log('Connected to MongoDB');
}

export const disconnectDB = async () => {
    // Disonnect to database
    await mongoose.disconnect()
    console.log('Disconnected to MongoDB');
}