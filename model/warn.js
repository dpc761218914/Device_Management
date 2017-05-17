/**
 * Created by Administrator on 2017/5/12 0012.
 */
var mongoose=require('mongoose');

var  warnschema=new mongoose.Schema({

    //路口id
    lukouId:String,
    //报障人员
    warningMan:String,
    //报障人电话
    warningPhone:String,
    //记录时间
    recordTime:String,
    //故障问题
    warnProblem:String,
    //报障备注信息
    warnRemark:String,
    //路口名称
    lukouName:String,
    //所属区编号
    addressCode:String,

    //维护人员
    maintenanceMan:String,
    //维护人员电话
    maintenancePhone:String,
    //维修人备注信息
    remarkMessage:String,
    //报障状态
    warnStatus:String,
});

mongoose.model('Warn',warnschema);