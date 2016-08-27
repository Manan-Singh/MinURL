var mongoose = require('mongoose');

var UrlSchema = mongoose.Schema({
    originalUrl: String,
    shortenedUrl: String,
    urlCountAtCreation: Number
});

var Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
