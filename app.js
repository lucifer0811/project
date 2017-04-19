var express = require('express'),
  cors = require('cors'),
  wait = require('wait.for'),
  app = express();
  //parseXlsx = require('excel'),

app.use(cors());

var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 30,
  host : '128.199.145.205',
  user : 'dev',
  password : 'dev123',
  database : 'online_exam'
});

//parseXlsx('Spreadsheet.xlsx', function(err, data) {
  //if(err) throw err;
  //console.log("Phan");
//});

function db_function(f, req, res){
  wait.launchFiber(f,req,res);
};

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

function get_categories(req, res){
  var rows = wait.forMethod(pool, 'query', "SELECT * FROM category", []);
  res.json(rows);
};

app.delete('/api/section_questions/:id', function(req, res){
  pool.query('delete from section_question where id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/categories', function (req,res) {
  db_function(get_categories, req,res);
});

app.get('/api/categories/:id', function (req,res) {
  pool.query('SELECT * FROM question where category_id = ?',req.params.id, function(err, rows, fields) {
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
  pool.query('SELECT question.id, question.content, question.answers, question.type, category.name   FROM question INNER JOIN category ON question.category_id = category.id ', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/api/deleteQuestions', function(req, res){
  console.log(req.body.id);
  pool.query('delete from question where id = ?', [req.body.id], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/api/categories/:id', function (req, res) {
  pool.query('UPDATE category SET ? WHERE id = ?',[req.body , req.body.id], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.delete('/api/categories/:id', function(req, res){
  pool.query('delete from category where id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/questions/:id', function(req,res){
  pool.query('select id, content from question where id = ?', req.params.id, function(err, rows, fields){
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/addQuestions', function (req, res) {
  req.body.answers = JSON.stringify(req.body.answers);
  pool.query('insert into question SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/api/editQuestions', function (req, res) {
  req.body.answers = JSON.stringify(req.body.answers);
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

app.delete('/api/examies/:id', function(req, res){
  pool.query('delete from exam where id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies/:id', function(req, res){
  pool.query('SELECT * FROM exam where id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies/:id/sections', function(req, res){
  pool.query('SELECT * FROM section where exam_id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies/:id/question', function(req, res){
  pool.query('SELECT section_question.mark, question.id, question.content FROM section_question INNER JOIN question ON question.id = section_question.question_id where section_id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/examies/:exam_id/sections', function(req, res){
  pool.query('insert into section SET ?',[req.body], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.delete('/api/examies/:exam_id/sections/:id', function(req, res){
  pool.query('delete from section where id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/api/section_questions', function(req, res){
  pool.query('insert into section_question set ?',[req.body], function(err, rows, fields){
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/section_questions', function(req, res){
  pool.query('select * from section_question', function(err, rows, fields){
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/examies/:id/details', function(req, res){
  db_function(get_exam, req, res);
});

function get_exam(req, res){
  var exam = wait.forMethod(pool, 'query', "select * from exam where id = ?", [req.params.id]);
  for(var i = 0; i < exam.length; i++) {
    var sections = wait.forMethod(pool, 'query', "select * from section where exam_id = ?", [exam[i].id]);
    exam[i].section = sections;
    for(var j = 0; j < sections.length; j++){
      var section_questions = wait.forMethod(pool, 'query', "select * from section_question where section_id = ?", [sections[j].id]);
      var questions = [];
      for(var z = 0; z < section_questions.length; z++){
        var question = wait.forMethod(pool, 'query', "select id, content, answers, type from question where id = ?", [section_questions[z].question_id]);
        questions.push(question);
      }
      sections[j].question = questions;
    }
  }
  res.json(exam);
}
app.put('/api/section_questions/:id', function(req, res){
   pool.query('UPDATE section_question set ? WHERE id = ?',[req.body , req.body.id], function(err, rows, fields){
    res.json(rows);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
