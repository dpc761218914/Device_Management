##前言：
    最近根据朋友需求，需要开发一个设备管理系统，该系统的主要功能是对设备进行地图上的信息展示，根据地理位置添加路口信息，对不同的路口添加数量不等的设备信息，设备发生故障并进行申请。
    考虑node.js中许多现有的模块使用起来确实便捷，再配合前台json交互，由于数据格式的多样性和操作的便捷性选用了MongoDB作为存储数据库。  

相关工具：
- node 6.2.0
- mongodb3.2.6(64bit)
- Robomongo0.9.0-RC8
- webstrom11.0.1

##一、系统效果展示
####1.1、系统登录界面：  
（图片验证码）
![login.png](http://upload-images.jianshu.io/upload_images/2227968-171bfceaeb473e4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
####1.2、地图展示界面：    
（从MongoDB获取数据分类展示、左键弹窗，右键弹出菜单）
![地图展示.png](http://upload-images.jianshu.io/upload_images/2227968-c302c0ca290ea10f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 （分页展示数据列表，和地图展示在同一界面，地图有折叠效果，便于查看数据列表）
![数据列表.png](http://upload-images.jianshu.io/upload_images/2227968-0eda6ff55d5a0eb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（点击列表按钮，查看路口详细信息）
![路口详情页面.png](http://upload-images.jianshu.io/upload_images/2227968-89cff51a7a318d48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####1.3、添加地点界面：  
（添加路口信息，可以从地图上选取经纬度，动态录入到经纬度输入框中）

![添加路口信息.png](http://upload-images.jianshu.io/upload_images/2227968-4e4365d1b2b45744.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![添加路口的设备信息.png](http://upload-images.jianshu.io/upload_images/2227968-6d2a53607928e69a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####1.4、设备报障界面：  
（用户提交报障信息，提交后添加一条报障记录，并修改路口信息标志位）
![设备报障处理.png](http://upload-images.jianshu.io/upload_images/2227968-10f4cb43e64e55d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##二、网站整体结构
（express+mongoose+bootstrap+layui）

![项目结构图.png](http://upload-images.jianshu.io/upload_images/2227968-562cef2203fb01ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  

**1.1、服务端**
- express+mongoose:后台整体结构我直接参照之前写的一个express+mongoose实现增删改查的例子。[栗子在这儿](https://github.com/dpc761218914/express_restapi)
- express:一个node.js快速开发web应用的框架。
- mongoose：一个在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
- svg-captcha:node.js图片验证码模块。
-  express-session：用户登录登录以及图片验证码校验时session管理。           
- "eventproxy": "^0.3.5",解决异步处理问题。

**1.1、前端展示**
- Layui前端框架（会用到弹窗、分页、时间选择器、提示框的等）
- 高德地图JavaScript API

##三、主要功能
- 3.1、用户登录、图片验证码。
- 3.2、添加路口及设备信息，每个路口的设备数量不固定。主页面上的地图展示和列表展示需要有折叠功能便于信息的展示。
- 3.3、地图上通过点标注的方式展示路口信息，点击标注点左键，弹出设备基本信息，点击右键菜单可对路口对象进行操作。
- 3.4、单独和批量设置路口的设备基本信息，判断设备是否在线。

##四、开发流程
- 4.1、数据库设计及前台页面设计。
- 4.2、开发环境搭建，安装项目中涉及的到的依赖包，配置好路由及插件。
- 4.3、项目结构如图所示。

##五、前端页面部分代码说明：
- 5.1、图片验证码校验错误时自动刷新，同时验证码看不清时，点击图片验证码刷新，服务端通过svg-captcha实现图片验证码。  
```   
//前端验证码展示代码
<div class="layui-input-block"><!--图片验证码，点击图片实现刷新-->
							![](http://localhost/captcha)
							<input type="text" name="captcha" id="captcha" style="width: 60%" autocomplete="off" placeholder="请输入验证码" class="layui-input">
						</div>
```
```   
//服务端校验验证码错误后，实现验证码自动刷新
if(result.status==="captcha error"){
							layer.msg('验证码错误,请重新录入验证码');
							/*自动刷新图片*/
							$('#img').click();
						}
```   

- 5.2、关于项目的权限校验，未登录的用户不能进行相关操作。（参照开源项目N-bolg的权限控制模块：[N-blog源码](https://github.com/nswbmw/N-blog)）  

- 5.3、关于以及菜单和二级餐单有层次展示，由于是修改别人的导航菜单，因此需要分析子菜单布局，并对其修改。  
```
//分析navbar.js实现子菜单向右偏离40px
/*style="padding-left: 40px;设置子菜单向右偏离*/
ulHtml += '<a href="javascript:;" style="padding-left: 40px;" data-url="' + data[i].children[j].href + '">';
```
- 5.4、关于首页地图的折叠效果，由于地图和列表信息信息量过大，可对地图进行折叠处理。
```
//5.4.1 先添加一个按钮，其中是layui提供的向上指示的箭头。
<div class="layui-form-item">
						<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger" id="fold" style="height: 24px">
							<i class="layui-icon" ></i>
						</a>
</div>
//js隐藏和关闭地图div，并且修改按钮的样式，点击折叠和展开地图。（foldType是全局的折叠和展开的标志位）
				$('#fold').on('click', function() {
					if(foldType==="0"){
						foldType="1";
						$('#container').hide(1000);
						$('#fold').html("<i class='layui-icon' id='fold_type'></i>");
					}else if(foldType==="1"){
						foldType="0"
						$('#container').show(1000);
						$('#fold').html("<i class='layui-icon' id='fold_type'></i>");
					}
				});
```

- 5.5、省、市、区三级联动，同时设置默认的省、市、区（参考网上的例子：地址：[详细介绍在这儿](https://fly.layui.com/jie/8647.html)）

- 5.6、时间选择插件，不是很好用，默认是当前时间，凑合着吧，[插件地址](https://my.oschina.net/u/2480757/blog/896932)

- 5.7、Layui打开窗口动态传参问题，页面和弹窗之间传参。
```
//页面1：打开弹窗代码，动态拼接参数。
layer.open({
						type: 2,
						title: '报障信息',
						shadeClose: true,
						shade: 0.8,
						area: ['1050px', '600px'],
	content:'admin_lukou_add_warn.html?lukou_id='+lukou_id,//根据id查看某一个路口详情。
//页面2操作完成以后，通过end实现页面刷新。
						end:function() {
							getData("1");
						}
					});
//页面2：通过js获取页面1传过来的参数。
 //获取链接中参数的函数（例如：http://localhost/index?username=admin，获取username的值admin）
    $.getUrlParam = function (name) {
               var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
               var r = window.location.search.substr(1).match(reg);
               if (r != null) return unescape(r[2]); return null;
                }
         lukou_id = $.getUrlParam('lukou_id');
```

- 5.8、关于高德地图从本体数据库取出数据并以标注点的形式展示。这里主要运用高德地图JS_API，涉及的内容包括，（1）、动态从数据库取出数据在地图上分类标注。（2）、对标注点进行左键操作，让该点显示在地图的正中央，同时有信息窗体。（3）对标注点右键操作，生成菜单。
```
//从后台获取数据函数，获取根据区获取数据
				function getData(curr){
					$.post("/lukous",{addressCode:addressCode,curr:curr},function(result){
						//重新获取的时候需要清空地图上的marker信息
						map.remove(markers);
						//拼接html内容
						var tabContent="";
						//获取后台json数据
						var mydata=result.data;
						for(var i=0;i<mydata.length;i++){
							if(mydata[i].lukouStatus=="0"){
								/*添加蓝色地图markers表示正常*/
								marker = new AMap.Marker({
									map: map,
									/*进行序号排序*/
									icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b'+((curr-1)*10+i+1)+'.png',
									position: [mydata[i].jingdu, mydata[i].weidu],
								});
							}else{
								/*添加红色地图markers表示出错*/
								marker = new AMap.Marker({
									map: map,
									/*进行序号排序*/
									icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r'+((curr-1)*10+i+1)+'.png',
									position: [mydata[i].jingdu, mydata[i].weidu],
								});

							}
							if(mydata[i].lukouStatus=="0"){
								statusStr='<p>路口状态：正常 </p>';
							}if(mydata[i].lukouStatus=="1"){
								statusStr='<p>路口状态：<span style="color: red">维护中</span> </p>';
							}if(mydata[i].lukouStatus=="2"){
								statusStr='<p>路口状态：<span style="color: red">发生故障</span> </p>';
							}
							marker._id=mydata[i]._id;
							marker.status=mydata[i].lukouStatus;

							//设置点击鼠标左键弹出信息窗体的内容
							marker.content = '<p>路口名称：' +mydata[i].lukouName + '</p>'+
											'<p>维护人员：' +mydata[i].maintenanceMan + '</p>'+
									        '<p>联系电话：'+mydata[i].maintenancePhone +'</p>'+
						                 	'<p>设备数量：'+mydata[i].deviceInfo.length +'</p>'+statusStr;
							//点击左键
							marker.on('click', markerClick);
							//绑定鼠标右击事件——弹出右键菜单
							marker.on('rightclick', function(e) {
								//创建右键菜单
								var contextMenu = new AMap.ContextMenu();
								//菜单1
								contextMenu.addItem("设备报障", function() {
									if(e.target.status=="0"){
										layer.open({
											type: 2,
											title: '报障信息',
											shadeClose: true,
											shade: 0.8,
											area: ['1050px', '600px'],
											content:'admin_lukou_add_warn.html?lukou_id='+ e.target._id,//根据id查看某一个路口详情target是指所点击的marker对象。
											end:function() {
												getData("1");
											}
										});
									}else{
										layer.msg("该设备非正常，无需报障！");
									}
								}, 0);
								//菜单2
								contextMenu.addItem("状态检测", function() {
									/*测试接口是否联通*/
									layer.msg('批量测试该路口所有设备是否在线...', {
										icon: 16
										,shade: 0.01
									});
									setTimeout(function(){
										layer.msg('测试全部通过...');
									}, 2000);
								}, 1);
								//菜单3
								contextMenu.addItem("参数设置", function() {
									/*批量设置*/
									layer.open({
										type: 2,
										title: '设备参数批量设置',
										shadeClose: true,
										shade: 0.8,
										area: ['900px', '700px'],
										//将路口id和设备id都传过去
										content: 'admin_lukou_device_batch_setting.html?lukou_id='+e.target._id
									});
								}, 2);
								//打开弹出菜单
								contextMenu.open(map, e.lnglat);
							});


							if(mydata[i].lukouStatus=="0"){
								lukouStatusStr='<p>正常 </p>';
								problemStr='<td><span class="layui-btn layui-btn-primary layui-btn-mini" style="background-color: #6666cc;color: #ffffff">去报障</span></td>';
							}if(mydata[i].lukouStatus=="1"){
								lukouStatusStr='<p style="color: red">维护中 </p>';
								problemStr='<td><span>否</span></td>';
							}if(mydata[i].lukouStatus=="2"){
								lukouStatusStr='<p style="color: red">发生故障 </p>';
								problemStr='<td><span>否</span></td>';
							}
                            //将marker装入集合中
							markers.push(marker);
							//兴趣点自适应居中显示
							map.setFitView();
							/*添加到地图markers*/
							var tempStr='<tr id='+mydata[i]._id+'>'+
									'<td>'+((curr-1)*10+i+1)+'</td>'+
									'<td>'+mydata[i].lukouName+'</td>'+
									'<td>'+lukouStatusStr+'</td>'+
									'<td>'+mydata[i].maintenanceMan+'</td>'+
									'<td>'+mydata[i].maintenancePhone+'</td>'+ problemStr+
									'<td>'+
									'<span class="layui-btn layui-btn-normal layui-btn-mini">设备信息</span>'+
									'</td>'+
									'<td>'+
									'<span class="layui-btn layui-btn-danger layui-btn-mini">删除</span>'+
									'</td>'+
									'</tr>'
							tabContent=tabContent+tempStr;
						}

						//添加窗体监听事件
						function markerClick(e) {
							infoWindow.setContent(e.target.content);
							infoWindow.open(map, e.target.getPosition());
							// 设置缩放级别和中心点
							map.setZoomAndCenter(13, e.target.getPosition());
						}

						//将拼接好的数据填入#tabContent中
						$("#tabContent").html(tabContent);

						//显示分页
						laypage({
							cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
							pages: result.pages, //通过后台拿到的总页数
							curr: curr || 1, //当前页
							jump: function(obj, first){ //触发分页后的回调
								if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
									getData(obj.curr);
								}
							}
						});
					});
				};



##六、后端部分代码说明
- 6.1、路口信息与不定数量的设备信息管理，先添加路口信息，在根据路口信息添加设备信息（二级文档，Mongoose修改二级文档操作，向主文档添加子文档是是push操作）。
```
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
```
- 6.2、eventproxy解决node.js异步回调问题，实现批量修改信息。  
```
//文件头部引入异步操作模块
var EventProxy  = require('eventproxy');
var ep = new EventProxy();   
```

```
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
```

##七、最后 

[layui地址](http://www.layui.com/)
[项目github地址](https://github.com/dpc761218914/Device_Management)

感谢浏览...


