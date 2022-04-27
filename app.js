var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const users = require('./routes/users');
const roles = require('./routes/roles');
const noticias = require('./routes/noticias');
const eventos = require('./routes/eventos');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/users', users.getUsers);
app.get('/api/roles', roles.getRoles);
app.get('/api/noticias', noticias.getNoticias);
app.get('/api/eventos', eventos.getEventos);




module.exports = app;