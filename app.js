var express = require('express'),
  cors = require('cors'),
  app = express();

app.use(cors());

var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host : '128.199.145.205',
  user : 'dev',
  password : 'dev123',
  database : 'online_exam'
});


var path= require("path");
app.use('/static', express.static(__dirname + '/online_exam'));

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/categories', function (req,res) {
  pool.query('SELECT * FROM category ', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/categories', function (req, res) {
  pool.query('insert into category SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/questions', function (req,res) {
  pool.query('SELECT * FROM question ', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/api/categories/:category_id', function (req, res) {
  pool.query('UPDATE category SET ? WHERE id = ?',[req.body , req.body.id], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/addQuestions', function (req, res) {
  console.log(req.body);
  req.body.answers = JSON.stringify(req.body.answers);
  pool.query('insert into question SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/api/editQuestions', function (req, res) {
  req.body.answers = JSON.stringify(req.body.answers);
  console.log(req.body);
  pool.query('UPDATE question SET ? WHERE id = ?',[req.body , req.body.id], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies', function (req,res) {
  pool.query('SELECT * FROM exam', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/examies', function(req, res){
  pool.query('insert into exam SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies/:id/sections', function(req, res){
  pool.query('SELECT * FROM section where exam_id = ?', req.params.id,  function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/examies/:id/sections', function(req, res){
  pool.query('insert into section SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
