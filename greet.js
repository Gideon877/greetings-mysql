module.exports = function(){

    const nameList = [];

    const index = function(req, res){
        res.render('greetings/index', {greetings: nameList});
    }

    const greetScreen = function(req, res){
        res.render('greetings/index'); //greetings folder
    }

    const greet = function(req, res){

        var name = req.body.name;
        console.log(name)
        // var language = req.body.language;

        //check if current name is already greeted

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
