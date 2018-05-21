//两个字符串的相似程度，并返回相差字符个数
function strSimilarity2Number(s, t){
    var num = 0;
    var n = s.length;
    var m = t.length;
    if(n === 0 || m === 0){
        num = 0;
    }
    var l = n>m?n:m;
    for(var i=0;i<l;i++){
        if(s.indexOf(t.substr(i,1))!=-1){
            num ++;
        }
    }
    return num;
}
//两个字符串的相似程度，并返回相似度百分比
function strSimilarity2Percent(s, t){
    var l = s.length > t.length ? t.length : s.length;
    var d = strSimilarity2Number(s, t);
    return (d/l).toFixed(4);
}
exports.strSimilarity2Percent = strSimilarity2Percent;