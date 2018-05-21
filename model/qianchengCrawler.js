var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var targetUrl = 'https://m.51job.com/search/joblist.php?lonlat=0%2C0&radius=-1&pageno=';
var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("./db.js");//数据操作模块引入
for(var j=1;j<=200;j++){
    superagent.get(targetUrl+j).end(function (err, res) {
        if(err){
            return console.error(err);
        }
        var array = [];
        var $ = cheerio.load(res.text);
        var list = $(".items a");
        for(var i=0;i<list.length;i++){
            var obj={
                "职位名称":list.find("span").eq(i).text(),
                "公司名称":list.find("aside").eq(i).text(),
                "工作地点":list.find("i").eq(i).text(),
                "薪资范围":list.find("em").eq(i).text(),
                "发布时间": new Date(),
                "岗位职责":list.eq(i).attr("href")
            }
            /*console.log(obj);*/
            /*db.insertOne(dburl,dbName,collection,obj,function(err,result){
            });*/
            array.push(obj);
        }
        db.insertMany(dburl,dbName,collection,array,function(err,result){

        });
        /*console.log(array.length);
        console.log(array);*/

    });
}
