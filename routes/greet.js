exports.index = function(req, res, done) {
    var input = req.body; //get name from the web form
    req.getConnection(function(err, connection) { //connect to mysql database
        if (err) return done(err);
        connection.query('SELECT * from greetings WHERE name=?', input.name, function(err, results) {
            // if (err) return done(err);
            var result = results[0]; //avoid duplicated
            var language = input.language; //get selected language value
            var myName = input.name.toLowerCase(); //convert entered name string to lowercase

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            var name = capitalizeFirstLetter(myName); //make the first letter of the name uppercase

            //If the entered name on the input textbox exist, increment the greet counter by one.
            if (result) {
                var new_count = result.count + 1;
                var id = result.id;

                connection.query("UPDATE greetings set count=? WHERE id=?", [new_count, id],
                    function(err, rows) {
                        if (err)
                            console.log("Error Updating : %s ", err);

                        connection.query('SELECT * from greetings',
                            function(err, Names) {
                                var data = {
                                    greeting: language + name,
                                    counts: "Names greeted for this session: " + Names.length
                                };
                                res.render('index', data);
                            });
                        });
            }
            //If there is no name found in database, create new one and set greet counter to 1.
            if (!result) {
                var newuser = {
                    name: name,
                    count: 1
                };
                connection.query("INSERT INTO greetings set ? ", newuser,
                    function(err, rows) {
                        if (err)
                            console.log("Error Updating : %s ", err);

                        connection.query('SELECT * from greetings',
                            function(err, Names) {
                                var data = {
                                    greeting: language + name,
                                    counts: "Names greeted for this session: " + Names.length
                                };
                                res.render('index', data);
                            });
                    });
            }
        })
    });
};
//Show all greeted names in a list form
exports.greeted = function(req, res, done) {
    req.getConnection(function(err, connection) {
        if (err) return done(err);
        connection.query('SELECT * from greetings ORDER BY name', function(err, results) {
            if (err) return done(err);

            var data = {
                namesGreeted: results
            };
            res.render('greeted', data);
        });
    });
};
//gwt a specific name greeted counter using the name id
exports.counter = function(req, res, done) {
    var user_id = req.params.user_id;

    req.getConnection(function(err, connection) {
        connection.query("SELECT * from greetings WHERE id = ?", [user_id], function(err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);

            var output = rows[0].name + " have been greeted " + rows[0].count + ' time(s).';
            var data = {
                countMsg: output
            };
            res.render('counter', data);
        });
    });
};
//Delete all greeted names  in the database
exports.clearHistory = function(req, res, done) {
    req.getConnection(function(err, connection) {
        connection.query("DELETE FROM greetings", function(err, result) {
            if (err)
                console.log("Error deleting : %s ", err);
            //set the id to 0 for the newly greeted name
            connection.query("SET @idnum := 0;", function(err, result) {
                connection.query("UPDATE greetings SET id = @idnum := (@idnum+1)", function(err, result) {
                    connection.query("ALTER TABLE greetings AUTO_INCREMENT = 1", function(err, result) {
                    });
                });
            });
            res.render('index');
        });
    });
};
