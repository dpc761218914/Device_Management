/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');

var Device=mongoose.model('Device');


//按照区域获取设备信息
exports.getDevicesByAddressCode= function(req, res) {
    //获取当前页
    var addressCode=req.body.addressCode;
    Device.find({addressCode:addressCode}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"查找设备失败"});
        }
        res.json({"status":"success","data":docs});
    })
};

//通过设备id获取某一个设备的柱子信息;
exports.getdeviceByDeviceId= function(req, res) {
    var deviceId=req.body.deviceId;
    Device.findOne({_id:deviceId},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.deviceInfo});
        }
    });
};

//获取某一个用户
exports.getDevice= function(req, res) {
    var id=req.params.id;
    Device.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

//删除某一个用户
exports.delOne= function(req, res) {
    var id=req.body.id;
    Device.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });
};

//添加一个设备
exports.addOne= function(req, res) {

    var deviceName=req.body.deviceName;
    var workStatus=req.body.workStatus;
    var constructDep=req.body.constructDep;
    var constructTime=req.body.constructTime;
    var maintenanceMan=req.body.maintenanceMan;
    var deviceCode=req.body.deviceCode;
    var maintenancePhone=req.body.maintenancePhone;
    var addressCode=req.body.addressCode;
    var jingdu=req.body.jingdu;
    var weidu=req.body.weidu;

    var newDevice=new Device(
        {
            //设备名称
            deviceName:deviceName,
            //工作状态
            workStatus:workStatus,
            //施工单位
            constructDep:constructDep,
            //施工时间
            constructTime:constructTime,
            //维护人员
            maintenanceMan:maintenanceMan,
            //设备编号
            deviceCode:deviceCode,
            //维护电话
            maintenancePhone:maintenancePhone,
            //区域代码
            addressCode:addressCode,
            //经度
            jingdu:jingdu,
            //纬度
            weidu:weidu,
            //工作状态
            workStatus:workStatus
        }
    );
    newDevice.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            console.log("success add device");
            res.json({"status":"success",device_id:newDevice._id});
        }
    });
};

exports.adddeviceByDeviceId= function(req, res) {

    var device_id=req.body.device_id;
    var deviceNumber=req.body.deviceNumber;
    var deviceOne=req.body.deviceOne;
    var deviceOneIp=req.body.deviceOneIp;
    var deviceTwo=req.body.deviceTwo;
    var deviceTwoIp=req.body.deviceTwoIp;

    // 向自文档中添加数据
    var conditions ={_id : device_id};
    var update     ={$push : {deviceInfo:{deviceNumber:deviceNumber,
                                         deviceOne:deviceOne,
                                         deviceOneIp:deviceOneIp,
                                         deviceTwo:deviceTwo,
                                         deviceTwoIp:deviceTwoIp}
                                        }};
    Device.update(conditions, update, function(error){
        if(error) {
            res.json({"status":"error"});
        } else {
            //查找所有柱子信息
            Device.findOne({_id:device_id},function(err,doc){
                if(err){
                    res.json({"status":"error"});
                }else{
                    res.json({"status":"success","data":doc.deviceInfo})
                }
            });
        }
    });
};

//更新某个用户
exports.updateUser= function(req, res) {
        var id=req.params.id;
        var username=req.body.username;
        console.log(username);
        var password=req.body.password;
        console.log(password);
        // 修改记录
        var conditions ={_id : id};
        var update     ={$set : {username:username, password : password}};
        var options    = {upsert : true};
        Device.update(conditions, update, options, function(error){
            if(error) {
                res.json({"status":"error"});
            } else {
                res.json({"status":"success"});
            }
        });
};












