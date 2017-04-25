var province = document.getElementsByClassName("province")[0];
var city = document.getElementsByClassName("city")[0];
var distrist = document.getElementsByClassName("district")[0];
var street = document.getElementsByClassName("street")[0];
var phone = document.getElementsByClassName("tel")[0];
var name = document.getElementsByClassName("receiver")[0];
var c = '';
var address = new AddressPicker();
var leg = address.allCitys;
var goodsInfo; // 订单商品信息
var orderIds; // 商品ID

// 获取省份
for(var i = 0; i < leg.length; i++) {
	var pro = document.createElement("option");
	pro.innerText = leg[i];
	province.appendChild(pro);
	province.onchange = cityFn;
}

// 获取该省份的城市
function cityFn(e) {
	e = e || window.event;
	c = e.target.value; // 获取选择到的省份
	console.log(c);
	city.innerText = '';
	var allCity = address.getSubCity(c);
	for(var i = 0; i < allCity.length; i++) {
		var shi = document.createElement("option");
		shi.innerText = allCity[i];
		city.appendChild(shi);
		city.onchange = distristFn;
	}
}

// 获取该城市的区
function distristFn(e) {
	e = e || window.event;
	var d = e.target.value; // 获取选择到的城市
	distrist.innerText = '';
	var allDistrist = address.getCounty(c, d);
	for(var i = 0; i < allDistrist.length; i++) {
		var qu = document.createElement("option");
		qu.innerText = allDistrist[i];
		distrist.appendChild(qu);
	}
}

var codeNum = document.getElementsByClassName("codeNum")[0];
var street = document.getElementsByClassName("street")[0];
var receiver = document.getElementsByClassName("receiver")[0];
var tel = document.getElementsByClassName("tel")[0];
var codeSp = document.getElementsByClassName("codeSp")[0];
var strSp = document.getElementsByClassName("strSp")[0];
var recSp = document.getElementsByClassName("recSp")[0];
var telSp = document.getElementsByClassName("telSp")[0];
var conf_btn = document.getElementsByClassName("conf_btn")[0];
var reg = /^[1-9]\d{5}$/; //邮政编码正则
var reg1 = /^1[34578]\d{9}$/; // 电话号码正则
// 判断邮政编码
codeNum.onfocus = function() {
	codeNum.style.border = "1px solid orange";
}
codeNum.onchange = function() {
	if(codeNum.value == '' || reg.test(codeNum.value) == false) {
		codeSp.style.display = "inline-block";
	} else {
		codeSp.style.display = "none";
	}
}
codeNum.onblur = function() {
	if(codeNum.value == '' || reg.test(codeNum.value) == false) {
		codeSp.style.display = "inline-block";
	} else {
		codeSp.style.display = "none";
		codeNum.style.border = "1px solid rgb(169,169,169)";
	}
}
// 判断街道地址
street.onfocus = function() {
	street.style.border = "1px solid orange";
}
street.onchange = function() {
	if(street.value == '' || street.value.length < 5) {
		strSp.style.display = "block";
	} else {
		strSp.style.display = "none";
	}
}
street.onblur = function() {
	if(street.value == '' || street.value.length < 5) {
		strSp.style.display = "block";
	} else {
		strSp.style.display = "none";
		street.style.border = "1px solid rgb(169,169,169)";
	}
}
// 判断收货人
receiver.onfocus = function() {
	receiver.style.border = "1px solid orange";
}
receiver.onchange = function() {
	if(receiver.value == '') {
		recSp.style.display = "inline-block";
	} else {
		recSp.style.display = "none";
	}
}
receiver.onblur = function() {
	if(receiver.value == '') {
		recSp.style.display = "inline-block";
	} else {
		recSp.style.display = "none";
		receiver.style.border = "1px solid rgb(169,169,169)";
	}
}
// 判断手机号码
tel.onfocus = function() {
	tel.style.border = "1px solid orange";
}
tel.onchange = function() {
	if(tel.value == '' || reg1.test(tel.value) == false) {
		telSp.style.display = "inline-block";
	} else {
		telSp.style.display = "none";
	}
}
tel.onblur = function() {
	if(tel.value == '' || reg1.test(tel.value) == false) {
		telSp.style.display = "inline-block"
	} else {
		telSp.style.display = "none";
		tel.style.border = "1px solid rgb(169,169,169)";
	}
}

var goods_massage = document.getElementsByClassName("goods_massage")[0];
// 生成商品节点
function orderFN(order_data){
	console.log(order_data);
	var massage_center = document.createElement("div");
	massage_center.setAttribute("class", "massage_center");
	goods_massage.appendChild(massage_center);
	var mc_header = document.createElement("div");
	mc_header.setAttribute("class", "mc_header");
	massage_center.appendChild(mc_header);
	var mch_ul = document.createElement("ul");
	mch_ul.setAttribute("class", "mch_ul");
	mc_header.appendChild(mch_ul);
	
	var li1 = document.createElement("li");
	li1.style.float = "left";
	mch_ul.appendChild(li1);
	var mc_pic = document.createElement("div");
	mc_pic.setAttribute("class", "mc_pic");
	li1.appendChild(mc_pic);
	var a1 = document.createElement("a");
	a1.href = "###";
	mc_pic.appendChild(a1);
	var goods_pic = document.createElement("img");
	goods_pic.src = order_data.coverimg;
	goods_pic.setAttribute("class", "goods_pic");
	a1.appendChild(goods_pic);
	var a2 = document.createElement("a");
	a2.href = "###";
	a2.setAttribute("class", "pic_src");
	a2.innerText = order_data.itemname;
	mc_pic.appendChild(a2);
	
	var li2 = document.createElement("li");
	li1.style.float = "left";
	mch_ul.appendChild(li2);
	var mc_about = document.createElement("div");
	mc_about.setAttribute("class", "mc_about");
	li2.appendChild(mc_about);
	var color = document.createElement("span");
	color.setAttribute("class", "color");
	color.innerText = "颜色："+order_data.color;
	mc_about.appendChild(color);
	var br = document.createElement("br");
	mc_about.appendChild(br);
	var size = document.createElement("span");
	size.setAttribute("class", "size");
	size.innerText = "尺码："+order_data.size;
	mc_about.appendChild(size);
	
	var li3 = document.createElement("li");
	li1.style.float = "left";
	mch_ul.appendChild(li3);
	var mc_price = document.createElement("div");
	mc_price.setAttribute("class", "mc_price");
	li3.appendChild(mc_price);
	var mcc = document.createElement("span");
	mcc.setAttribute("class", "mcc");
	mcc.innerText = order_data.singleprice;
	mc_price.appendChild(mcc);
	
	var li4 = document.createElement("li");
	li1.style.float = "left";
	mch_ul.appendChild(li4);
	var mc_num = document.createElement("div");
	mc_num.setAttribute("class", "mc_num");
	li4.appendChild(mc_num);
	var mcn = document.createElement("span");
	mcn.setAttribute("class", "mcn");
	mcn.innerText = order_data.number;
	mc_num.appendChild(mcn);
		
	var li6 = document.createElement("li");
	li1.style.float = "left";
	mch_ul.appendChild(li6);
	var mc_sum = document.createElement("div");
	mc_sum.setAttribute("class", "mc_sum");
	li6.appendChild(mc_sum);
	var mcs = document.createElement("span");
	mcs.setAttribute("class", "mcs");
	mcs.innerText = order_data.sumprice;
	mc_sum.appendChild(mcs);
		
//	var massage_footer = document.createElement("div");
//	massage_footer.setAttribute("class", "massage_footer");
//	goods_massage.appendChild(massage_footer);
//	var heji = document.createElement("span");
//	heji.setAttribute("class", "heji");
//	heji.innerText = "合计：";
//	massage_footer.appendChild(heji);
//	var mfsum = document.createElement("span");
//	mfsum.setAttribute("class", "mfsum");
//	mfsum.innerText = order_data.sumprice;
//	massage_footer.appendChild(mfsum);
}

// 支付按钮
var confirPay_btn = document.getElementsByClassName("confirPay_btn")[0];
confirPay_btn.onclick = function() {
	console.log("点击到");
	for(var i in orderIds){
		console.log(i);
	}
	window.location.href = "pay.html";
}

// 上传地址到服务器
var conf_btn = document.getElementsByClassName("conf_btn")[0];
conf_btn.onclick = function() {
	var user = LGB.getCurrentUser();
	console.log("点击到");
	var home = province.value + "-" + city.value + "-" + distrist.value; // 地址
	var zipCode = codeNum.value; // 邮编
	var str = street.value; // 街道
	var name = receiver.value; // 收货人
	var phoneNum = phone.value; // 电话
	var address_date = {
		"home": home,
		"zipCode": zipCode,
		"street": str,
		"name": name,
		"phone": phoneNum
	};
	if(zipCode == "" || str == "" || phoneNum == "" || name == "") {
		return;
	};
	LGB.getShippingAddress(function(address){
		address.push(address_date);
		LGB.updateShippingAddress({"address":address},function(obj){
			console.log("更新成功");
			window.location.reload();
		},function(error){
			console.log(error);
		})
	},function(error){console.log(error);})
}

// 使用新地址按钮
var newAddress = document.getElementsByClassName("newAddress")[0];
newAddress.addEventListener("click", newAddressFN, false);

function newAddressFN() {
	var show_address = document.getElementsByClassName("show_address")[0];
	var writeAddress = document.getElementsByClassName("writeAddress")[0];
	show_address.style.display = "none";
	writeAddress.style.display = "block";
}

// 取消按钮
var cencel_btn = document.getElementsByClassName("cencel_btn")[0];
cencel_btn.addEventListener("click", cencelFN, false);

function cencelFN() {
	var show_address = document.getElementsByClassName("show_address")[0];
	var writeAddress = document.getElementsByClassName("writeAddress")[0];
	show_address.style.display = "block";
	writeAddress.style.display = "none";
}

window.onload = function() {
	var user = LGB.getCurrentUser();
	var count1=0;
	var orders = LGB.getUserOrder(function(orders){
		for(var i=0;i<orders.length;i++){
			goodsInfo = orders[i].attributes.goodsinfo;
			var obj = JSON.parse(goodsInfo);
			orderFN(obj);

			var count = obj.totalprice;
			count1 += count;
			console.log(count1);
			var payAllMoney = document.getElementsByClassName("payAllMoney")[0];
			payAllMoney.innerText = count1.toFixed(2);
			var payNum = document.getElementsByClassName("payNum")[0];
			payNum.innerText = orders.length;
		}
	},function(error){
		console.log(error);
	})

	
	
	
	var writeAddress = document.getElementsByClassName("writeAddress")[0];
	var show = user.attributes.shippingaddress;
	console.log(user);
	if(show == []) {
		writeAddress.style.display = "block";
	} else {
		for(var i = 0; i < show.length; i++) {
			dataFN(show[i]);
		}

	}
	

}

function dataFN(data) {
	var show_address = document.getElementsByClassName("show_address")[0];

	var address_div = document.createElement("div");
	address_div.setAttribute("class", "address_div");
	show_address.appendChild(address_div);

	var forName = document.createElement("span");
	forName.setAttribute("class", "forName");
	forName.innerText = data.name;
	address_div.appendChild(forName);

	var forStreet = document.createElement("span");
	forStreet.setAttribute("class", "forStreet");
	forStreet.innerText = data.street;
	address_div.appendChild(forStreet);

	var forHome = document.createElement("span")
	forHome.setAttribute("class", "forHome");
	forHome.innerText = data.home;
	address_div.appendChild(forHome);

	var forCode = document.createElement("span");
	forCode.setAttribute("class", "forCode");
	forCode.innerText = data.zipCode;
	address_div.appendChild(forCode);

	var br = document.createElement("br");
	address_div.appendChild(br);

	var forPhone = document.createElement("span");
	forPhone.setAttribute("class", "forPhone");
	forPhone.innerText = data.phone;
	address_div.appendChild(forPhone);
}