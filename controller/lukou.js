/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');
//批量操作
var EventProxy  = require('eventproxy');
var ep = new EventProxy();

var Lukou=mongoose.model('Lukou');

//分页按照区域获取设备信息
exports.getLukousByAddressCode= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    var addressCode=req.body.addressCode;
    console.log(curr);
    console.log(addressCode);
    //每页大小为10
    var query=Lukou.find({});
    //根据关键字查询
    query.where('addressCode', addressCode);
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.json({status:"error"});
        }else{
            //计算数据总数
            Lukou.find({ 'addressCode': addressCode },function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={status:"success",data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};


//通过路口id获取路口详细信息
exports.getLukouByLukouId= function(req, res) {
    var lukou_id=req.body.lukou_id;
    Lukou.findOne({_id:lukou_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","lukouName":doc.lukouName,"maintenancePhone":doc.maintenancePhone,
                "constructDep":doc.constructDep,"constructTime":doc.constructTime,"maintenanceMan":doc.maintenanceMan,
                "deviceInfo":doc.deviceInfo,"addressCode":doc.addressCode});
        }
    });
};

//获取某一个路口
exports.getLukou= function(req, res) {
    var id=req.params.id;
    Lukou.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

//删除某一个路口
exports.delOne= function(req, res) {
    var id=req.body.id;
    Lukou.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });
};

//添加一个路口
exports.addLukou= function(req, res) {
    var lukouName=req.body.lukouName;
    var lukouStatus=req.body.lukouStatus;
    var constructDep=req.body.constructDep;
    var constructTime=req.body.constructTime;
    var maintenanceMan=req.body.maintenanceMan;
    var lukouCode=req.body.lukouCode;
    var maintenancePhone=req.body.maintenancePhone;
    var addressCode=req.body.addressCode;
    var jingdu=req.body.jingdu;
    var weidu=req.body.weidu;

    var newLukou=new Lukou(
        {
            lukouName:lukouName,
            lukouStatus:lukouStatus,
            //施工单位
            constructDep:constructDep,
            //施工时间
            constructTime:constructTime,
            //维护人员
            maintenanceMan:maintenanceMan,
            lukouCode:lukouCode,
            //维护电话
            maintenancePhone:maintenancePhone,
            //区域代码
            addressCode:addressCode,
            //经度
            jingdu:jingdu,
            //纬度
            weidu:weidu,
        }
    );
    newLukou.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            console.log("success add device");
            res.json({"status":"success",lukou_id:newLukou._id});
        }
    });
};

//根据路口信息添加柱子
exports.addDeviceByLukouId= function(req, res) {
    var lukou_id=req.body.lukou_id;
    var deviceNumber=req.body.deviceNumber;
    var deviceOne=req.body.deviceOne;
    var deviceOneIp=req.body.deviceOneIp;
    var deviceTwo=req.body.deviceTwo;
    var deviceTwoIp=req.body.deviceTwoIp;
    // 向自文档中添加数据
    var conditions ={_id : lukou_id};
    var update     ={$push : {deviceInfo:{deviceNumber:deviceNumber,
                                          deviceOne:deviceOne,
                                         deviceOneIp:deviceOneIp,
                                         deviceTwo:deviceTwo,
                                      deviceTwoIp:deviceTwoIp}
                                        }};
    Lukou.update(conditions, update, function(error){
        if(error) {
            res.json({"status":"error"});
        } else {
            //查找所有柱子信息
            Lukou.findOne({_id:lukou_id},function(err,doc){
                if(err){
                    res.json({"status":"error"});
                }else{
                    res.json({"status":"success","data":doc.deviceInfo})
                }
            });
        }
    });
};

/*交警后台接口*/
//分页按照交警信息获取路口信息
exports.getLukousByPoliceAddressCode= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    var addressCode=req.session.user.addressCode;
    console.log(curr);
    console.log(addressCode);
    //每页大小为10
    var query=Lukou.find({});
    //根据关键字查询
    query.where('addressCode', addressCode);
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.json({status:"error"});
        }else{
            //计算数据总数
            Lukou.find({ 'addressCode': addressCode },function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={status:"success",data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};


//根据路口信息修改设备信息
exports.updateDeviceByDeviceId= function(req, res) {

    var lukou_id=req.body.lukou_id;
    var device_id=req.body.device_id;

    var startTime=req.body.startTime;
    var endTime=req.body.endTime;

    console.log("pu tong she zhi");

    console.log("startTime___"+startTime);
    console.log("endTime___"+endTime);

    console.log("lukou_id--"+lukou_id);
    console.log("device_id--"+device_id);

    var team1_am=req.body.team1_am;
    var team1_pm=req.body.team1_pm;
    var team2_am=req.body.team2_am;
    var team2_pm=req.body.team2_pm;
    var team3_am=req.body.team3_am;
    var team3_pm=req.body.team3_pm;
    var team4_am=req.body.team4_am;
    var team4_pm=req.body.team4_pm;
    var team5_am=req.body.team5_am;
    var team5_pm=req.body.team5_pm;
    var team6_am=req.body.team6_am;
    var team6_pm=req.body.team6_pm;

    var volume=req.body.volume;
    var normalVolume=req.body.normalVolume;
    var bigVolume=req.body.bigVolume;



    Lukou.findOne({_id:lukou_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
           for(var i=0;i<doc.deviceInfo.length;i++){
               if(doc.deviceInfo[i]._id==device_id){
                   console.log("find success"+doc.deviceInfo[i].deviceOne);
                   doc.deviceInfo[i].startTime=startTime;
                   doc.deviceInfo[i].endTime=endTime;

                   doc.deviceInfo[i].team1_am=team1_am;
                   doc.deviceInfo[i].team1_pm=team1_pm;
                   doc.deviceInfo[i].team2_am=team2_am;
                   doc.deviceInfo[i].team2_pm=team2_pm;
                   doc.deviceInfo[i].team3_am=team3_am;
                   doc.deviceInfo[i].team3_pm=team3_pm;
                   doc.deviceInfo[i].team4_am=team4_am;
                   doc.deviceInfo[i].team4_pm=team4_pm;
                   doc.deviceInfo[i].team5_am=team5_am;
                   doc.deviceInfo[i].team5_pm=team5_pm;
                   doc.deviceInfo[i].team6_am=team6_am;
                   doc.deviceInfo[i].team6_pm=team6_pm;

                   doc.deviceInfo[i].volume=volume;
                   doc.deviceInfo[i].normalVolume=normalVolume;
                   doc.deviceInfo[i].bigVolume=bigVolume;

                   doc.save(function(err){
                       if(err){
                           res.json({"status":"error"})
                       }else{
                           console.log("updateDeviceByLukouId___update data success");
                           res.json({"status":"success"})
                       }
                   });
               }
            }

        }
    });



};

//通过路口id和设备id获取某一个设备的设备信息;
exports.getDeviceInfoByDeviceId= function(req, res) {
    var lukou_id=req.body.lukou_id;
    var device_id=req.body.device_id;
    Lukou.findOne({_id:lukou_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            for(var i=0;i<doc.deviceInfo.length;i++){
                if(doc.deviceInfo[i]._id==device_id){
                    res.json({"status":"success",data:doc.deviceInfo[i]});
                }
            }
        }
    });
};

//路口设备批量设置
exports.updateBatchDeviceByDeviceId= function(req, res) {

    console.log("pi liang she zhi");

    var lukou_id=req.body.lukou_id;

    var startTime=req.body.startTime;
    var endTime=req.body.endTime;

    var team1_am=req.body.team1_am;
    var team1_pm=req.body.team1_pm;
    var team2_am=req.body.team2_am;
    var team2_pm=req.body.team2_pm;
    var team3_am=req.body.team3_am;
    var team3_pm=req.body.team3_pm;
    var team4_am=req.body.team4_am;
    var team4_pm=req.body.team4_pm;
    var team5_am=req.body.team5_am;
    var team5_pm=req.body.team5_pm;
    var team6_am=req.body.team6_am;
    var team6_pm=req.body.team6_pm;

    var volume=req.body.volume;
    var normalVolume=req.body.normalVolume;
    var bigVolume=req.body.bigVolume;

    Lukou.findOne({_id:lukou_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{

            //循环添加后执行。
            ep.after('data_save', doc.deviceInfo.length, function () {
                // 在所有文件的异步执行结束后将被执行
                res.json({"status":"success"});
            });

            for(var i=0;i<doc.deviceInfo.length;i++){
                    console.log("find success"+doc.deviceInfo[i].deviceOne);
                    doc.deviceInfo[i].startTime=startTime;
                    doc.deviceInfo[i].endTime=endTime;

                    doc.deviceInfo[i].team1_am=team1_am;
                    doc.deviceInfo[i].team1_pm=team1_pm;
                    doc.deviceInfo[i].team2_am=team2_am;
                    doc.deviceInfo[i].team2_pm=team2_pm;
                    doc.deviceInfo[i].team3_am=team3_am;
                    doc.deviceInfo[i].team3_pm=team3_pm;
                    doc.deviceInfo[i].team4_am=team4_am;
                    doc.deviceInfo[i].team4_pm=team4_pm;
                    doc.deviceInfo[i].team5_am=team5_am;
                    doc.deviceInfo[i].team5_pm=team5_pm;
                    doc.deviceInfo[i].team6_am=team6_am;
                    doc.deviceInfo[i].team6_pm=team6_pm;

                    doc.deviceInfo[i].volume=volume;
                    doc.deviceInfo[i].normalVolume=normalVolume;
                    doc.deviceInfo[i].bigVolume=bigVolume;

                    doc.save(function(err){
                        if(err){
                            res.json({"status":"error"});
                        }else{
                            console.log("save success");
                            ep.emit('data_save');
                        }
                    });
            }
        }
    });
};
















