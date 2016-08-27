var express = require('express');
var router = express.Router();

// import xss-filters to prevent cross site scripting
var xssFilters = require('xss-filters');

// import the encoder for the URL shortening
var encoder = require('../encoder.js');

// import the Url and UrlNum models
var Url = require('../models/Url');
var UrlNum = require('../models/UrlNum');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('../public/index.html');
});

/* GET a test of the url encoder */
router.get('/test/:urlInt', function(req, res, next) {
    var par = req.params.urlInt;
    res.json({result: encoder.encodeURL(par)}); 
});

/* GET a test of the url decoder */
router.get('/test2/:url', function(req, res, next) {
    var par = req.params.url;
    res.json({result: encoder.decodeURL(par)}); 
});

/* GET a test of the res.urlNum */
router.get('/poop', function(req, res, next) {
    res.json({urlCount: "poop is " + req.urlCount});
});

/* GET a test of xss capability */
router.get('/xss', function(req, res, next) {
    var unsafe = "<p>Prevent XSS today! <script>alert('Hacking in progress...')</script></p>";
    var safe = xssFilters.uriInUnQuotedAttr(unsafe);
    res.send(safe);
});


/* API FOR REGISTERING A URL */

// POST a new url to be shortened
router.post('/shorten', function(req, res, next){
    // TODO: add validation for the URL
    req.sanitizeBody('url').sanitizeURL();
    console.log(req.body.url);
    req.checkBody('url').isURL();
    if(req.validationErrors()){
        return res.json({result: -2, msg: "That's not a URL! >:("});
    }
    // Use the encoder on req.urlCount and get back the shortened version of the url you'll send
    var newUrl = encoder.encodeURL(req.urlCount.urlCount);
    // Check if the Url already exists
    Url.findOne({originalUrl: req.body.url}, function(err, urlDup){
        if(err){
            res.send(err);
        }else{
            if(urlDup){
                res.json({result:-1, msg: "Chosen URL exists already!", toAppend: urlDup.shortenedUrl, original: req.body.url});
            }else{
                var shortened = new Url({
                    originalUrl: req.body.url,
                    shortenedUrl: newUrl + "",
                    urlCountAtCreation: req.urlCount.urlCount
                });
                shortened.save();
                req.urlCount.incCount(); // this is a permananent increase
                // toAppend is what you append to the domain of the website
                // to be re-routed to the original url
                res.json({result: "1", toAppend: newUrl, 
                    original: req.body.url
                });
            }
        }
    });
    
});

/* GET a shortened url re-route */
router.get('/:rerouteURL', function(req, res, next) {
    var decodedUrl = "-1"
    try{
        decodedUrl = encoder.decodeURL(req.params.rerouteURL);
        Url.findOne({urlCountAtCreation: decodedUrl}, function(err, url){
            if(err){
                res.send(err);
            }else{
                if(url){
                    //console.log("redirecting to " + );
                    res.redirect(url.originalUrl);
                }else{
                    res.sendStatus(404);
                }
            }
        });
    }catch(err){
        res.json({decodeError: "There was an error in decoding! The error was: " + err});
    }
});


module.exports = router;
