const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const NameRoutes = require('./greet');
const Models = require('./models');
const models = Models('mongodb://localhost/greet-tests');
const nameRoutes = NameRoutes(models);
const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    res.send('Welcome to the Greeting Web APP. This a simple Web Application using ExpressJS with a route that allows you to greet different people using a HTTP GET route.');
})

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30}}));
app.use(flash()); // set up http session

app.get('/greetings/index', nameRoutes.greetScreen);
app.get('/greetings', nameRoutes.index);
app.post('/greetings', nameRoutes.index);


const port = 3002;

app.listen(port, function() {
    console.log('App started on port: ' + port)
});
