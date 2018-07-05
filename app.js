var express 	= require('express'),
	bodyParser  = require('body-parser');
	mongoose 	= require('mongoose'),
	groupBy 	= require('group-by')
var app = express();
	
mongoose.connect('mongodb://localhost:27017/ticket_booking');

var seedFunction = require("./seed");

//seedFunction();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

var Cinema = require("./models/cinema");
var Movie = require("./models/movie");
var Show = require("./models/show");


/*

----------------------------------
CONTROLLERS
----------------------------------
*/
app.get("/",function(req,res){
	Cinema.find({},function(err,cinemas){
		res.render('show',{cinemas:cinemas});
	});
});



app.get("/cinemas/new",function(req,res){
	res.render('new');
})

app.get("/cinemas/:cinema_id/info",function(req,res){
		Cinema.findOne({_id: req.params.cinema_id},function(err,cinema){
			if(err){
				console.log("error in getting cinema info");
			}
			else{
				console.log(cinema);
				res.render("cinema_description",{cinema: cinema});
			}
		});
});


app.get("/cinemas/:cinema_id/:cinema_name/shows",function(req,res){
	Show.find({cinema: req.params.cinema_id}).populate("movie").exec(function(err,shows){
			if(err){
				console.log("error in getting movies");
			}
			else{
				if( shows.length > 0)
					res.render("cinema",{shows: shows,cinema: req.params.cinema_name});
				else
					res.render("screen_layout");
			}
		});
});


app.get("/movies/:movie_id/:movie_name",function(req,res){
	Show.findAll({movie: res.body.movie_id}).populate("cinema",["name"]).exec(function(err,cinemas){
		if(err){
			console.log("error in getting cinemas");
		}
		else{
			res.render("movie",{cinemas: cinemas, movie: req.params.movie_name});
		}
	});
});


app.get('/bookticket/:show_id/screen_layout',function(req,res){
	res.render('screen_layout',{show_id: req.params.show_id});
})

app.get('/confirmbooking/:show_id/:seat_no',function(req,res){
	Show.findOne({_id: req.params.show_id}).populate("cinema").populate("movie").exec(function(err,show){
		res.render('confirm_booking',{show: show,seat_no: req.params.seat_no});
	});
})
app.post("/cinemas/submit",function(req,res){
	var cinema = {};
	cinema.name = req.body.name;
	cinema.image = req.body.image_url;
	Cinema.create({name: req.body.name,image: req.body.image,location: req.body.location},function(err,cinema){
		if(err){
			console.log("Error creating cinema")
		}
	});
	res.redirect("/");
})

var server = app.listen(8081,function(){
	console.log("App is listening on 8081");
});
app.use(express.static('public'));
//app.set('views', path.join(__dirname, 'views'));