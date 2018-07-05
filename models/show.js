var mongoose = require("mongoose");
var Schema =  mongoose.Schema,
	  ObjectId = Schema.ObjectId;

var Movie = require("./movie");
var Cinema = require("./cinema");


var showSchema  = new Schema({
	id: ObjectId,
	movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
	cinema: { type: Schema.Types.ObjectId, ref: 'Cinema' },
	showTime: String
});


module.exports = mongoose.model("Show",showSchema);
