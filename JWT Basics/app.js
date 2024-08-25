require('dotenv').config();
require('express-async-errors')

const express = require('express');
const app = express();
const routes=require('./routes/main');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const connectDB = require('./db/connect');

//midddleware
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());

app.use(routes)
app.use(errorHandler)
app.use(notFound)

const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening on port ${port}`); })
    } catch (err) {
        console.log(err)
    }
}

start();