var router = require('express').Router();

var variables = {
    title: "Que sabes..."
};

router.get('/', function(req, res){
    res.render("index", variables);
});

module.exports = router;
