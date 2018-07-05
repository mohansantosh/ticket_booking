var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var cinemaSchema = new Schema({
	id:  ObjectId,
	name: String,
	image: String,
	location: String
})


module.exports = mongoose.model("Cinema",cinemaSchema);
