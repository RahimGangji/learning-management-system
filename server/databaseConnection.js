const mongoose = require("mongoose");
require("dotenv").config();
const databaseConnection = () => {
    mongoose
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log("Database Connection Successful");
        })
        .catch((err) => {
            console.log("Database Connection Failed");
        });
};
module.exports = databaseConnection;
