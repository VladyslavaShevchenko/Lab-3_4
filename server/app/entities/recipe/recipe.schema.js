const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    name: String,
    category:String,
    createDate:String,
    shortDesc: String,
    longDesc: String,
    createDate:Number,
    author:String,
}, {
	versionKey: false
});

module.exports = mongoose.model('Recipe', Recipe);
