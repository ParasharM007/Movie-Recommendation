import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection:ConnectionObject={}
export default async function dbConnect():Promise<void> {
    try {
        if(connection.isConnected){
            console.log("Already connected to DB")
        }
        const db = await mongoose.connect(process.env.MONGODB_URI ||"",{})
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log("Db connection Error ",error)
        process.exit(1)
    }
    
}