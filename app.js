const hbs = require('express-handlebars');
const app = require("express")();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
  console.log("user connected!")
});

app.get("/", function (req, res) {
  res.render('home', { layout: 'default' });
});

app.get("/games", function (req, res) { //path "/..." and 'file to load'
  res.render('games', { layout: 'default' });
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
