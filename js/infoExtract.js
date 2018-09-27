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
                    //alert("start:"+start+"end1:"+end1+"end2:"+end2);
                    if(end1!=-1&&end1<101){
                        propertyName=properties[j].substr(start,end1-10);
                    }else if(end1>100){
                        alert("请检查变量:"+properties[j].substr(start,end2-10)+"是否存在非法《:》");
                    }else if(end2!=-1){
                        propertyName=properties[j].substr(start,end2-10);
                    }else{
                        alert("未查找到"+action.name+"的变量");
                    }
                    //截取关键词
                    var matchKeyWords=properties[j].match(/(\=\+){1}[^\n]*\n/gi);
                    if(matchKeyWords){
                        //alert(matchKeyWords[0]);
                        matchKeyWords[0]=matchKeyWords[0].substr(0,matchKeyWords[0].length-1);
                        var keywords;
                        var keyword;
                        var words;
                        //alert(matchKeyWords[0].indexOf("~"));
                        if(matchKeyWords[0].indexOf("~")!==-1){
                            keywords=matchKeyWords[0].split("~");
                            for(var k=0;k<keywords.length;k++){
                                keywords[k]=keywords[k].split("=+")[1];
                                if(keywords[k]!="none") {
                                    var keywordSplit="";
                                    words = keywords[k].split("+");
                                    for (var l = 0; l < words.length; l++) {
                                        if (keywordSplit.length<200){
                                            if(keywordSplit.length>0){
                                                keywordSplit +="+"+words[l];
                                            }else{
                                                keywordSplit+=words[l];
                                            }
                                        }else{
                                            //alert(keywordSplit);
                                            resString+=name+"，"+propertyName+"，"+keywordSplit+"\n";
                                            //alert("finish one");
                                            keywordSplit="";
                                            keywordSplit+=words[l];
                                        }
                                        if(l===words.length-1){
                                            resString+=name+"，"+propertyName+"，"+keywordSplit+"\n";
                                            //alert("end");
                                        }
                                    }
                                }
                            }
                            if((properties[j].indexOf("::")!==-1||actionInfo[i].indexOf("interrupt"))!==-1){
                                if(properties[j].indexOf("condition")!==-1){
                                    resString+=name+"，"+propertyName+"，unknown\n";
                                }
                            }
                        }else{
                            keyword=matchKeyWords[0];
                            //alert(keyword);
                            //alert(keyword.indexOf("none"));
                            if(keyword.indexOf("none")===-1){
                                var keywordSplit="";
                                keyword=keyword.substr(2);
                                words = keyword.split("+");
                                for (var l = 0; l < words.length; l++) {
                                    if (keywordSplit.length<200){
                                        if(keywordSplit.length>0){
                                            keywordSplit +="+"+words[l];
                                        }else{
                                            keywordSplit+=words[l];
                                        }
                                    }else{
                                        //alert(keywordSplit);
                                        resString+=name+"，"+propertyName+"，"+keywordSplit+"\n";
                                        //alert("finish one");
                                        keywordSplit="";
                                        keywordSplit+=words[l];
                                    }
                                    if(l===words.length-1){
                                        resString+=name+"，"+propertyName+"，"+keywordSplit+"\n";
                                        //alert("end");
                                    }
                                }
                                if((properties[j].indexOf("::")!==-1||actionInfo[i].indexOf("interrupt"))!==-1){
                                    if(properties[j].indexOf("condition")!==-1){
                                        resString+=name+"，"+propertyName+"，unknown\n";
                                    }
                                }
                            }else{
                                resString+=name+"，"+propertyName+"，unknown\n";
                            }
                        }
                    }else{
                        resString+=name+"，"+propertyName+"，空\n";
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