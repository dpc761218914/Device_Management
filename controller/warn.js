/**
 * Created by Administrator on 2017/5/13 0013.
 */

// index page
var mongoose=require('mongoose');
var Warn=mongoose.model('Warn');
var Lukou=mongoose.model('Lukou');

//根据路口信息添加报障
exports.addWarnByLukouId= function(req, res) {

    var lukou_id=req.body.lukou_id;
    console.log("lukou_id==="+lukou_id);
    var warningMan=req.body.warningName;
    var warningPhone=req.body.warningPhone;
    var recordTime=req.body.recordTime;
    var warnProblem=req.body.warnProblem;
    var warnRemark=req.body.warnRemark;
    var lukouName=req.body.lukouName;
    //添加所属区编号
    var addressCode=req.body.addressCode;


    console.log("warnProblem=="+warnProblem);
    console.log("warnRemark=="+warnRemark);

    // 向自文档中添加数据
    var newWarn=new Warn(
        {
            //路口id
            lukouId:lukou_id,
            //报障人姓名
            warningMan:warningMan,
            //报障人电话
            warningPhone:warningPhone,
            //记录时间
            recordTime:recordTime,
            //报障问题
            warnProblem:warnProblem,
            //报障备注,
            warnRemark:warnRemark,
            //路口名称
            lukouName:lukouName,
            //路口状态
            warnStatus:0,
            //所属区编号
            addressCode:addressCode
        }
    );
    newWarn.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{

            // 向路口文档中更改数据
            var conditions ={_id : lukou_id};
            /*右正常修改为发生故障*/
            var update     ={lukouStatus:2};
            Lukou.update(conditions, update, function(error){
                if(error) {
                    res.json({"status":"error"});
                } else {
                    //查找所有柱子信息
                    Lukou.findOne({_id:lukou_id},function(err){
                        if(err){
                            res.json({"status":"error"});
                        }else{
                            res.json({"status":"success"});
                        }
                    });
                }
            });
        }
    });

};

//根据路口信息添加维修人员信息，同时修改路口状态
exports.updateServiceByProblemId= function(req, res) {
    var problem_id=req.body.problem_id;
    console.log("problem_id--"+problem_id);

    var maintenanceMan=req.body.maintenanceMan;
    var maintenancePhone=req.body.maintenancePhone;
    var remarkMessage=req.body.remarkMessage;
    console.log("find warn success--"+problem_id);

    var conditions ={_id : problem_id};
    var update ={maintenanceMan:maintenanceMan,maintenancePhone:maintenancePhone,
    remarkMessage:remarkMessage,warnStatus:1};
    Warn.update(conditions, update, function(error,doc) {
        if (error) {
            res.json({"status": "error"});
        } else {
            Warn.findOne({_id:problem_id},function(err,doc){
                if(err){
                    res.json({"status":"error"});
                }else{
                    console.log("update warn success lukouId--"+ doc.lukouId);
                    // 修改路口状态
                    var conditions ={_id : doc.lukouId};
                    //修改为维护中
                    var update     ={lukouStatus:"1"};
                    Lukou.update(conditions, update, function(error){
                        if(error) {
                            res.json({"status":"error"});
                        } else {
                            //修改路口状态
                            console.log("update lukou success--");
                            res.json({"status":"success"});
                        }
                    });
                }
            });
        }
    });
};

//根据路口id获取报障人信息
exports.getWarnsByAddressCode= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    console.log("curr=="+curr);
    //type值为0,1，all
    var type=req.body.type;

    console.log("type=="+type);
    var addressCode=req.body.addressCode;
    console.log(curr);
    console.log(addressCode);
    var query;
    if(type=="all"){
        //每页大小为10
        query=Warn.find({});
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
                Warn.find({'addressCode':addressCode},function(err,result){
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
    }else{
        query=Warn.find({warnStatus:type});
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
                Warn.find({warnStatus:type,addressCode:addressCode},function(err,result){
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
    }

};

//通过路口id获取某一个报障信息;
exports.getWarnMsgByWarnId= function(req, res) {
    var problem_id=req.body.problem_id;

    console.log("problem_id"+problem_id);

    Warn.findOne({_id:problem_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","lukouName":doc.lukouName,"warningMan":doc.warningMan,
                "warningPhone":doc.warningPhone});
        }
    });
};

//交警用户获得报障列表
exports.getPoliceWarnByAddressCode= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    var addressCode=req.session.user.addressCode;
    //type值为0,1，all
    var type=req.body.type;

    console.log("type=="+type);
    //var addressCode=req.body.addressCode;
    console.log(curr);
    //console.log(addressCode);
    var query;
    if(type=="all"){
        //每页大小为10
        query=Warn.find({addressCode:addressCode});
        //根据关键字查询
        //query.where('addressCode', addressCode);
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
                Warn.find({addressCode:addressCode},function(err,result){
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
    }else{
        query=Warn.find({warnStatus:type,addressCode:addressCode});
        //根据关键字查询
        //query.where('addressCode', addressCode);
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
                Warn.find({warnStatus:type,addressCode:addressCode},function(err,result){
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
    }

};


//通过路口id获取某一个报障信息;
exports.getWarnAllMsgByWarnid= function(req, res) {
    var problem_id=req.body.problem_id;
    console.log("problem_id"+problem_id);
    Warn.findOne({_id:problem_id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","result":doc});
        }
    });
};


//处理中，修改报障记录和路口记录。
exports.updateWarnDealToWaitByProblemId= function(req, res) {
    var problem_id=req.body.problem_id;
    console.log("problem_id--"+problem_id);

    var conditions ={_id : problem_id};
    var update ={warnStatus:2};
    Warn.update(conditions, update, function(error) {
        if (error) {
            res.json({"status": "error"});
        } else {
            Warn.findOne({_id:problem_id},function(err,doc){
                if(err){
                    res.json({"status":"error"});
                }else{
                    console.log("update warn success lukouId--"+ doc.lukouId);
                    // 修改路口状态
                    var conditions ={_id : doc.lukouId};
                    //修改状态为维护中
                    var update  ={lukouStatus:"0"};
                    Lukou.update(conditions, update, function(error){
                        if(error) {
                            res.json({"status":"error"});
                        } else {
                            //修改路口状态
                            console.log("update lukou success--");
                            res.json({"status":"success"});
                        }
                    });
                }
            });
        }
    });
};