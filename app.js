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
        var $ = cheerio.load(res.text);
        $()
    });