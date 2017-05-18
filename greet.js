module.exports = function() {

    const nameList = [];
    const index = function(req, res) {
        var outputGreeting = "";
        var userName = req.body.name;
        var language = req.body.language;

        if (userName) {
            if (language) {
                if (language == 'english') {
                    outputGreeting = "Hello, " + userName + ".";

                } else if (language == 'setswana') {
                    outputGreeting = "Dumela, " + userName + ".";

                } else if (language == 'zulu') {
                    outputGreeting = "Sawubona, " + userName + ".";

                }
            } else {
                outputGreeting = "Please select language"
            }

            var data = {
                greeting: outputGreeting
            };
            res.render('greetings/index', data);
        } else {
            res.render('greetings/index');
        };
    };

    const greetScreen = function(req, res) {
        res.render('greetings/index'); //greetings folder
    }

    // const greet = function(req, res) {
    //     nameList.push(name);
    //     res.redirect('/greetings');
    // }

    return {
        index,
        greetScreen
    }
}
