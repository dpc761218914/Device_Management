/*配置左侧导航菜单*/
var navs = [{
	"title": "设备列表",
	"icon": "fa-cubes",
	"spread": true,
	"children": [
	{
		"title": "路口列表",
		"icon": "&#xe641;",
		"href": "admin_menu_lukou_list.html"
	},
	{
		"title": "添加路口和设备",
		"icon": "&#xe641;",
		"href": "admin_menu_add_lukou.html"
	}]
},
	{
	"title": "用户管理",
	"icon": "fa-cubes",
	"spread": true,
	"children": [{
		"title": "交警用户",
		"icon": "&#xe641;",
		"href": "admin_menu_police_list.html"
	}, {
		"title": "公司用户",
		"icon": "&#xe63c;",
		"href": "admin_menu_company_list.html"
	}
	]
},
	{
		"title": "用户报障",
		"icon": "fa-cubes",
		"spread": true,
		"children": [{
			"title": "报障列表",
			"icon": "&#xe641;",
			"href": "admin_menu_problem_list.html"
		}]
	},
	{
	"title": "统计管理",
	"icon": "fa-cubes",
	"href": "",
	"spread": true,
	"children": [{
		"title": "红绿灯行人统计",
		"icon": "fa-github",
		"href": "admin_menu_people_count.html"
	}]
	},{
		"title": "系统参数设置",
		"icon": "fa-cubes",
		"spread": true,
		"children": [{
			"title": "LED全局设置",
			"icon": "&#xe641;",
			"href": "admin_menu_led_set.html"
		}]
	},{
		"title": "日志管理",
		"icon": "fa-cubes",
		"spread": true,
		"children": [{
			"title": "管理员日志",
			"icon": "&#xe641;",
			"href": "admin_menu_log.html"
		}]
	}
];