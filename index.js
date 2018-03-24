const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRouter = require('./routers/express/user');
const bookingRouter = require('./routers/express/booking');
const lineRouter = require('./routers/express/line');
const orderRouter = require('./routers/express/order');
const bonusRouter = require('./routers/express/bonus');
const companyRouter = require('./routers/express/company');
const ulinkFileRouter = require('./routers/express/ulink-file');
const notificationRouter = require('./routers/express/notification');

const PORT = process.env.PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/build', express.static('build'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.json({ message: 'This is a API / Webhook Server for Ulink Bot.' }));

/**
 * A webhook for ChatBot
 */
app.use('/line', lineRouter);

/**
 * Controllers
 */
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/booking', bookingRouter);
app.use('/company', companyRouter);
app.use('/bonus', bonusRouter);
app.use('/ulink-file', ulinkFileRouter);
app.use('/notification', notificationRouter);

app.get('/app*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

process.on('warning', console.log);
