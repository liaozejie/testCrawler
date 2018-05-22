var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("./db.js");//数据操作模块引入
exports.removeRepeat = function(array){
    for(var j=0;j<array.length;j++){
        db.remove(dburl,dbName,collection,{
            "_id":array[j]
        },function(err,result){
            if(err){
                console.log(err);
            }
            console.log("删除成功");
        });
    }
}