const hbs = require('express-handlebars');
const app = require("express")();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
