/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');


var Admin=mongoose.model('Admin');


//获取所用公司管理员信息
exports.getCompanys= function(req, res) {
    //获取当前页
    var curr=req.body.curr;
    //每页大小为10
    var query=Admin.find({});
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
            Admin.find(function(err,result){
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
exports.addCompany= function(req, res) {

    var username=req.body.username;
    var phone=req.body.phone;
    var password=req.body.password;
    var realname=req.body.realname;
    var createTime=req.body.createTime;

    var data=new Admin(
        {
            username:username,
            phone:phone,
            password:password,
            realname:realname,
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
    Admin.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            Admin.remove({_id:id},function(err,doc){
                    if(err){
                        res.json({"status":"error"});
                    }else{
                        res.json({"status":"success"})
                    }
                });
            }
    });
};

