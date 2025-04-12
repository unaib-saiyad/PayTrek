const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
require("dotenv").config();
connectToMongo();
const app = express()
const corsOptions = {
    origin: process.env.FRONTEND_URL // frontend URI (ReactJS)
}
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors(corsOptions)); 

app.use('/api', require('./routes/index.js'));

app.listen(port, () => {
  console.log(`PayTrek app listening on port ${port}`)
}) 