var match = require("./model/strSimilarity2Percent");
var hashMap = {
    Set : function(key,value){
        if(this.Contains(key)){
            /*this[key].push(value);*/
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
var obj1={
    "_id" : "5affa0527331ad3b94544134",
    "公司名称" : "深圳市美缘聚合婚姻介绍服务有限公司",
    "职位名称" : "百合网销售顾问/红娘",
    "薪资范围" : "10001-15000",
    "工作地点" : "深圳-福田区",
    "发布时间" : "2018-05-19T03:55:43.695Z",
    "岗位职责" : "http://jobs.zhaopin.com/524540086250073.htm"
}

/* 7 */
var obj2={
    "_id" : "5affa0527331ad3b94544135",
    "公司名称" : "深圳市美缘聚合婚姻介绍服务有限公司",
    "职位名称" : "百合网大客户销售专员",
    "薪资范围" : "10001-15000",
    "工作地点" : "深圳",
    "发布时间" : "2018-05-19T03:55:43.695Z",
    "岗位职责" : "http://jobs.zhaopin.com/CC524540086J00095391401.htm"
}

/* 3 */
var obj3={
    "_id" : "5affa0527331ad3b94544131",
    "公司名称" : "深圳文通区块链科技有限公司",
    "职位名称" : "美工设计",
    "薪资范围" : "5000-8000",
    "工作地点" : "深圳",
    "发布时间" : "2018-05-19T03:55:43.694Z",
    "岗位职责" : "http://jobs.zhaopin.com/CZ635909780J00111183303.htm"
}

/* 4 */
var obj4={
    "_id" : "5affa0527331ad3b94544132",
    "公司名称" : "深圳市乐亿电子科技有限公司",
    "职位名称" : "业务经理",
    "薪资范围" : "20001-30000",
    "工作地点" : "深圳",
    "发布时间" : "2018-05-19T03:55:43.694Z",
    "岗位职责" : "http://jobs.zhaopin.com/CZ409120210J00061043506.htm"
}
console.log(hashMap.Set(obj1["公司名称"]+obj1["工作地点"].substr(0,2),obj1["职位名称"]));
console.log(hashMap.Set(obj2["公司名称"]+obj2["工作地点"].substr(0,2),"百合网销售顾问/红娘"));
console.log(hashMap);

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