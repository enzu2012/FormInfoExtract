function extract(){
    var actionInfo=$("#action-info").val();
    //alert(actionInfo);
    var actionsInfo=actionInfo.split("\n\n");
    //alert(actions.length);
    var name;
    //var property={"name":"","keyword":[]};
    var propertyName;
    var properties;
    //var action={"name":"","properties":[]};
    var actions=[];
    var resString="";
    for(var i=0;i<actionsInfo.length;i++){
        if(actionsInfo[i]){
            //单个话题整体信息
            //alert(actionsInfo[i]);
            name=actionsInfo[i].match(/name=[^\n]*httppost\n/);
            if(name){
                //alert("nameIsmatch:"+name);
                name=name[0].split("=")[1];
                name=name.substr(0,name.length-1);
                //话题名
                //alert(name);
                //action.name=name;
                properties=actionsInfo[i].match(/(condition=|reference=){1}[^\n]*\n/gi);
                //变量数量
                //alert(properties.length);
                for(var j=0;j<properties.length;j++){
                    //alert(properties[j]);
                    //截取变量名
                    var start=properties[j].indexOf("=")+1;
                    var end1=properties[j].indexOf(':');
                    var end2=properties[j].indexOf('|');
                    if(end1!=-1){
                        propertyName=properties[j].substr(start,end1-10);
                    }else if(end2!=-1){
                        propertyName=properties[j].substr(start,end2-10);
                    }else{
                        alert("未查找到"+action.name+"的变量");
                    }
                    //截取关键词
                    var matchKeyWords=properties[j].match(/(\=\+){1}[^\n]*\n/gi);
                    matchKeyWords[0]=matchKeyWords[0].substr(0,matchKeyWords[0].length-1);
                    var keywords;
                    var keyword;
                    //alert(matchKeyWords[0].indexOf("~"));
                    if(matchKeyWords[0].indexOf("~")!==-1){
                        keywords=matchKeyWords[0].split("~");
                        for(var k=0;k<keywords.length;k++){
                            keywords[k]=keywords[k].split("=+")[1];
                            resString+=name+"，"+propertyName+"，"+keywords[k]+"\n";
                        }
                    }else{
                        keyword=matchKeyWords[0];
                        resString+=name+"，"+propertyName+"，"+keyword.substr(2)+"\n";
                    }
                }
            }
        }
    }

    /*for(var l=0;l<actions.length;l++){
        if(actions[l].properties){
            for(var m=0;m<actions[l].properties.length;m++){
                if(actions[l].properties[m].keyword){
                    for(var n=0;n<actions[l].properties[m].keyword.length;n++){
                        //alert(actions[l].name+actions[l].properties[m].name+actions[l].properties[m].keyword[n]);
                        resString=resString+actions[l].name+"    "+actions[l].properties[m].name+"   "+actions[l].properties[m].keyword[n]+"\n";
                    }
                }
            }
        }
    }*/
    return resString;
}


$(function () {
    $("#btn-extract").on("click",function(){
        $("#extract-info").text(extract());
    })
});