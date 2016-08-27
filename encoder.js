/*
 * This module is used for encoding and decoding URLs. It is
 * generic enough that you can copy it and change the values of
 * the base and the numberSystem to create your own custom
 * URL shortener. NOTE: numberSystem can have only URL 
 * characters in it.
 */

const numberSystem = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var base = numberSystem.length;

/* Function assumes that an integer is mapped to a URL. Returns a hashed version of the integer converted into the specified number system */
module.exports.encodeURL = function(urlInt){
    if(urlInt === 0){
        return "0";
    }
    var urlIdString = "";
    while(urlInt > 0){
        var charToEncode = (urlInt % base);
        urlIdString = numberSystem.charAt(charToEncode) + urlIdString;
        urlInt = Math.floor(urlInt / base);
    }
    return urlIdString;
}

/* Function returns an integer from a unique URL string */
module.exports.decodeURL = function(urlIdString){
    var urlInt = 0;
    var power = 0;
    for(var i = urlIdString.length - 1; i >= 0; i--){
        var charToDecode = urlIdString.charAt(i);
        if(numberSystem.indexOf(charToDecode) === -1){
            throw "Parsing Error";
        }
        urlInt = urlInt + (numberSystem.indexOf(charToDecode + "") * Math.pow(base, power));
        power++;
    }
    console.log("plz: "+urlInt)
    return urlInt;
}
