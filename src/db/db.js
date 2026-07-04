import mongoose from "mongoose";
import config from "../config/config.js";
import chalk from "chalk";

const connectDB = async (req , res) => {
    try {
        const connectionInstance = await mongoose.connect(config.MONGODB_URI);
        console.log(chalk.bold.green(`DataBase Connected ! DB host At : ${connectionInstance.connection.host}`))
    } catch (e) {
        console.log(`DataBase Not Connected due to : ${e.message}`)
    }
}

export default connectDB ;