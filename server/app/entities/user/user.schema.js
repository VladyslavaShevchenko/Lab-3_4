const mongoose = require('mongoose');

const User = new mongoose.Schema({
    login:String,
    password:String,
    liked:[{type:String}],
}, {
	versionKey: false
});

module.exports = mongoose.model('User', User);
