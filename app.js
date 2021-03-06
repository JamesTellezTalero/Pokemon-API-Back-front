const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');

const indexRouter = require('./routes/index');
const galeryRouter = require('./routes/galery');

const app = express();

const port = 8080;

app.listen(port, () => {
    console.log(`Listen on port http://localhost:${port}`);
});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/galery', galeryRouter);

app.use(express.static('public'));
app.use('/static', express.static('public'));

app.use(express.static('files'));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });


app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/galery', async(req, res, next) => {
        console.log("'/galery' call");
        try {
            const res = await axios.get("https://pokeapi.co/api/v2/");
            console.log(res);
            res.json(data);
        } catch (err) {
            next(err)
        }
    })
    // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;