var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/header', function(req, res, next) {
  res.render('header', { title: 'header' });
});

/* GET hello page. */
router.get('/helloworld', function(req, res, next){
  res.render('helloworld', {title: 'Hello, world !'});
});

/* GET DocumentList page. */
router.get('/documentlist', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
  res.render('documentlist', {
  "documentlist" : docs
    });
  });
});

/* GET DoclistRang10 page. */
router.get('/documentrang', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
  res.render('documentrang', {
  "documentrang" : docs
    });
  });
});

/* GET AutDocN page. */
router.get('/documentautn', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
  res.render('documentautn', {
  "documentautn" : docs
    });
  });
});

/* GET NoChamp page. */
router.get('/documentnoc', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
  res.render('documentnoc', {
  "documentnoc" : docs
    });
  });
});

/* GET Document type page. */
router.get('/documentype', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.distinct("fields.type_de_document",{},{},function(e,docs){
  res.render('documentype', {
  "documentype" : docs
    });
  });
});

/* GET Mediathèque page. */
router.get('/mediatheque', function(req, res) {
  var db = req.db;
  var collection = db.get('test');
  collection.find({},{},function(e,docs){
  res.render('mediatheque', {
  "mediatheque" : docs
    });
  });
});

/* GET new User Page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
  if (err) {
    // If it failed, return error
    res.send("There was a problem adding the information to the database.");
  }
  else {
    // And forward to success page
    res.redirect("userlist");
    }
  });

});

router.post('/mediatheque', function(req, res){

  var db = req.db;

  var id = req.body.id;
  
  var collection = db.get('test');
  var media = collection.findOne(_id=id,{});
  if(media.statut==0){
    var stat = 1;
  }
  else
  {
    var stat = 0;
  }
  collection.update({
    '_id': id
  },
  {
    "statut":stat
  },function(err, doc){
    if(err){
      res.send("There was a problem.");
    }
    else {
      // And forward to success page
      res.redirect("mediatheque");
      }
  });

});

module.exports = router;
