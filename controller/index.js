/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');
var Police=mongoose.model('Police');
var Admin=mongoose.model('Admin');

//主页面
exports.index= function(req, res) {
    res.render('index');
};

//登录界面
exports.login= function(req, res) {
    res.render('login');
};

//进行登录响应
exports.toLogin= function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;

    if(captcha!=req.session.captcha){
        console.log('captcha error');
        res.json({'status':'captcha error'});
    }else{ //验证码正确
           //如果是交警用户，则进行交警用户查询
            Police.findOne({username:username},function(err,doc){
                if(err){
                    console.log('error');
                    res.json({'status':'error'});
                }
                else if(doc==null){
                    //police中没有就去admin中查找用户
                    Admin.findOne({username:username},function(err,doc){
                        if(err){
                            console.log('error');
                            res.json({'status':'error'});
                        }
                        else if(doc==null){
                            console.log('not exist');
                            res.json({'status':'not exist'})
                        }
                        else if(doc.password===password){
                            console.log('success');
                            //登录成功，将user保存到session中
                            req.session.user = doc;
                            res.json({'status':'admin','username':doc.username});
                        }else{
                            console.log('password error');
                            res.json({'status':'password error'});
                        }
                    }
                    );
                }else if(doc.password===password){
                    console.log('success');
                    //登录成功，将user保存到session中
                    req.session.user = doc;
                    res.json({'status':'police','username':doc.username});
                }else{
                    console.log('password error');
                    res.json({'status':'password error'});
                }
            });
        }
};

//用户登出操作
exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/login');
};

//交警用户主页面
exports.index_police= function(req, res) {
    res.render('index_police');
};













