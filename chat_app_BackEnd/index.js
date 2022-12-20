const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()

app.use(cors());
app.use(express.json());

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Db Connect SuccessFull');
}).catch((error) => {
    console.log(error.message);
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})