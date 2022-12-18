function LinkCheck(url){
    var http = new XMLHttpRequest();
    http.open('HEAD',url,false);
    http.send();
    return http.status!=404;
}

function put_poster(words,id){
    var podata= document.getElementById(id);

    var xx="";
    for (let i = 0; i < words[id].length; i++) {
        
        var name=words[id][i]["name"];
        var country=words[id][i]["country"];
        var type=words[id][i]["type"];

        if(id=="series"){
            var ep=words[id][i]["ep"];
        }else{
            var ep="";
        }
        
        var condition=words[id][i]["condition"];

        if (words[id][i]["poster_url"]!=""){
            if(LinkCheck("../temp/"+name+'.jpg')) {
                var poster_url="../temp/"+name+'.jpg';
            }else{
                var poster_url=words[id][i]["poster_url"];
            }
        
        
            var alt=name+"|"+country+"|"+type+"|"+ep+"|"+condition;
            xx+="<img src='"+poster_url+"' alt='"+alt+"' class='img'>";
        }
    }
    podata.innerHTML=xx;
    //alert(words["series"][0]["name"]);
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            //callback(rawFile.responseText);
            var data=rawFile.responseText;
            var words=JSON.parse(data);

            //
            put_poster(words,"series");
            put_poster(words,"movies");

        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("./my_list.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});
