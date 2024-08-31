require("dotenv").config();
const cors = require("cors");

//express app
const express = require("express");
const app = express();

//cors
app.use(
    cors({
        origin: "*",
    })
);

//DB
const connectDB = require("./db/connect");

//Routes import
const auth = require("./routes/authRoutes");
const estimation = require("./routes/estimationRoutes");

//middleware import
const tokenMiddleware = require("./middleware/tokenMiddleware");

//middleware , routes usage
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v1/estimation", estimation);

port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is live on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
