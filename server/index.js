require("dotenv").config();
const express = require("express");
const databaseConnection = require("./databaseConnection");
const app = express();
databaseConnection();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(process.env.PORT, () => console.log(`Server Has Been Started`));
