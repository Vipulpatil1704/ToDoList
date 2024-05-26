const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow these HTTP methods
}));
app.use('/api', require("./Routes/endpoints"));
app.listen(5000, () => "server is running on port 5000");