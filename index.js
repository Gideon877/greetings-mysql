'use strict'
var express = require('express'),
    flash = require('express-flash'),
    session = require('express-session'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    routes = require('./routes/greet');


const app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '1',
      port: 3306,
      database: 'greetings'
};

app.set("port", (process.env.PORT || 3002));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30}}));
app.use(flash()); // set up http session

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/greeted', routes.greeted);
app.get('/counter/:user_id', routes.counter);
app.get('/clear', routes.clearHistory);

app.post('/', routes.index);
// app.post('/clear', routes.clearHistory);

app.use(errorHandler);
var port = process.env.GREET_PORT_NR || 3000;

app.listen(port, function() {
    console.log('App started on port: ' + port)
});
