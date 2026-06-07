const mongoose = require("mongoose")

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to db")

    } catch (error) {
        console.log("Error while connecting db", error)
        process.exit(1)
    }    
} 

module.exports = connectDb