module.exports = function(models) {
    const namesGreeted = [];
    const index = function(req, res, done) {
        var outputGreeting = "";
        var language = req.body.language;
        var counterMsg = "";

        var nameData = {
            name: req.body.name
        }
        if (!nameData || !nameData.name) {
            req.flash('error', 'Name should not be blank');
            res.render('greetings/index')
        } else {
            if (!language) {
                req.flash("error", "Please select language");
                res.render('greetings/index');
            } else {
                models.Name.findOne({
                    name: req.body.name
                }, function(err, theName) {

                    if (err) {
                        return done(err)
                    }

                    if (theName) {
                        theName.greetCounter = theName.greetCounter + 1;

                        if (language == 'english') {
                            outputGreeting = "Hello, " + theName.name;
                        } else if (language == 'setswana') {
                            outputGreeting = "Dumela, " + theName.name;
                        } else if (language == 'zulu') {
                            outputGreeting = "Sawubona, " + theName.name;
                        }

                        theName
                            .save(function(err, result) {
                                if (err) {
                                    return done(err)
                                }
                            });

                        models.Name.find({},  function(err,  result) { 
                            if (err) {
                                done(err)
                            } 
                            var counterNmbr = result.length;
                            // console.log("Counter: " + counterNmbr);

                            counterMsg = "Names greeted for this session: " + result.length;
                            var data = {
                                greeting: outputGreeting,
                                counts: counterMsg
                            };

                            res.render('greetings/index', data);
                        });
                    }

                    if (!theName) {
                        models.Name.create({
                            name: req.body.name,
                            greetCounter: 1
                        }, function(err, result) {
                            if (err) {
                                return done(err);
                            }
                            models.Name.find({
                                name: req.body.name
                            }, function(err, results) {
                                if (err) {
                                    return done(err);
                                }

                                if (language == 'english') {
                                    outputGreeting = "Hello, " + result.name;
                                } else if (language == 'setswana') {
                                    outputGreeting = "Dumela, " + result.name;
                                } else if (language == 'zulu') {
                                    outputGreeting = "Sawubona, " + result.name;
                                }
                                models.Name.find({},  function(err,  result) { 
                                    if (err) {
                                        done(err)
                                    } 
                                    var counterNmbr = result.length;
                                    console.log("Counter: " + counterNmbr);

                                    counterMsg = "Names greeted for this session: " + result.length;
                                    var data = {
                                        greeting: outputGreeting,
                                        counts: counterMsg
                                    };

                                    res.render('greetings/index', data);
                                });

                            });

                        })
                    }

                });

            }

        }
    }

    const greetScreen = function(req, res) {
        res.render('greetings/index'); //greetings folder
    }

    return {
        index,
        greetScreen
    }
};
