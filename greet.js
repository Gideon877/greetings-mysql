module.exports = function(models) {
    const namesGreeted = [];

    const index = function(req, res, done) {
        var outputGreeting = "";
        var language = req.body.language;

        var nameData = {
            name: req.body.name
        }
        if (!nameData || !nameData.name) {
            req.flash('error', 'Name should not be blank');
            res.render('greetings/index')
        }
        else {
            if (!language) {
                req.flash("error", "Please select language");
                res.render('greetings/index');
            }
            else {
                models.Name.findOne({
                    name: req.body.name
                }, function(err, theName) {

                    if (err) {
                        return done(err)
                    }


                    if (theName) {
                        theName.greetCounter = theName.greetCounter + 1;
                        // outputGreeting = "Hello, " + theName.name + ". Greeted: " + theName.greetCounter;

                        theName
                            .save(function(err, result) {
                                if (err) {
                                    return done(err)
                                }
                            });
                        var data = {
                            greeting: outputGreeting
                        };

                        res.render('greetings/index', data);
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
                            });
                        })
                        res.render('greetings/index');
                    }
                });

            }

            //res.render('greetings/index');
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



//
// if (userName) {
//     if (language) {
//
//         if (language == 'english') {
//             outputGreeting = "Hello, " + userName + ".";
//
//         } else if (language == 'setswana') {
//             outputGreeting = "Dumela, " + userName + ".";
//
//         } else if (language == 'zulu') {
//             outputGreeting = "Sawubona, " + userName + ".";
//
//         }
//
//     }
//
//
//
//
//
//
//
//
//     else {
//         req.flash("error", "Please select language");
//    }
//
//     var data = {
//         greeting: outputGreeting
//     };
//
//     res.render('greetings/index', data);
// }
// else {
//     req.flash("error", "Name should not be blank");
//     res.render('greetings/index');
// };
