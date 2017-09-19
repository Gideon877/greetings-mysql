module.exports = function(models) {

    const index = function(req, res, done) {
        var outputGreeting = "";
        var language = req.body.language;
        var counterMsg = "";



        var nameData = {
            name: req.body.name
        }
        if (!nameData || !nameData.name) {
            req.flash('error', 'Name should not be blank');
            res.render('index')
        } else {
            if (!language) {
                req.flash("error", "Please select language");
                res.render('index');
            } else {
                models.Name.findOne({
                    name: req.body.name
                }, function(err, theName) {

                    if (err) {
                        return done(err)
                    }

                    var otherName = req.body.name;
                    var myName = otherName.toLowerCase();

                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                    var name = capitalizeFirstLetter(myName)
                    console.log(name);

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

                            counterMsg = "Names greeted for this session: " + result.length;
                            var data = {
                                greeting: outputGreeting,
                                counts: counterMsg
                            };

                            res.render('index', data);
                        });
                    };

                    if (!theName) {



                        models.Name.create({
                            name: name,
                            greetCounter: 1
                        }, function(err, result) {
                            if (err) {
                                return done(err);
                            }
                            models.Name.find({
                                name: name
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
                                    };

                                    counterMsg = "Names greeted for this session: " + result.length;
                                    var data = {
                                        greeting: outputGreeting,
                                        counts: counterMsg
                                    };
                                    res.render('index', data);
                                });
                            });
                        });
                    };
                });
            };
        };
    };

    const greeted = function(req, res, done) {

        models.Name.find({},  function(err,  result) {

            if (err) {
                return done(err);
            }

            console.log('Greeted', result);

            var data_2 = {
                namesGreeted: result
            };
            res.render('greeted', data_2);
        });
    };

    const counter = function(req, res, done) {

        var user_id = req.params.user_id;

        models.Name.findOne({
            _id: user_id
        }, function(err, result) {

            if (err) {
                done(err)
            } 
            var output = result.name + " have been greeted " + result.greetCounter + ' time(s).';

            var data_3 = {
                countMsg: output
            }
            res.render('counter', data_3);
        });
    }

    const clearHistory = function(req, res, done) {
        models.Name.remove({}, function(err, result) {
            if (err) {
                done(err)
            }

            res.render('index');

        });
    }

    return {
        index,
        greeted,
        counter,
        clearHistory
    };
};
