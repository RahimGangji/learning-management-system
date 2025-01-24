require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./databaseConnection");
const UserAuth = require("./routes/user.auth");
const app = express();
const cookieParser = require("cookie-parser");
databaseConnection();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", UserAuth);
app.listen(process.env.PORT, () => console.log(`Server Has Been Started`));
