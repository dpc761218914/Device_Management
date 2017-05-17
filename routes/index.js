var Index = require('../controller/index');
var Lukou = require('../controller/lukou');
var Police = require('../controller/police');
var Admin = require('../controller/admin');
var Warn = require('../controller/warn');
var checkCompany = require('../middlewares/checkCompany').checkCompany;

module.exports = function(app) {
  // 主页面 app.get('/index',checkCompany,Index.index);
  app.get('/index',Index.index);
  //交警用户主界面
  app.get('/index_police',Index.index_police);
  // 进入登录界面
  app.get('/login', Index.login);
  // 发送登录请求
  app.post('/login', Index.toLogin);
  //退出操作
  app.get('/logout', Index.logout);

  // 添加路口信息
  app.post('/add_lukou',Lukou.addLukou);
  // 根据所属区编号获取路口信息
  app.post('/get_lukous_by_addressCode', Lukou.getLukousByAddressCode);
  // 根据路口id获取设备信息
  app.post('/get_lukou_by_lukouId',Lukou.getLukouByLukouId);
  // 根据路口id添加设备
  app.post('/add_device_by_lukouId',Lukou.addDeviceByLukouId);

  //添加交警
  app.post('/add_police', Police.addPolice);
  // 根据所属区编号获取交警列表
  app.post('/get_polices_by_addressCode', Police.getPolicesByAddressCode);

  //添加公司用户
  app.post('/add_company', Admin.addCompany);
  //分页获取管理员列表
  app.post('/get_Companys', Admin.getCompanys);

  //更新路口某个设备参数信息
  app.post('/update_device_msg_by_deviceId', Lukou.updateDeviceByDeviceId);
  //获得路口id和设备id获取设备信息
  app.post('/get_device_msg_by_deviceId', Lukou.getDeviceInfoByDeviceId);
  //设置路口设备信息
  app.post('/update_batch_device_msg_by_deviceId', Lukou.updateBatchDeviceByDeviceId);


  //根据路口id添加报障
  app.post('/add_warn_by_lukouId',Warn.addWarnByLukouId);
  //根据报障id添加维修信息
  app.post('/update_service_by_problemId',Warn.updateServiceByProblemId);
  //获取报障记录列表信息
  app.post('/get_warns_by_addressCode', Warn.getWarnsByAddressCode);
  //根据报障记录id获取报障记录信息详情
  app.post('/get_warn_msg_by_warnId',Warn.getWarnMsgByWarnId);
  //处理中，修改报障记录和路口记录。
  app.post('/update_warn_deal_to_wait',Warn.updateWarnDealToWaitByProblemId);
  //根据
  app.post('/get_warn_all_msg_by_warnId',Warn.getWarnAllMsgByWarnid);



  //交警用户获取所属区的路口信息
  app.post('/police/get_lukous_by_addressCode', Lukou.getLukousByPoliceAddressCode);
  //交警用户获取报障列表
  app.post('/police/get_warns_by_addressCode', Warn.getPoliceWarnByAddressCode);


};