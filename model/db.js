/*
* 数据库操作（连接、增删改查）
* */
var MongoClient = require("mongodb").MongoClient;
//连接数据库
function __Connect(url,callback){
    MongoClient.connect(url,function(err,client){
        callback(err,client);
    })
}
//插入一条数据
exports.insertOne = function(url,dbName,collection,data,callback){
    __Connect(url,function(err,client){
        var db = client.db(dbName);
        db.collection(collection).insertOne(data,function(err,result){
            callback(err,result);
        })
    });
}
//插入多条数据
exports.insertMany = function(url,dbName,collection,array,callback){
    __Connect(url,function(err,client){
       var db = client.db(dbName);
       db.collection(collection).insertMany(array,function(err,result){
           callback(err,result);
           client.close();
       })
    });
}
//按条件查找数据
exports.find = function(url,dbName,collection,condition,callback){
    __Connect(url,function(err,client){
       var db = client.db(dbName);
       db.collection(collection).find(condition).toArray(function(err,docs){
           callback(err,docs);
           client.close();
       })
    });
}
//更新数据
exports.update = function(url,dbName,collection,condition,data,callback){
    __Connect(url,function(err,client){
        var db = client.db(dbName);
        db.collection(collection).updateOne(condition,{$set:data},function(err,result){
           callback(err,result);
        });
    });
}
//删除数据
exports.remove = function(url,dbName,collection,condition,callback){
    __Connect(url,function(err,client){
       var db = client.db(dbName);
       db.collection(collection).removeOne(condition,function(err,result){
           callback(err,result);
           client.close();
       })
    });
}