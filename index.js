const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const NameRoutes = require('./greet');
const nameRoutes = NameRoutes();
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

app.get('/greetings', nameRoutes.index);
app.get('/greetings/index', nameRoutes.greetScreen);
app.post('/greetings', nameRoutes.index);


const port = 3002;

app.listen(port, function() {
    console.log('App started on port: ' + port)
});
