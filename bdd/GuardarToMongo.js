//Funciones para guardar en las diferentes colleciones
//de la base de datos
const assert = require('assert');

var GuardarUsuario = function(db, usuario, callback){
    db.collection('usuarios').insertOne(usuario, function(err, result){
       if(err) throw err;

        callback(result);
    });    
};

module.exports.GuardarUsuario = GuardarUsuario;
