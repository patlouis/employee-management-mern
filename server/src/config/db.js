import mongoose from 'mongoose';
import dns from "node:dns/promises";

export const connectDB = async () => {
    try {
        dns.setServers(["1.1.1.1", "8.8.8.8"]);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
