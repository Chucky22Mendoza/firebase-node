const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();

//settings
app.set('port', process.env.PORT || 80);
app.set('firebase_token', process.env.FIREBASE_TOKEN);
app.set('db_url', process.env.DB_URL);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;