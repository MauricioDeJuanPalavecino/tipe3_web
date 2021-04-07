const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { json } = require('body-parser');
const PassportLocal = require('passport-local').Strategy;


//settings
app.set('port', process.env.PORT | 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

//mildwares
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//session



//routes
app.use(require('./routes/index.js'));
app.use(require('./routes/consulta.js'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'), 'conected');
});