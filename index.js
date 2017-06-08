const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');


const NameRoutes = require('./greet');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/greetings');
const nameRoutes = NameRoutes(models);
const app = express();

app.set("port", (process.env.PORT || 3002))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30}}));
app.use(flash()); // set up http session


app.get('/', nameRoutes.index);
app.get('/greeted', nameRoutes.greeted);
app.get('/counter/:user_id', nameRoutes.counter);
app.get('/clear', nameRoutes.clearHistory);

app.post('/', nameRoutes.index);
app.post('/clear', nameRoutes.clearHistory);


var port = app.get("port");

app.listen(port, function() {
    console.log('App started on port: ' + port)
});
