var express = require("express");
var bodyParser = require("body-parser");
var checkUser = require("./middlewares/checkUser");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var app = express();

/* Config App */
app.set('view engine', 'pug');
app.locals.pretty = true;
app.disable('x-powered-by');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    name: "vSession",
    secret: "qwert !@#$",
    saveUninitialized: false,
    resave: false,
    store: new FileStore({path:"./sessions/"})
}));
app.use(checkUser);

app.get('/', (req, res)=>{
    res.send('HolaMundo!');
});

var envPort = process.env.port || 3000;

var server = app.listen(envPort, (err)=>{
    if(err) throw err;
    
    var port = server.address().port;
    console.log('servidor iniciado en el puerto: '+port);
});
