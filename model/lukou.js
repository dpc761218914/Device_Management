/**
 * Created by 1 on 2016/5/16.
 * 路口对象实体类
 */
var mongoose=require('mongoose');

var  lukouschema=new mongoose.Schema({
    //设备名称
    lukouName:String,
    //工作状态
    lukouStatus:String,
    //施工单位
    constructDep:String,
    //施工时间
    constructTime:String,
    //维护人员
    maintenanceMan:String,
    //设备编号
    lukouCode:String,
    //维护电话
    maintenancePhone:String,
    //所属区域代码
    addressCode:String,
    //经度
    jingdu:String,
    //纬度
    weidu:String,
    deviceInfo:[{
        //柱子编号
        deviceNumber:String,
        //主柱子
        deviceOne:String,
        //副柱子
        deviceTwo:String,
        //主柱子IP
        deviceOneIp:String,
        //副柱子IP
        deviceTwoIp:String,
        /*设备设置开始-------------*/
        //开机时间
        startTime:String,
        //关机时间
        endTime:String,
        //音量
        volume:String,
        //正常音量
        normalVolume:String,
        //大音量
        bigVolume:String,
        //6组大音量
        team1_am:String,
        team1_pm:String,
        team2_am:String,
        team2_pm:String,
        team3_am:String,
        team3_pm:String,
        team4_am:String,
        team4_pm:String,
        team5_am:String,
        team5_pm:String,
        team6_am:String,
        team6_pm:String,
        /*设备设置结束-------------*/
    }],
});

mongoose.model('Lukou',lukouschema);