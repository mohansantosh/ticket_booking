var mangoose  = require("mongoose");
//mongoose.connect("mongodb://localhost/ticket_booking");

var Cinema = require("./models/cinema");
var Movie = require("./models/movie");
var Show = require("./models/show");


var dataCinemas = [
		{
			name: "Escape",
			image:"https://media-cdn.tripadvisor.com/media/photo-s/06/ce/01/64/escape-cinemas.jpg",
			location:"Express Avenue,Chennai",
			movies:[
				{
					name: "Kaala",
					description: "Kaala is a 2018 Indian Tamil-language action drama film written and directed by Pa. Ranjith and produced by Dhanush. Starring Rajinikanth in the lead role",
					rating: "5",
					shows: ["9:00AM"],
					image: "https://in.bmscdn.com/iedb/movies/images/website/poster/large/kaala-et00057686-25-05-2017-06-31-26.jpg"
				},
				{
					name: "Basha",
					description: "Baashha is a 1995 Indian Tamil-language action film written and directed by Suresh Krissna.",
					rating: "5",
					image:"https://www.filmibeat.com/img/220x80x275/popcorn/movie_posters/basha-.jpg",
					shows: ["11:00AM"]
				}
			]
		},
		{
			name: "Pheonix",
			image:"https://media-cdn.tripadvisor.com/media/photo-s/0b/87/88/7a/hallway.jpg",
			location: "Form Mall,Chennai",
			movies:[
				{
					name: "Sivaji",
					description: "Sivaji is a 2007 Indian Tamil-language masala film directed by S. Shankar and produced by AVM Productions.",
					rating: "5",
					image: "http://media-images.mio.to/various_artists/S/Shivaji%20%282007%29/Art-350.jpg",
					shows: ["7:00AM"]
				},
				{
					name: "Linga",
					description: "Lingam is an abstract or aniconic representation of the Hindu deity Shiva, used for worship in temples, smaller shrines, or as self-manifested natural objects.Lingam is an abstract or aniconic representation of the Hindu deity Shiva, used for worship in temples, smaller shrines, or as self-manifested natural objects.",
					rating: "5",
					shows: ["10:00AM"],
					image:"https://upload.wikimedia.org/wikipedia/en/e/e3/Lingaa.jpg"
				}
			]
		},
		{
			name: "Sathyam",
			image: "https://static1.timescard.com/images/1360829056_cdda.jpg",
			location: "Royapetta,Chennai",
			movies:[
				{
					name: "Chandramukhi",
					description: "Chandramukhi (English: Moon-faced beauty) is a 2005 Indian Tamil-language comedy horror film written and directed by P. Vasu,",
					rating: "5",
					image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Chandramukhi1.jpg",
					shows: ["7:00AM"]
				},
				{
					name: "Baba",
					description: "Baba is a 2002 Indian Tamil language supernatural political thriller film written and produced by Rajinikanth under his banner Lotus International",
					rating: "5",
					shows: ["10:00AM"],
					image:"https://upload.wikimedia.org/wikipedia/en/a/ab/Baba_DVD_Cover.jpg"
				},
			]	
		}
];

		function seedFunction(){
			dataCinemas.forEach(function(cinema){
			 Cinema.create({name: cinema.name,image: cinema.image,location:cinema.location},function(err,cinema_data){
					if(err){
						console.log("error creating cinema record");
					}
					else
					{

						cinema.movies.forEach(function(movie){
							//if(movie_record === null)
							Movie.create({name: movie.name,description: movie.description,image: movie.image,rating: movie.rating},function(err,movie_data){
								if(err){
									console.log("error creating movie records");
								}
								else{
									movie.shows.forEach(function(show){
										Show.create({movie: movie_data._id, cinema: cinema_data._id,showTime: show},function(err,show_data){
											if(err){
												console.log("error creating show records")
											}
										});
									});
								}
							});
						});
					}
				})
			});
		}


module.exports = seedFunction;
