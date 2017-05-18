module.exports = function() {

    const namesGreeted = [];
    const index = function(req, res) {
        var outputGreeting = "";

        var userName = req.body.name;
        var language = req.body.language;

        if (userName) {
            if (language) {
                if (namesGreeted[userName] === undefined){
                    namesGreeted[userName] = 1;
                } else if (namesGreeted[userName] !== undefined) {
                    namesGreeted[userName] += 1
                }
                var counts = userName + " have been greeted " + namesGreeted[userName]+ " time(s).";

                if (language == 'english') {
                    outputGreeting = "Hello, " + userName + ".";

                } else if (language == 'setswana') {
                    outputGreeting = "Dumela, " + userName + ".";

                } else if (language == 'zulu') {
                    outputGreeting = "Sawubona, " + userName + ".";

                }

            } else {
                req.flash("error", "Please select language");
            }

            var data = {
                greeting: outputGreeting,
                counts
            };

            res.render('greetings/index', data);
        }
        else {
            req.flash("error", "Name should not be blank");
            res.render('greetings/index');
        };

    };

    const greetScreen = function(req, res) {
        res.render('greetings/index'); //greetings folder
    }

    return {
        index,
        greetScreen
    }
}
