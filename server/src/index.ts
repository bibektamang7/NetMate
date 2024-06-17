import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
    })
import { connectDB } from "./db";
import app from "./app"
connectDB()


    .then(() => {
        const port = process.env.PORT || 6000;
        app.listen(port, () => {
            console.log(`Application is running at port ${port}`);
        })
    })
    .catch((err) => {
        console.log("Something went wrong while connecting MONGODB");
    })