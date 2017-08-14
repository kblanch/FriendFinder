var friendsData = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    app.post("/api/friends", function(req,res){
        //API Data
        //Compatibility LOGIC
        var newUser = 0;
        var oldUser = 0;

        var comparisonsArray = [];



        req.body.scores.forEach(function(element) {
            newUser += +element;
        });

        for(var i=0; i<friendsData.length;i++){
            for( var j=0; j<friendsData[i].scores[j].length; j++){
                oldUser += +friendsData[i].scores[j];
            }
            comparisonsArray.push(Math.abs(newUser - oldUser));
        }

        var leastDiff = comparisonsArray[0];
        var leastDiffIndex = 0;

        for(var k=1; k<comparisonsArray.length; k++){
            if(comparisonsArray[k]<leastDiff){
                leastDiff = k;
            }
        }

        console.log(comparisonsArray);
        console.log(leastDiff);
        console.log(leastDiffIndex);
        console.log(friendsData[leastDiffIndex]);
        
        friendsData.push(req.body);

        console.log(friendsData);
        res.json(friendsData[leastDiffIndex]);
    });

};
