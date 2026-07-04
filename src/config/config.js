import chalk from "chalk";
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGODB_URI) {
    console.log(chalk.bold.red("MONGODB_URI is not defined in enviournment variables !"))
};

if(!process.env.JWT_SECRET) {
    console.log(chalk.bold.red("JWT_SECRET is not defined in enviournment variables !"))
};

const config = {
    MONGODB_URI : process.env.MONGODB_URI ,
    JWT_SECRET : process.env.JWT_SECRET
};

export default config ;