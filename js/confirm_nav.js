var cart_wrap_page = document.getElementsByClassName("cart_wrap_page")[0];
var orderMessage;
var user;
var arr = [],arr2 = [];
var pay_data;
var cartGoods;
var goods_index;
var ary = []; //存放用户订单ID
function shopcarCheckClick(){
	var allcheck = document.getElementsByClassName("allcheck");
	if(allChecked()){
		allcheck[0].checked = true;
		allcheck[1].checked = true;
	}
	else{
		allcheck[0].checked = false;
		allcheck[1].checked = false;
	}	
	calcularMoney();
	
	var goods_check = this.parentNode.parentNode.parentNode.parentNode;
	console.log(goods_check);
	var goods_checks = document.getElementsByClassName("about_shop_goods");
	goods_index = getIndex(goods_check,goods_checks);
	console.log(goods_index);
	if(this.checked){
		arr.push(goods_index);
	}else{
		arr.splice(goods_index,1);
	}
	arr2 = arr;
	console.log(arr2);
}
// 去付款
var pay_btn = document.getElementsByClassName("pay_btn")[0];
function toPayBtn(){
	// if(没有选择){
	// 	return;
	// }
	// todo
	console.log(pay_data);

	LGB.save("Order",pay_data,successFN,errorFN);
	
	function errorFN(error)
	{
	    console.log("保存失败",error);
	}
	
//	window.location.reload();
}

function successFN(obj){
	console.log("添加订单成功:",typeof(obj.id));
	toPayPage();

	/*
	LGB.queryByOrderID(obj.id,function(order){
		console.log(order.id);		
		console.log(order);
		var goodsId = order.id;
		for(var i=0;i<arr2.length;i++){
			// 删除已经购买的购物车商品
			console.log(i);
			cartGoods = LGB.getCurrentUser().attributes.shopcar;
			console.log(cart_goods[i],cartGoods);
			console.log(cartGoods);
			cartGoods.splice(arr[i],1);
			console.log(cartGoods);
			
			//获取商品id
			user = LGB.getCurrentUser();
			var userGoodsId = user.attributes.userorders || [];
			console.log(userGoodsId);
			userGoodsId.push(goodsId);
			
			var goods_data = {
				"shopcar":cartGoods,
				"userorders":userGoodsId,
			}
			
			LGB.updateUser(goods_data,function(){
				console.log("购物车删除成功");
			toPayPage();
			},function(error){
				console.log(error);
			});
			
			
		}
		
	},function(error){
		console.log(error);
	});
	*/
}
function toPayPage(){
	window.open("./pay_page.html","_self");
}
pay_btn.addEventListener("click",toPayBtn,false);
// 删除全部商品
function delAllGoods(){
	var allcheck = document.getElementsByClassName("allcheck");
	var allDel = document.getElementsByClassName("allDel")[0];
	allDel.addEventListener("click",function(){
		var empty_cart = [];
		var empty_data = {
			"shopcar":empty_cart,
		}
		LGB.updateUser(empty_data,function(){
			cart_wrap_page.innerText = "";
			calcularMoney();
			console.log("购物车是空的");
		},function(error){
			console.log(error);
		});
	},false);
}
delAllGoods();

// 全选按钮
function allcheckHandler() {
	var allcheck = document.getElementsByClassName("allcheck");
	var checks = document.getElementsByClassName("checkboxBtn");
	if(allChecked())
	{
		for(var i in checks){
			checks[i].checked = false;
		}
		for(var i in allcheck){
			allcheck[i].checked = false;
		}
	}
	else{
		for(var i in checks){
			checks[i].checked = true;
		}
		for(var i in allcheck){
			allcheck[i].checked = true;
		}
	}
	calcularMoney();
}
function setData(data){
//	console.log('c',carGoods);
	// 创建店铺节点
	var about_shop_goods = document.createElement("div");
	about_shop_goods.setAttribute("class", "about_shop_goods");
	cart_wrap_page.appendChild(about_shop_goods);

	// 创建购物车商品节点
	// 创建ul节点
	var about_goods = document.createElement("ul");
	about_goods.setAttribute("class", "about_goods");
	about_shop_goods.appendChild(about_goods);
	// 创建li节点
	var about_goods_li = document.createElement("li");
	about_goods_li.setAttribute("class", "about_goods_li");
	about_goods.appendChild(about_goods_li);
	// 创建checkbox节点
	var check = document.createElement("div");
	check.setAttribute("class", "check");
	about_goods_li.appendChild(check);
	var checkBtn = document.createElement("input");
	checkBtn.type = "checkbox";
//	checkBtn.checked = true;
	checkBtn.addEventListener('click',shopcarCheckClick,false)
	checkBtn.setAttribute("class", "checkboxBtn");
	check.appendChild(checkBtn);
	// 创建商品节点
	var pic = document.createElement("div");
	pic.setAttribute("class", "pic");
	about_goods_li.appendChild(pic);
	var pic_a = document.createElement("a");
	pic_a.href = "###";
	pic.appendChild(pic_a);
	var goods_pic = document.createElement("img");
	goods_pic.src = data.coverimg;
	goods_pic.setAttribute("class", "goods_pic");
	pic_a.appendChild(goods_pic);
	var pic_src = document.createElement("a");
	pic_src.href = "###";
	pic_src.innerText = data.itemname;
	pic_src.setAttribute("class", "pic_src");
	pic.appendChild(pic_src);
	//创建商品信息节点
	var about = document.createElement("div");
	about.setAttribute("class", "about");
	about_goods_li.appendChild(about);
	var color = document.createElement("span");
	color.setAttribute("class", "color");
	color.innerText = "颜色：" + data.color;
	about.appendChild(color);
	var br = document.createElement("br");
	about.appendChild(br);
	var size = document.createElement("span");
	size.setAttribute("class", "size");
	size.innerText = "尺码："+data.size;
	about.appendChild(size);
	// 创建单价节点
	var price = document.createElement("div");
	price.setAttribute("class", "price");
	about_goods_li.appendChild(price);
	var cost = document.createElement("span");
	cost.setAttribute("class", "cost");
	cost.innerText = "70.00";
	price.appendChild(cost);
	var br = document.createElement("br");
	price.appendChild(br);
	var dis_cost = document.createElement("span");
	dis_cost.setAttribute("class", "dis_cost");
	dis_cost.innerText = data.price;
	price.appendChild(dis_cost);
	var br = document.createElement("br");
	price.appendChild(br);
	var discount = document.createElement("span");
	discount.setAttribute("class", "discount");
	discount.innerText = "7折";
	price.appendChild(discount);
	// 创建数量节点
	var goods_num = document.createElement("div");
	goods_num.setAttribute("class", "goods_num");
	about_goods_li.appendChild(goods_num);
	var reduce = document.createElement("button");
	reduce.setAttribute("class", "reduce");
	reduce.innerText = "-";
	reduce.addEventListener("click",reduceHandler,false)
	goods_num.appendChild(reduce);
	var much = document.createElement("input");
	much.type = "text";
	much.value = data.num;
	much.setAttribute("class", "much");
	goods_num.appendChild(much);
	var add = document.createElement("button");
	add.setAttribute("class", "add");
	add.innerText = "+";
	add.addEventListener("click",addHandler,false);
	goods_num.appendChild(add);
	// 创建小计节点
	var sum = document.createElement("div");
	sum.setAttribute("class", "sum");
	about_goods_li.appendChild(sum);
	var pay = document.createElement("span");
	pay.setAttribute("class", "pay");
	pay.innerText =( parseFloat(data.price) * parseFloat(data.num)).toFixed(2);
	sum.appendChild(pay);
	// 创建操作节点
	var ctrl = document.createElement("div");
	ctrl.setAttribute("class", "ctrl");
	about_goods_li.appendChild(ctrl);
	var del = document.createElement("button");
	del.setAttribute("class", "del");
	del.innerText = "删除";
	del.addEventListener("click",shipGoodsHandler,false);
	ctrl.appendChild(del);
	
	
}
//节点checkbox
function allChecked(){
//		checkboxBtn
	var allcheck = document.getElementsByClassName("allcheck");
	var checks = document.getElementsByClassName("checkboxBtn");
	for(var i in checks)
	{
		if(checks[i].checked == false){
			return false;
		}else{
			for(var i in allcheck){
				allcheck[i].checked = true;
			}
		}
	}
	return true;
}

window.onload = function(){
	
	var allcheck = document.getElementsByClassName("allcheck");
	allcheck[0].addEventListener("click",allcheckHandler,false);
	allcheck[1].addEventListener("click",allcheckHandler,false);
	
	LGB.init();
	// user = LGB.getCurrentUser();
	var shopCar = LGB.getUserShopCar(function(shopcar){
		cart_goods = shopcar || [];
		// console.log(cart_goods);
		
		for(var i = 0; i < cart_goods.length; i++) {
			setData(cart_goods[i]);
		}
		calcularMoney();
	},function(error){
		console.log(error);
	})
	

}
function reduceHandler(e){
	var numNode = e.target.nextSibling;
	if(numNode.value>0){numNode.value--;}
	calcularMoney();
	
}
function addHandler(e){
//	console.dir(e.target);
	var numNode = e.target.previousSibling;
	numNode.value++;
	calcularMoney();
}
function shipGoodsHandler(){
	var about_good = this.parentNode.parentNode.parentNode.parentNode;
	console.log(about_good);
	var about_goods = document.getElementsByClassName("about_shop_goods");
	var index = getIndex(about_good,about_goods);
	cartGoods = LGB.getCurrentUser().attributes.shopcar;
	console.log(cartGoods);
	cartGoods.splice(index,1);
	var goods_data = {
		"shopcar":cartGoods
	}
	LGB.updateUser(goods_data,function(){
		about_good.parentNode.removeChild(about_good);
		calcularMoney();
		
	},function(error){
		console.log(error);
	});
	console.log(index);

}

function getIndex(ele,eles){
	for(var i in eles){
		if(eles[i] === ele){
			return i;
		}
	}
}
//计算总额
function calcularMoney(){
	var bitch = document.getElementsByClassName("bitch")[0];
	var money = document.getElementsByClassName("money")[0];
	var checks = document.getElementsByClassName("checkboxBtn");
	var payMon = document.getElementsByClassName("pay");
	var mon1 = document.getElementsByClassName("dis_cost");
	var num1 = document.getElementsByClassName("much");
	

	var total = 0,count = 0;
	LGB.getUserShopCar(function(shopCar){
			for(var i = 0; i < checks.length; i++) {
				var count1 = parseFloat(mon1[i].innerText).toFixed(2)*parseInt(num1[i].value);
				console.log(typeof(count1));
				console.log("第"+(i+1)+"个小计:"+count1);
				payMon[i].innerText = count1.toFixed(2);
				var orders = [];
				if(checks[i].checked == true){
					console.log("before total:"+total);
					total += count1;
					console.log("after total:"+total);
					count++;
					var neworder = {
						"userinfo":{
							"username": user.attributes.username,
							"useraddress": "",
						},
						"goodsinfo":{
							"coverimg":shopCar[i].coverimg,
							"itemname":shopCar[i].itemname,
							"color":shopCar[i].color,
							"size":shopCar[i].size,
							"number":shopCar[i].num,
							"singleprice":shopCar[i].price,
							"sumprice":payMon[i].innerText,					
							"totalprice":total,
						},
						"paid":false,
						"completed":false,
						"shopname":"admin",
		//				"userorders":
					}
					//user.attributes.userinfo
					var user_Info = neworder.userinfo;
					var goods_Info = neworder.goodsinfo;
					var paId = neworder.paid;
					var compLeted = neworder.completed;
					var shopName = neworder.shopname;
					
					pay_data = {
						"userinfo":JSON.stringify(user_Info),
						"goodsinfo":JSON.stringify(goods_Info),
						"paid":paId,
						"completed":compLeted,
						"shopname":JSON.stringify(shopName),
						"userid":user.id,
					}
					console.log(pay_data);
				}
			}
			bitch.innerText = count;
			money.innerText = total.toFixed(2);
	},function(error){console.log(error)})
	
	
	
	
}