var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var logger = require('morgan');
var session=require('express-session');
var passport = require('passport');
var mongoose=require('mongoose');
var http = require('http');

var index = require('./routes/index');
var sellerRouter = require('./routes/seller/index');
var memberRouter = require('./routes/member/index');

var app = express();

// mongoose.connect('mongodb://localhost/Thor');
mongoose.connect('mongodb://localhost:27017/db');
mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/member', memberRouter);
app.use('/seller', sellerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var httpServer = http.createServer(app);

app.set('port', process.env.PORT || 3000);
httpServer.listen(app.get('port'), function () {
    console.log('https 서버가 시작되었습니다. 포트 : ' + app.get('port'));
});

module.exports = app;
