var hbs = require('express-handlebars');
var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.render('home', { layout: 'default' });
});

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/utils/'
}));

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
