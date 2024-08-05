const connectToMongo = require("./mongodb"); // Correctly import the function
const express = require('express');

connectToMongo(); // Connect to MongoDB before starting the server

const app = express();
var cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

const authroutes=require("./routes/auth");
const addtocartroutes=require("./routes/addtocart");

app.use("/api/auth", authroutes);
app.use("/api/addtocart",addtocartroutes);

app.listen(port, () => {
    console.log(`Food-store app listening on http://localhost:${port}`)
});
