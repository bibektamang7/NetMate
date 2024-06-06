import { connectDB } from "./db";
import dotenv from "dotenv"
import app from "./app"


dotenv.config({
    path: "./.env",
})
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