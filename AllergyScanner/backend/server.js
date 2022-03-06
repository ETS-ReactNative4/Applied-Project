// express
const express = require("express");
// allows you to separate secrets from your source code
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initializes dotenv file
dotenv.config();
// connects to database
connectDB();

// Initialises app
const app = express();
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get request 
app.get("/", (req, res) => {
    //sends the request
    res.send("API is running!");
})

app.use("/users", require("./routes/auth"));
app.use("/favourite", require("./routes/favourite"));
app.use("/products", require("./routes/product"));

const PORT = process.env.PORT || 5000

// listens to the port
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));