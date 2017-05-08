var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
var handlebars = require('handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//     res.render('home');
// });
//
// app.listen(3000);

app.use(express.static('public'))
var namesGreeted = [];

app.get('/greetings/:name', function(req, res) {
    var name = req.params.name;
    res.send("Hello, " + name);
    namesGreeted.push(name);

});

app.get('/greeted/', function(req, res) {
    console.log(namesGreeted)
    res.send(namesGreeted);

});
app.get('/counter/:checkName', function(req, res) {

    var checkName = req.params.checkName;
    var occurences = {};
    for (var index = 0; index < namesGreeted.length; index++) {
        var value = namesGreeted[index];
        occurences[value] = occurences[value] ? occurences[value] + 1 : 1;
    }
    console.log(occurences[checkName]);
    res.sendStatus(checkName + " is greeted " + occurences[checkName] + " time(s)");
})


var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Greeting app listening at http://%s:%s', host, port);

});
