var mongoose = require("mongoose");

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var movieSchema = new Schema({
	id: ObjectId,
	name: String,
	image: String,
	description: String,
	rating: String
});

module.exports = mongoose.model("Movie",movieSchema);