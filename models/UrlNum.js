/* This schema is used for just to read and store a global object */
var mongoose = require('mongoose');

var UrlNumSchema = mongoose.Schema({
        urlCount: { type: Number, default: 0 }
});

UrlNumSchema.methods.incCount = function(cb){
    this.urlCount++;
    this.save();
};

var UrlNum = mongoose.model('UrlNum', UrlNumSchema);

module.exports = UrlNum;
