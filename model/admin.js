/**
 * 交警用户 Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  adminschema=new mongoose.Schema({
    username:String,
    password:String,
    phone:String,
    realname:String,
    createTime:String,
});

mongoose.model('Admin',adminschema);