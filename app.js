var express = require("express");
var bodyParser = require("body-parser");
var checkUser = require("./bdd/registro");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

var app = express();

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, (err, client)=>{
    assert.equal(null, err);//fallo
    
    const db = client.db('verde');
    console.log('Conexion exitosa.');
    
    
    
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
        store: new FileStore({path:"./sessions/"}),
        cookie: {nombre: "prueba"}
    }));
    
    
    // Rutas del servidor web
    var home = require('./routes/index');
    app.use('/', home);
    
    var user = require('./routes/users')(db);
    app.use('/registro/', user);
    
    var recuperar = require('./routes/restoreSession')();
    app.use('/recuperar/', recuperar);
    
    var prueba = require('./routes/prueba')('Hola Mundo!');
    app.use('/prueba/', prueba);
    

    //API comprobar disponibilidad apodo
    app.post("/check/:apodo", function(req, res){
        var apodo = req.params.apodo;
        
        checkUser(apodo, db, function(flag){
            var temp = {};
            
            if(flag){
                temp.isExists = true;
                res.json(temp);
            }else{
                temp.isExists = false;
                res.json(temp);
            }
            console.log(flag);
        });
    });


    var envPort = process.env.port || 3000;
    var server = app.listen(envPort, (err)=>{
        if(err) throw err;

        var port = server.address().port;
        console.log('servidor iniciado en el puerto: '+port);
    });
    
    
    var miFuncion = function(){
        client.close((err, result)=>{
            assert(null, err);
            console.log('cerrada.');
        });
    };
    
    /*
    db.close(function(){
        console.log('cerrada.')
    });*/
    process.on('SIGINT', function () {
        console.log('Cerrando La Base de Datos');
        miFuncion();
        process.exit(2);
    });
});


