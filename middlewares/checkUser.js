var checkUser = function(req, res, next){
    if(req.userId){
        console.log("Ya estas registrado.");
    }else{
        console.log("Nuevo usuario tienes que registrarte.");
    }
    console.log(req.session.id);
    next();
}

module.exports = checkUser;
