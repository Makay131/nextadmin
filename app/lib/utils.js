import mongoose from "mongoose";

export const connectToDatabase = async () => {
    const connection = {}

    try {
        //we need to check if we are connected first to not connect 1000+ times
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
      } catch (error) {
        throw new Error(error);
      }
}