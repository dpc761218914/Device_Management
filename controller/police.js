/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');


var Police=mongoose.model('Police');

//根据所需区编号获取所有交警信息
exports.getPoliceByAddressCode= function(req, res) {
    Police.find({}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"查找管理员失败"});
        }
        res.json({"status":"success","data":docs});
    })
};

//分页根据所需区编号获取所有交警信息
exports.getPolicesByAddressCode= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    var addressCode=req.body.addressCode;

    console.log(curr);
    console.log(addressCode);

    //每页大小为10
    var query=Police.find({});
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
            Police.find({ 'addressCode': addressCode },function(err,result){
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

//添加一个交警
exports.addPolice= function(req, res) {

    var username=req.body.username;
    var phone=req.body.phone;
    var password=req.body.password;
    var realname=req.body.realname;
    var addressCode=req.body.addressCode;
    var createTime=req.body.createTime;

    var data=new Police(
        {
            username:username,
            phone:phone,
            password:password,
            realname:realname,
            addressCode:addressCode,
            createTime:createTime
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};

//删除一个管理员
exports.delOne= function(req, res) {

    var id=req.body.id;
    Police.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
                admin.remove({_id:id},function(err,doc){
                    if(err){
                        res.json({"status":"error"});
                    }else{
                        res.json({"status":"success"})
                    }
                });
            }
    });

};

