const router = require('express').Router();

var variables ={
    title: "Recuperar sesion."
};

module.exports = function(){
    router.get("/", function(req, res){
        res.render("restore", variables);
    });
    
    return router;
};