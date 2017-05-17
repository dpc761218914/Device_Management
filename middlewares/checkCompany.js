/**
 * Created by Administrator on 2017/5/9 0009.
 * 校验用户是否是公司用户的中间件
 */
module.exports = {
    checkCompany: function checkIsCompany(req, res, next) {
        if (!req.session.user) {
            console.log("公司用户未登录");
            return res.redirect('/login');
        }
        next();
    },

    checkNotCompany: function checkNotCompany(req, res, next) {
        if (req.session.user) {
            console.log("公司用户已经登录");
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};