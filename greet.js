module.exports = function(){

    const nameList = [];

    const index = function(req, res){
        res.render('greetings/index', {greetings: nameList});
    }

    const greetScreen = function(req, res){
        res.render('greetings/greet'); //greetings folder
    }

    const greet = function(req, res){
        // res.send('Add a name');
        // var name = req.params.name;
        //check if current name is already greeted

        var name = req.body.name;
        // var language = req.body.language;


        var foundName = nameList.find(function(currentName){
            return currentName === name;
        });

        if (name && !foundName) {
            nameList.push(name);
        }


        res.redirect('/greetings');
    }

    return {
        index,
        greet,
        greetScreen
    }
}
