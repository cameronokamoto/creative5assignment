var express = require('express');
var router = express.Router();
var fs = require('fs');











/* Set up mongoose in order to connect to mongo database */


var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    
    /**
     * TODO: insert data here, once we've successfully connected
     */
  }
});

 

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});










router.post('/comment', function(req, res, next) {
console.log("POST comment route"); 
console.log(req.body); // maybe this line is wrong? 
//res.sendStatus(200);

var newcomment = new Comment(req.body); 
console.log(newcomment); 
newcomment.save(function(err, post) { 
  if (err) return console.error(err);
  console.log(post);
  res.sendStatus(200);
});


});

router.delete('/delete', function(req, res, next) {

    Comment.deleteMany({}, function() {

   

    });

});



/* GET comments from database */
// comment this back in later

router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found
    res.json(commentList); //Then send the comments
  }
})
});



router.get('/search', function(req, res, next) {
  
    console.log("give it to me baby", req.query.str);
    Comment.find({Name: req.query.str}, function(err, commentList) {
        if (err) return console.error(err); 
       else {
            console.log(commentList);
            res.json(commentList);
        }
    });
})


router.get('/getquestion',function(req,res,next) {
    var myNum = req.query.q;

    fs.readFile(__dirname + '/questions.txt',function(err,data) {
        if(err) throw err;
        var questions = data.toString().split("\n");
      
        var jsonresult = [];
        jsonresult.push({question:questions[myNum]});
        console.log(jsonresult);
        console.log(myNum);
        res.status(200).json(jsonresult);
    });
});

 function displaytext(jsonresult)
 {
     document.write (jsonresult);
 }




module.exports = router;






