const express = require('express');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config();
require('express-async-errors');
const routes = require('./routes/product');

//async errors
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

//middleware

app.use('/api/v1/products', routes)

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use(notFound);

app.use(errorHandler);


const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening on port ${port}`); })
    } catch (err) {
        console.log(err)
    }
}
start();