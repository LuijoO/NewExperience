const hbs = require('express-handlebars');
const express = require("express")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sassMiddleware = require('node-sass-middleware')

let conexiones = 0;

const mostrarConexiones = () => {
  console.log("Cantidad de conexiones: " + conexiones)
}

io.on('connection', socket => {
  conexiones++;

  console.log("user connected!")

  socket.on("disconnect", () => {
    conexiones--;
    console.log("user disconnected!")
    mostrarConexiones()
  })

  mostrarConexiones()
});

app.use(
  sassMiddleware({
    src: __dirname + '/sass', //where the sass files are 
    dest: __dirname + '/public/css', //where css should go
    debug: true, // obvious
  })
);

app.use(express.static('public'));

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

server.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
