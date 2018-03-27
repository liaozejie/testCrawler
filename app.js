var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var targetUrl = 'https://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E6%B7%B1%E5%9C%B3&sm=0&p=2';
var dburl = "mongodb://localhost:27017";//数据库地址
var dbName = "jobCrawler";//数据库名
var collection = "data";//集合名
var db = require("./model/db.js");//数据操作模块引入
superagent.get(targetUrl)
    .end(function (err, res) {
        if(err){
            return console.error(err);
        }
        var array = [];
        var $ = cheerio.load(res.text);
        var zwmc = $("td.zwmc div a");
        var gsmc = $("td.gsmc a");
        var zwyx = $("td.zwyx");
        var gzdd = $("td.gzdd");
        var gxsj = $("td.gxsj span");
        var len = gsmc.length;
        for(var i = 0;i<len;i++){
            if(gsmc.eq(i).text()&&zwmc.eq(i).text()&&zwyx.eq(i).text()&&gzdd.eq(i).text()&&gxsj.eq(i).text()){
                var obj = {
                    "公司":gsmc.eq(i).text(),
                    "职位":zwmc.eq(i).text(),
                    "薪资范围":zwyx.eq(i).text(),
                    "工作地点":gzdd.eq(i).text(),
                    "发布时间":new Date()
                }
                db.insertOne(dburl,dbName,collection,obj,function(err,result){
                    console.log(result);
                })
            }
        }
    });