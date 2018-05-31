

var checkApodo = function(apodo, db, callback){
    db.collection('usuarios').find({"apodo": apodo}, function(err, doc){
        doc.toArray(function(err, doc){
            var temp = doc.length;
            if(temp > 0){
                callback(true);
            }else{
                callback(false);
            }
        });
        
    });
}

module.exports = checkApodo;
