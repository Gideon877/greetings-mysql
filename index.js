var express = require('express');
var app = express();
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
    console.log(occurences);
    res.send(occurences);
})


var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Greeting app listening at http://%s:%s', host, port);

});
