
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', routes.helloworld);

app.get('/topic', function(req, res)
{
	var databaseUrl = "localhost:27017/jambo";
	var collections = ["topic", "tag"]
	var db = require("mongojs").connect(databaseUrl, collections);
	db.topic.find(function(e, docs)
	 		{
	 			res.setHeader('Content-Type', 'application/json');
    			res.end(JSON.stringify(docs));
	 		}
	 	);
})

app.get('/build', function(req, res)
{
	var databaseUrl = "localhost:27017/jambo"; // "username:password@example.com/mydb"
	var collections = ["topic", "tag"]
	var db = require("mongojs").connect(databaseUrl, collections);

	db.topic.save({name: "CIQ Bus Stand", category:"MY to SG"}
		, function(err, saved) {
	  		if( err || !saved) 
	  			console.log("Record not saved");
	  		else 
	  			console.log("Record saved");
	});
	db.topic.save({name: "Causeway bridge", category:"MY to SG"}
		, function(err, saved) {
	  		if( err || !saved) 
	  			console.log("Record not saved");
	  		else 
	  			console.log("Record saved");
	});
	db.topic.save({name: "Woodland Checkpoint", category:"MY to SG"}
		, function(err, saved) {
	  		if( err || !saved) 
	  			console.log("Record not saved");
	  		else 
	  			console.log("Record saved");
	});
	res.send('OK');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
