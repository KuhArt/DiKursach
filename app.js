var express = require('express'),
    path = require('path'),
    http = require('http'),
    mydb = require('./routes/mydb');
//    mygeo = require('./routes/geodata') ;
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(router);
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

router.all('/', function (req, res, next) {
  console.log('Someone made a request!');
  next();
});

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/usersdb', mydb.findAll);
router.get('/usermap', mydb.getLocation)
router.get('/location', function (req, res) {
    console.log(req.query)
    res.send('hi!')
    res.end()
})
router.post('/secret', mydb.findByName);

//router.post('/usermap', mygeo.findMe);
// router.get('/secret/:key', function (req, res) {
//   var secret = req.params.key;
//   var user = {};
//   user.authorised = secret === secretKey ? true : false;
//   res.render('secret', user);
// });
//
// router.get('/secret', function (req, res) {
//   var user = {
//     authorised: false
//   };
//   res.render('secret', user);
// });



app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});

module.exports = app;