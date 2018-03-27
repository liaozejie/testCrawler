var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var targetUrl = 'https://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E6%B7%B1%E5%9C%B3&sm=0&p=2';
superagent.get(targetUrl)
    .end(function (err, res) {
        if(err){
            return console.error(err);
        }
        var array = [];
        console.log(res.text);
        var $ = cheerio.load(res.text);
        var gsmc = $("td.gsmc a");
        var zwyx = $("td.zwyx");
        var gzdd = $("td.gzdd");
        var gxsj = $("td.gxsj span");
        var len = gsmc.length;
        var objArray = [];
        for(var i = 0;i<len;i++){
            var obj = {
                "公司":gsmc.eq(i).text(),
                "薪资范围":zwyx.eq(i).text(),
                "工作地点":gzdd.eq(i).text(),
                "发布状态":gxsj.eq(i).text()
            }
            objArray.push(obj);
        }
        console.log(objArray);
    });