var express = require('express'),
  cors = require('cors'),
  app = express();

app.use(cors());

var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'online_exam'
});


var path= require("path");
app.use('/static', express.static(__dirname + '/online_exam'));

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// parse application/json
app.use(bodyParser.json())


app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/categories', function (req, res) {

  pool.query('SELECT * FROM category', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/categories', function (req, res) {
  console.log(req.body.id);

  pool.query('insert into category SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
