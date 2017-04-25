/*!
 * Bmob 再封装
 * author Simon
 * date 2017-03-03
 * 乐购网
 * base on bmob.js and bmob.min.js
 * so please import this file after "bmob.js" and "bmob.min.js"
*/
;
var APPID = "8c4097df2df9f7c43b6665973cf00946";//默认appid
var RESTKEY = "28da2f4fca1026ab18c2310dd6796df2"; //默认restKey

function LGB(){
	
}
//方法列表
LGB.save = function(tableName,data,successFN,errorFN){};
LGB.getDataByTableName = function(tableName,num,successFN,errorFN){};
LGB.uploadFile = function(fileControl,name,successFN,errorFN){};
LGB.microPic = function(data,successFN,errorFN){};
LGB.signUp = function(data,successFN,errorFN){};
LGB.logIn = function(username,password,successFN,errorFN){};
LGB.getCurrentUser = function(){};
LGB.resetPassword = function (email,successFN,errorFN){};
LGB.queryByType = function(type,num,successFN,errorFN){};
// LGB.query = function(tableName,property,value,successFN,errorFN){};
LGB.query=function(data,successFN,errorFN){};
LGB.queryCount = function(data,successFN,errorFN){};
LGB.changePassword = function(oldPassword,newPassword,successFN,errorFN){};
//

LGB.init = function (appID,restKey){
	var appID = appID||APPID;
	var restKey = restKey||RESTKEY;
	try{
		Bmob.initialize(appID,restKey);
	}
	catch(e){
		console.log("初始化失败"+e);
	}
}

//表名，数据，成功回调，失败回调
//保存一条数据
LGB.save = function(tableName,data,successFN,errorFN){
	var Obj = Bmob.Object.extend(tableName);
	var obj = new Obj();
	obj.save(data,{
		success:function(o){
			successFN(o);
		},
		error:function(model,error){
			errorFN(error);
		}
	})
}

//查找某张表数据,数量默认为10
LGB.getDataByTableName = function(tableName,num,successFN,errorFN){
	var Obj = Bmob.Object.extend(tableName);
	var query = new Bmob.Query(Obj);
	if (num>=1) {
		query.limit(num);
	}
	query.find({
	 	success: function(results) {
		    var data = [];
		    for(var key in results)
		    {
		    	var obj = results[key].attributes;
		    	data.push(obj);
		    }
		    successFN(data);
	 	},
	 	error: function(error) {
	    	errorFN(error);
		}
	});
}
//上传单个文件
LGB.uploadFile = function(fileControl,name,successFN,errorFN){
	console.log("上传ing");
	var file = fileControl.files[0];
	if (!file) {
		errorFN({code:000,msg:"未选择任何文件"});
		return;
	}
	var name = name;
	var bfile = new Bmob.File(name,file);
	bfile.save().then(function(obj){
		successFN(obj);
	},function(error){
		errorFN(error);
	});
}

//缩略图
LGB.microPic = function(data,successFN,errorFN){
	/*
	mode:模式 0: 指定宽， 高自适应，等比例缩放
	     模式 1: 指定高， 宽自适应，等比例缩放
	     模式 2: 指定最长边，短边自适应，等比例缩放
	     模式 3: 指定最短边，长边自适应，等比例缩放
	     模式 4: 指定最大宽高， 等比例缩放
	     模式 5: 固定宽高， 居中裁剪    
	image:原图片url
	width:宽度，模式 0, 4, 5必填
	height：高度，模式 1, 4, 5必填
	longEdge：长边，模式 2必填
	shortEdge：短边，模式 3必填
	quality：质量，选填, 范围 1-100
	outType：输出类型，0:默认，输出url；1:输出base64编码的字符串流
	*/ 
	Bmob.Image.thumbnail(data).then(function(obj){
		successFN("http://file.bmob.cn/"+obj.url);
	},function(error){
		errorFN(error);
	});

};
//用户注册
LGB.signUp = function(data,successFN,errorFN){
	if (!data) {
		errorFN({code:000,msg:"空数据"});
		return;
	}
	var user = new Bmob.User();
	for(var i in data)
	{
		user.set(i,data[i]);
	}
	user.signUp(null,{
		success:function(user){
			successFN(user);
			Bmob.User.requestEmailVerify(user.getEmail(),{
					success:function(data){console.log(data)},
					error:function(error){console.log(error)},
			})
		},
		error:function(user,error){
			errorFN(error);
		}	
	})
};

LGB.logIn = function(username,password,successFN,errorFN){
	Bmob.User.logIn(username,password,{
		success:function(obj){successFN(obj)},
		error:function(error){errorFN(error)},
	})
};

LGB.getCurrentUser = function(){
	var cuser = Bmob.User.current();
	return cuser;
};
LGB.resetPassword = function (email,successFN,errorFN){
	Bmob.User.requestPasswordReset(email,successFN(obj),errorFN(error));
};
LGB.queryByType = function(type,num,successFN,errorFN){

	var Goods = Bmob.Object.extent("Goods");
	var query = new Bmob.Query(Goods);
	query.equalTo("type",type);
	if(typeof num === "number" && num > 0) query.limit(num);
	query.find({
		success:function(results){
			var data = [];
		    for(var key in results)
		    {
		    	var obj = results[key].attributes;
		    	data.push(obj);
		    }
		    successFN(data);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.query=function(data,successFN,errorFN){
	var tn = data.tableName||'';
	var num = data.num||10;
	var skipNum = data.skip||0;
	var p = data.property||'';
	var v = data.value||'';
	if (!tn||!p||!v) {return;};
	var Obj = Bmob.Object.extend(tn);
	var query = new Bmob.Query(Obj);
	query.equalTo(p,v);
	query.limit(num);
	query.skip(skipNum);
	query.find({
		success:function(results){
			var data = [];
		    for(var key in results)
		    {
		    	var obj = results[key].attributes;
		    	data.push(obj);
		    }
		    successFN(data);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.queryCount = function(data,successFN,errorFN){
	var tn = data.tableName||'';
	var num = data.num||10;
	var skipNum = data.skip||0;
	var p = data.property||'';
	var v = data.value||'';
	if (!tn||!p||!v) {return;};
	var Obj = Bmob.Object.extend(tn);
	var query = new Bmob.Query(Obj);
	query.equalTo(p,v);
	query.limit(num);
	query.skip(skipNum);
	query.count({
		success:function(count){
		    successFN(count);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.changePassword = function(oldPassword,newPassword,successFN,errorFN){
	var user = Bmob.User.current();
	console.log(user);
	if (!user) {
		errorFN({code:000,msg:"未登录"});
		return;
	}
	var username = user.getUsername();
	Bmob.User.logIn(username,oldPassword,function(user){
		user.set("password",newPassword);
		user.save(null,function(obj){successFN(obj)},function(error){errorFN(obj)});
	},function(error){
		errorFN(error);
	}) 
};




