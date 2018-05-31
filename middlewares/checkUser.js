var checkUser = function(req, res, next){
    if(req.userId){
        console.log("--- Check-USER --- Ya estas registrado.");
    }else{
        console.log("--- Check-USER --- Nuevo usuario tienes que registrarte.");
    }
    console.log(req.session.id);
    next();
}

module.exports = checkUser;
