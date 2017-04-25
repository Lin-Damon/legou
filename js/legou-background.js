/*!
 * base on Bmob
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
//接口列表
LGB.save 				= function(tableName,data,successFN,errorFN){};
LGB.updateUser 			= function(data,successFN,errorFN){};
LGB.getDataByTableName	= function(tableName,num,successFN,errorFN){};
LGB.uploadFile 			= function(fileControl,name,successFN,errorFN){};
LGB.microPic 			= function(data,successFN,errorFN){};
LGB.signUp 				= function(data,successFN,errorFN){};
LGB.logIn 				= function(username,password,successFN,errorFN){};
LGB.superLogIn			= function(username,password,successFN,errorFN){};
LGB.getCurrentUser 		= function(){};
LGB.resetPassword 		= function (email,successFN,errorFN){};
LGB.queryByType 		= function(type,num,successFN,errorFN){};
// LGB.query 				= function(tableName,property,value,successFN,errorFN){};
LGB.query 				= function(data,successFN,errorFN){};
LGB.queryCount 			= function(data,successFN,errorFN){};
LGB.queryByItemID 		= function(itemID,successFN,errorFN){};
LGB.changePassword 		= function(oldPassword,newPassword,successFN,errorFN){};
LGB.getAllType			= function(successFN,errorFN){};
LGB.updateGoods			= function(itemID,successFN,errorFN){};
LGB.deleteGoods			= function(itemID,successFN,errorFN){};
LGB.queryByPrice		= function(data,successFN,errorFN){};
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
LGB.updateUser = function(data,successFN,errorFN){
	var user = Bmob.User.current();
	for (var i in data){
		user.set(i,data[i]);
	}
	user.save(null,{
		success:function(user){
			successFN(user);
		},
		error:function(model,error){
			errorFN(error);
		}
	})
};

//查找某张表数据,数量默认为10
LGB.getDataByTableName = function(tableName,num,successFN,errorFN){
	var Obj = Bmob.Object.extend(tableName);
	var query = new Bmob.Query(Obj);
	if (num>=1) {
		query.limit(num);
	}
	query.find({
	 	success: function(data) {
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
					success:function(data){successFN(data)},
					error:function(error){errorFN(data)},
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
		error:function(obj,error){errorFN(error)},
	})
};
LGB.superLogIn = function(username,password,successFN,errorFN){
	Bmob.User.logIn(username,password,{
		success:function(user){
			if (user.attributes.root) {
				successFN(user);
			}
			else{
				errorFN({code:001,msg:"not super manager"});
			}
		},
		error:function(obj,error){errorFN(error)},
	})
};

LGB.getCurrentUser = function(){
	var cuser = Bmob.User.current();
	return cuser;
};
LGB.resetPassword = function (email,successFN,errorFN){
	Bmob.User.requestPasswordReset(email,{
		success:function(){successFN()},
		error:function(error){errorFN(error)},
	});
};
LGB.queryByType = function(data,successFN,errorFN){

	var type = data.keyword;
	var num = data.num;
	var skip = data.skip;
	var Goods = Bmob.Object.extend("Goods");

	var query1 = new Bmob.Query(Goods);
	query1.equalTo("type",type);
	var query2 = new Bmob.Query(Goods);
	query2.equalTo("subtype",type);

	var mainQuery = Bmob.Query.or(query1,query2);
	if (skip) {mainQuery.skip(skip)};
	if(typeof num === "number" && num > 0) mainQuery.limit(num);
	mainQuery.find({
		success:function(data){
		    successFN(data);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.query=function(data,successFN,errorFN){
	console.log("chaxun");
	var tn = data.tableName||'';
	var num = data.num||10;
	var skipNum = data.skip||0;
	var p = data.property||'';
	var v = data.value||'';
	if (!tn) {errorFN({code:000,msg:"缺失表名"});return};
	if (p&&v) {query.equalTo(p,v);}
	var Obj = Bmob.Object.extend(tn);
	var query = new Bmob.Query(Obj);
	
	query.limit(num);
	query.skip(skipNum);
	query.find({
		success:function(data){
		    successFN(data);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.queryCount = function(data,successFN,errorFN){
	var tn = data.tableName||'';
	var num = data.num||1000;
	var skipNum = data.skip||0;
	var p = data.property||'';
	var v = data.value||'';
	if (!tn) {errorFN({code:000,msg:"table name is missed!"})};
	var Obj = Bmob.Object.extend(tn);
	var query = new Bmob.Query(Obj);
	if (p&&v) {query.equalTo(p,v);}
	if (skipNum) {query.skip(skipNum);};
	query.limit(num);
	query.count({
		success:function(count){
		    successFN(count);
		},
		error:function(error){
			errorFN(error);
		},
	})
};

LGB.queryByItemID = function(itemID,successFN,errorFN){
	var Obj = Bmob.Object.extend("Goods");
	var query = new Bmob.Query(Obj);
	query.get(itemID, {
	  success: function(obj) {
	  	successFN(obj);
	  },
	  error: function(object, error) {
	    // 查询失败
	    errorFN(error);
	  }
	});
};
LGB.changePassword = function(oldPassword,newPassword,successFN,errorFN){
	var user = Bmob.User.current();

	if (!user) {
		errorFN({code:000,msg:"未登录"});
		return;
	}
	var username = user.getUsername();
	Bmob.User.logIn(username,oldPassword,{
		success:function(user){
			user.save({"password":newPassword,},{
				success:function(obj){successFN(obj)},
				error:function(error){errorFN(error)},
			})
		},
		error:function(error){errorFN(error)},
	})
};
LGB.getAllType = function(successFN,errorFN){
	var jsonData = [
		{
			"type":"衣服",
			"sub":["内衣","文胸","T恤","卫衣","卫衣裙","小白裙","小黑裙","收腰裙"],
		},
		{
			"type":"裤子",
			"sub":["七分裤","九分裤","休闲裤","加绒打底裤","打底裤","小脚裤","灯笼裤","牛仔裤"],
		},
		{
			"type":"裙子",
			"sub":["半身裙","针织裙","卫衣裙","牛仔半身裙","包臀裙","半身裙","半身长裙","雪纺裙"],
		},
		{
			"type":"女鞋",
			"sub":["运动鞋","小白鞋","板鞋","高跟鞋","平底鞋","浅口鞋","乐福鞋","方头鞋"],
		},
		{
			"type":"包包",
			"sub":["单肩包","双肩包","斜挎包","旅行箱包","女性钱包","水桶包","贝壳包","子母包"],
		},
		{
			"type":"美妆",
			"sub":["补水保湿","面膜","BB霜","香水","口红","眉笔","腮红","防晒霜"],
		},
		{
			"type":"家居",
			"sub":["沙发垫","抱枕","地毯","床垫","窗帘","收纳箱","镜子","保温杯"],
		},
		{
			"type":"母婴",
			"sub":["童装","孕妇装","月子服","童车","孕产洗护","亲子装","待产包","婴儿床品"],
		},
		{
			"type":"其他",
			"sub":["手机","电吹风","耳机","移动电源","面包机","电磁炉","电动牙刷","脱毛器"],
		},
	]
	try{successFN(jsonData)}
	catch(e){
		errorFN(e);
	};
};
LGB.updateGoods	= function(itemID,data,successFN,errorFN){
	var Obj = Bmob.Object.extend("Goods");
	var query = new Bmob.Query(Obj);
	query.get(itemID,{
		success:function(obj){
			for(var i in data)
			{
				obj.set(i,data[i]);
			}
			obj.save(null,{
				success:function(obj){successFN(obj)},
				error:function(obj,error){errorFN(error)},
			})
		},
		error:function(obj,error){errorFN(error)},
	})
};
LGB.deleteGoods	= function(itemID,successFN,errorFN){
	var Obj = Bmob.Object.extend("Goods");
	var query = new Bmob.Query(Obj);
	query.get(itemID,{
		success:function(obj){
			obj.destroy({
				success:function(obj){successFN(obj)},
				error:function(obj,error){errorFN(error)},
			})
		},
		error:function(obj,error){errorFN(error)},
	})
};
LGB.queryByPrice = function(data,successFN,errorFN){
	var minPrice = data.minPrice||0;
	var maxPrice = data.maxPrice||1000000;
	var num = data.num;
	var skip = data.skip;
	var Goods = Bmob.Object.extent("Goods");

	var query1 = new Bmob.Query(Goods);
	query1.equalTo("type",type);
	var query2 = new Bmob.Query(Goods);
	query2.equalTo("subtype",type);

	var mainQuery = Bmob.Query.or(query1,query2);
	mainQuery.greaterThan("price",minPrice);
	mainQuery.lessThan("price",maxPrice);
	if (num >0) {mainQuery.limit(num)};
	if (skip > 0) {mainQuery.skip(skip)};
	mainQuery.find({
		success:function(data){
		    successFN(data);
		},
		error:function(error){
			errorFN(error);
		},
	})
};
LGB.updateOrder	= function(order,data,successFN,errorFN){
//	var Order = Bmob.Object.extend("Order");
	for(var i in data)
	{
		order.set(i,data[i]);
	}
	order.save(null,{
		success:function(order){successFN(order)},
		error:function(obj,error){errorFN(error)},
	});
	
	
};
LGB.queryByOrderID = function(orderID,successFN,errorFN){
	var Obj = Bmob.Object.extend("Order");
	var query = new Bmob.Query(Obj);
	query.get(orderID, {
	  success: function(obj) {
	  	successFN(obj);
	  },
	  error: function(object, error) {
	    // 查询失败
	    errorFN(error);
	  }
	});
};
LGB.getUserShopCar = function(successFN,errorFN){
	var user =  Bmob.User.current();
	var Obj = Bmob.Object.extend("ShopCar");
	var query = new Bmob.Query(Obj);
	query.equalTo("userid",user.id);
	query.find({
		success:function(obj){
			if (obj[0]) {
				successFN(obj[0].attributes.shopcar);
			}
			else{
				successFN([]);
			}
		},
		error:function(error){
			errorFN(error);
		}

	})
}
LGB.updateShopCar = function(data,successFN,errorFN){
	var user = Bmob.User.current();
	var Obj = Bmob.Object.extend("ShopCar");
	// var obj = new Obj();
	data.userid = user.id;
	var query = new Bmob.Query(Obj);
	query.equalTo("userid",data.userid);
	query.find({
		success:function(obj){
			if (obj[0]) {
				console.log(obj);
				obj[0].save(data,{
					success:function(o){
						successFN(o);
					},
					error:function(model,error){
						errorFN(error);
					}
				})
			}
		    else{
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
		},
		error:function(error){
			errorFN(error);
		},
	})
}
LGB.getUserOrder = function (successFN,errorFN) {
	var user = Bmob.User.current();
	var Obj = Bmob.Object.extend("Order");
	var query = new Bmob.Query(Obj);
	query.equalTo("userid",user.id);
	query.equalTo("paid",false);
	query.find({
		success:function (obj){
			console.log(obj);
			successFN(obj);
		},
		error:function(error){errorFN(error)},
	})

}
LGB.updateShippingAddress = function(data,successFN,errorFN){
	var user = Bmob.User.current();
	var Obj = Bmob.Object.extend("ShippingAddress");
	// var obj = new Obj();
	data.userid = user.id;
	var query = new Bmob.Query(Obj);
	query.equalTo("userid",user.id);
	query.find({
		success:function(obj){
			if (obj[0]) {
				console.log(obj);
				obj[0].save(data,{
					success:function(o){
						successFN(o);
					},
					error:function(model,error){
						errorFN(error);
					}
				})
			}
		    else{
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
		},
		error:function(error){
			errorFN(error);
		},
	})
}
LGB.getShippingAddress = function (successFN,errorFN) {
	var user = Bmob.User.current();
	var Obj = Bmob.Object.extend("ShippingAddress");
	var query = new Bmob.Query(Obj);
	query.equalTo("userid",user.id);
	// query.equalTo("paid",false);
	query.find({
		success:function (obj){
			console.log(obj);
			var res= obj[0].address||[];
			successFN(res);
		},
		error:function(error){errorFN(error)},
	})

}


