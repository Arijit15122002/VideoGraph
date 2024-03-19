// require("dotenv").config({path: '/.env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: '/env'
})

connectDB()







































//first & basic approach to connect the database and initializing express app in this same index.js file
// import express from "express";
// const app = express();
// ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//         app.on("error", (error) => {
//             console.log("Error: ", error);
//             throw error;
//         } )

//         app.listen(process.env.PORT, () => {
//             console.log("Server is listening at port number: ", process.env.PORT)
//         })

//     } catch (error) {
//         console.log("Error: "+error);
//     }
// })()