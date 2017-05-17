/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');
var config=require('./db_url.js');

module.exports=function(){
    var db=mongoose.connect(config.mongodb);
    require('../model/lukou.js');
    require('../model/police.js');
    require('../model/admin.js');
    require('../model/warn.js');
    return db;
}