var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("./db.js");//数据操作模块引入
for(var j=1,targetUrl = 'https://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E6%B7%B1%E5%9C%B3&sm=0&p='
;j<=200;j++){
    superagent.get(targetUrl+j).end(function (err, res) {
        if(err){
            return console.error(err);
        }
        var array=[];
        var $ = cheerio.load(res.text);
        var zwmc = $("td.zwmc div a");
        var gsmc = $("td.gsmc");
        var zwyx = $("td.zwyx");
        var gzdd = $("td.gzdd");
        var len = zwmc.length;
        for(var i = 0;i<len;i++){
            var obj = {
                "公司名称": gsmc.eq(i).find("a").eq(0).text(),
                "职位名称": zwmc.eq(i).text(),
                "薪资范围": zwyx.eq(i).text(),
                "工作地点": gzdd.eq(i).text(),
                "发布时间": new Date(),
                "岗位职责":zwmc.eq(i).attr("href")
            }
            array.push(obj);
        }
        db.insertMany(dburl,dbName,collection,array,function(err,result){

        });
    });
}
