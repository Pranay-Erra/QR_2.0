// import { MongoClient } from "mongodb";

// let db;

// async function connectToDB(cb) {
//     try {
//         const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/?retryWrites=true&w=majority";
//         const client = new MongoClient(url, {
//             useNewUrlParser: true, // Ensures using the latest MongoDB URL parser
//             useUnifiedTopology: true, // Helps in handling server discovery and monitoring
//         });
        
//         await client.connect();
//         console.log("MongoDB connected successfully!");

//         db = client.db("QR_Code");
        
//         // Only call the callback after a successful connection
//         if (cb) cb();

//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // Exit the process if the database connection fails
//     }
// }

// export { db, connectToDB };
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const connectToDB = async (cb) => {
    try {
        const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/QR_Code?retryWrites=true&w=majority";
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Adjust the timeout value if needed
        };

        await mongoose.connect(url, options);
        console.log("Connected to MongoDB");

        cb(); // Call the callback once the connection is successful
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

export { connectToDB };
