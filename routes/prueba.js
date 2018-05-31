module.exports = function(saludo){
    console.log(saludo);
    const router = require('express').Router();
    router.get('/', function(req, res){
        res.redirect('/');
    });
    
    return router;
}
