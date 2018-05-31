(function(){
    let httpXML;
    let campoApodo = document.getElementById("apodo");
    let formulario = document.getElementById("formulario");
    let flag = false;
    
    if(window.XMLHttpRequest){
        httpXML = new XMLHttpRequest();
    }else{
        httpXML = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    httpXML.onreadystatechange = function(){
        if(httpXML.readyState === 4){
            
            var temp = httpXML.responseText;
            var obj = JSON.parse(temp);
            flag = obj.isExists;
            console.log(obj.isExists);
            
        }
    };
    
    //Verificar si el apodo esta ya registrado
    campoApodo.addEventListener('keyup', function(){
        var temp = this.value;
        if(temp.length >= 6 && temp.length < 12){
            console.log('correcto');
            httpXML.open("POST", "/check/" + temp, true);
            httpXML.send();
        }
    });
    
    //Validar Formulario
    formulario.addEventListener('submit', function(){
        //console.log(document.forms["formulario"]["email"].value);
        var form = document.forms['formulario'];
        
        if(flag){
            console.log('Lo siento ya este apodo existe elije otro');
            return false;
        }
        else if(form['nombre'] === "")
            return false;
        else if(form['apellido'] === "")
            return false;
        else if(form['apodo'] === "")
            return false;
        else if(form['email'] === "")
            return false;
        return true;
    });
    
    
}());
