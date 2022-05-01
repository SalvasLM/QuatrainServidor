var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


const users = require('./routes/users');
const roles = require('./routes/roles');
const noticias = require('./routes/noticias');
const eventos = require('./routes/eventos');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/users', users.getUsers);
app.get('/api/roles', roles.getRoles);
app.get('/api/noticias', noticias.getNoticias);
app.get('/api/eventos', eventos.getEventos);

app.get('/api/users/:id(\\d+)', users.getUserById);
app.get('/api/eventos/:id(\\d+)', eventos.getEventoById);
app.get('/api/noticias/:id(\\d+)', noticias.getNoticiaById);
app.get('/api/roles/:id(\\d+)', roles.getRoleById);

app.post('/api/users', users.createUser);

app.delete('/api/deleteUser/:id(\\d+)', users.deleteUser);




module.exports = app;