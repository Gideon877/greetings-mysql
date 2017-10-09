exports.index = function(req, res, done) {
    var input = req.body;
    req.getConnection(function(err, connection) {
        if (err) return done(err);
        connection.query('SELECT * from greetings WHERE name=?', input.name, function(err, results) {
            // if (err) return done(err);
            var result = results[0];
            var language = input.language;

            //Exist
            if (result) {
                var new_count = result.count + 1;
                var id = result.id

                connection.query("UPDATE greetings set count=? WHERE id=?", [new_count, id],
                    function(err, rows) {
                        if (err)
                            console.log("Error Updating : %s ", err);

                        connection.query('SELECT * from greetings',
                            function(err, Names) {
                                var data = {
                                    greeting: language + result.name,
                                    counts: "Names greeted for this session: " + Names.length
                                };

                                res.render('index', data);
                            });

                    });
            }
            //No name in database
            if (!result) {
                var newuser = {
                    name: input.name,
                    count: 1
                }
                connection.query("INSERT INTO greetings set ? ", newuser,
                    function(err, rows) {
                        if (err)
                            console.log("Error Updating : %s ", err);

                        connection.query('SELECT * from greetings',
                            function(err, Names) {
                                var data = {
                                    greeting: language + input.name,
                                    counts: "Names greeted for this session: " + Names.length
                                };

                                res.render('index', data);
                            });

                    });
            }
        })

    });
};

exports.greeted = function(req, res, done) {
    req.getConnection(function(err, connection) {
        if (err) return done(err);
        connection.query('SELECT * from greetings', [], function(err, results) {
            if (err) return done(err);

            var data_2 = {
                namesGreeted: results
            };
            res.render('greeted', data_2);
        });
    });
};

exports.counter = function(req, res, done) {
    var user_id = req.params.user_id;

    req.getConnection(function(err, connection) {
        connection.query("SELECT * from greetings WHERE id = ?", [user_id], function(err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);

            var output = rows[0].name + " have been greeted " + rows[0].count + ' time(s).';

            var data_3 = {
                countMsg: output
            };
            res.render('counter', data_3);
        });
    });

};

exports.clearHistory = function(req, res, done) {
    req.getConnection(function(err, connection) {
        connection.query("DELETE FROM greetings", function(err, result) {
            if (err)
                console.log("Error deleting : %s ", err);



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
