const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const middlewares = require('./middlewares')
const mongoose = require('mongoose');
const logs = require('./api/logs');
require('dotenv').config();

mongoose.connect('mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())

app.get('/', (req,res) => {
    res.json({
        message: 'Hello World',
    })
})

app.use('/api/logs', logs);

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening at 5000');
})