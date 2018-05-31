const router = require('express').Router();
const variables = {
    title: "Registro"
};
const guardar = require('../bdd/GuardarToMongo').GuardarUsuario;



module.exports = function(db){
    
    router.get('/', function(req, res){
        res.render('users', variables);
    });

    router.post('/', function(req, res){
        var miUsuario = req.body;
        var flag = true;

        //Comprobando los valores enviados por los usuarios
        if(!miUsuario.nombre)
            flag = false;
        else if(!miUsuario.apellido)
            flag = false;
        else if(!miUsuario.apodo)
            flag = false;
        else if(!miUsuario.email)
            flag = false;

        if(flag){
            //Guardar Objecto hacia mongo
            guardar(db, miUsuario, function(resultado){
                
                if(resultado.result.ok === 1){
                    req.session.userId = resultado.insertedId;
                    console.log('guardado en session');
                }
                res.redirect("/");
            });
        }else{
            console.log("noguardado");
            res.redirect("/registro/");
        }
    });
    
    return router;
};
