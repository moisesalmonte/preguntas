var router = require('express').Router();

var variables = {
    title: "Que sabes..."
};

router.get('/', function(req, res){
    
    if(req.session.userId){
        res.render("index", variables);
    }else{
        res.redirect(/registro/);
    }
});

module.exports = router;
