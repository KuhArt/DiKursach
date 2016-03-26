var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('usersdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'usersdb' database");
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

module.exports.findAll = function(req, res) {
    var users = {};
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            users.items = items;
            res.render('usersdb', users);
        });
    });
};

module.exports.getLocation = function (req, res) {
    res.render('geodata')
}

module.exports.findByName = function(req, res) {
    var name = req.body.username;
    var pass = req.body.secret;
    var user = {};
    db.collection('users', function(err, collection) {
        collection.find({'hihiname':name, 'hihipassword':pass}, {'_id': 0}).toArray(function(err, items) {
            if(items.length>0) {
                //console.log(items[0].hihiname);
                user.username = name;
                user.authorised = true;
                user.address = items[0].hihiaddress;
                res.render('secret', user);
            }
        });
    });
};