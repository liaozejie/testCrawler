var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var collection2 = "data2";
var db = require("./db.js");//数据操作模块引入
var match = require("./strSimilarity2Percent");
var removeRepeat = require("./removeRepeated");
var hashMap = {
    Set : function(key,value){
        if(this.Contains(key)){
            return _insertToArray(this[key],value);
        }else {
            this[key] = [];
            this[key].push(value);
            return true;
        }
    },
    Get : function(key){return this[key]},
    Contains : function(key){return this.Get(key)?true:false},
    Remove : function(key){delete this[key]}
}
db.find(dburl,dbName,collection,{},function(err,docs){
    var len = docs.length;
    var _idArray = [];
    for(var i=0;i<len;i++){
        if(hashMap.Set(docs[i]["公司名称"]+docs[i]["工作地点"].substr(0,2),docs[i]["职位名称"])){
            _idArray.push(docs[i]);
        }
    }
    db.insertMany(dburl,dbName,collection2,_idArray,function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result);
    })
});
function _insertToArray(array,value){
    var len = array.length;
    var isInsert = false;
    if(len === 0){
        array.push(value);
        isInsert = true;
    }else{
        for(var i=0;i<len;i++){
            if(match.strSimilarity2Percent(value,array[i]) > 0.9){
                break;
            }else{
                continue;
            }
        }
        if(i == len){
            array.push(value);
            isInsert = true;
        }
    }
    return isInsert;
}
