var some = document.querySelector("#some");
var coverValue = '',detailValue = '';
var coverState = false,detailState = false;
var checkTime = '',completeTimer = '';
var submit = document.getElementById("submit");
var form = document.getElementById("big");
var inpu = document.getElementById("cover");
var warning = document.getElementById("warning");
//添加一个节点
var add = document.getElementById("btn_1");
var addbox = document.getElementById("article_5");

add.onclick = function(){
	addbox.style.display = "block";
}
function addBox(){
	var box = document.createElement("div");
	var img = document.createElement("img");
	var hidden = document.createElement("input");
	box.className = "box";
	hidden.name = "detailimg";
	hidden.accept = "image/jpeg";
	img.src = "img/shi.png";
	img.className = "upload";
	
	var node;
	hidden.empty = true;//代表这是空的选择框
	hidden.type = "file";
	hidden.className = "hidden";
	hidden.addEventListener("change",changeFn,false);
	some.appendChild(box);
	box.appendChild(img);
	box.appendChild(hidden);
};
//九宫格的函数
function changeFn(e){
	var e = e||window.event;
//	console.log(e);
	var node = e.target.parentNode;
	var hidden = node.getElementsByClassName("hidden")[0];
	var upload = node.getElementsByClassName("upload")[0];
	var num = document.getElementsByClassName("box").length;
	if(hidden.empty&&num<9)
	{
		addBox();
	}
	hidden.empty = false;
	changeImgSrc(hidden,upload);
	addDel(node);
}
window.onload = function(){
	addBox();
}
//改变img的src的函数
function changeImgSrc(inp,img){
	var file = inp.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function(e){
		var src = e.target.result;
		img.src = src;
	}
}
function addDel(parent){
	var dele = document.createElement("div");
	dele.innerText = "x";
	dele.onclick=deleteImg;
	dele.className = "x";
	parent.appendChild(dele);
}
//删除事件
//通过img的父节点的父节点来移除img的父节点
function deleteImg(){
	var box = this.parentNode;
	box.parentElement.removeChild(box);
	//非空的个数等于8时，创建节点
	if(notEmptyInput().length == 8){
		addBox();
	}
}
//转化为json
//console.log(stringToJson(sett));
function stringToJson(str){
	var res = [];
	var arr = str.split("-");
	for(var i in arr){
		var newarr = arr[i].split(":");
		var obj = {
			"key":newarr[0],
			"value":newarr[1],
		}
		res.push(obj);
	}
	return res;
}
//获取以时间命名的函数
function getCurrentDate(){
	var name = '';
	var time = new Date();
	var year = time.getFullYear(); //返回该日期的年
	var month = time.getMonth();//返回该日期的月（注意，这里用0表示1月，所以真实的月份应该+1）
	var day = time.getDate()//返回该日期是该月的第几天;
	//时，分，秒
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	//随机数
	var random = Math.floor(Math.random()*100);
	name = ''+year+month+day+h+m+s+random+".jpg";
	return name;
}
			
//上传事件
submit.onclick = function(){
	event.preventDefault();
	LGB.init();
	uploadCover();
	uploadDetail();
	addbox.style.display = 'none';
	checkTime = setInterval(checkComplete,100);
}
//上传封面图片
function uploadCover(){
//	console.log(form.coverimg);
	LGB.uploadFile(form.coverimg,getCurrentDate(),function(obj){
		console.log("上传封面图片成功！");
		coverState = true;
		coverValue = obj._url;
	},error);
}
//上传详情图片
function uploadDetail(){
	var count;
	var hs = notEmptyInput();
	var arr = [];
	for(var i in hs){
//		console.log(hs[i]);
		LGB.uploadFile(hs[i],getCurrentDate(),function(obj){
			arr.push(obj._url);
			if(arr.length == hs.length){
				detailValue = arr;
				detailState = true;
			}
		},error);
	}
}
//非空内容个数的函数
function notEmptyInput(){
	var boxs = document.getElementsByClassName("box");
	var lastHidden = boxs[boxs.length-1].getElementsByClassName("hidden")[0];
	var hiddens = document.getElementsByClassName("hidden");
//	console.log(hiddens);
	var hs = [];
	for(var i = 0;i<hiddens.length;i++)
	{
		hs.push(hiddens[i]);
	}
	if(!lastHidden.files.length>0){
		hs.pop();
	}
	return hs;
}
//console.log(form.color.value);
function checkComplete(){
	if(coverValue && detailState){
		clearInterval(checkTime);
		var arr1 = form.color.value.split(',');
		var sizeValue = getSizeValue();
		var data = {
			"itemname":form.item_name.value,
			"orgprice":form.org_price.value,
			"price":form.price.value,
			"size":sizeValue||['均码'],
			"color":arr1,
			"set": uploadArg(),
			"type":form.type.value,
			"subtype":form.subtype.value,
			"coverimg":coverValue,
			"description":form.description.value,
			"detailimg":detailValue,
		}
		LGB.save("Goods",data,function(obj){
			console.log("保存数据成功！");
		},error);
	}
}
//size数组
function getSizeValue(){
	var sizes = form.size;
	var res = [];
	for(var i = 0;i<sizes.length;i++){
		if(sizes[i].checked){
			res.push(sizes[i].value);
		}
	}
	return res;
}
function success(obj){
	console.log(obj);
}
function error(obj){
	console.log(obj);
}	
//添加商品参数
var shopva = document.getElementById("shopva");
var spkey_8 = document.getElementsByClassName("spkey_1")[0];
var spkey_9 = document.getElementsByClassName("spkey_2")[0];
var spvajia = document.getElementsByClassName("spvajia")[0];
spvajia.onclick = function(){
	if(spkey_8.value == '' || spkey_9.value == ''){
		alert("请输入参数")
		return;
	}else{
		createDiv();
//		uploadArg();
	}
	spkey_8.value = '';
	spkey_9.value = '';
}
//上传参数
function uploadArg(){
	var box = document.querySelector("#shopva");
	var keys =box.querySelectorAll('.keys');
	var values = box.querySelectorAll('.values');
	var arr=[];
	for(var i = 0;i<keys.length;i++){
		var obj = {
			"key":keys[i].value,
			"value":values[i].value,
		}
		arr.push(obj);
	}
	return arr;
}
//创建参数表
function createDiv(){
	var div = document.createElement("div");
	var spkey_3 = document.createElement("input");
	var spkey_4 = document.createElement("input");
	var spva = document.createElement("span");
	spkey_3.className = "keys";
	spkey_4.className = "values";
	spva.innerText = "-";
	spva.className = "spvajian";
	spva.onclick = delShop;
	shopva.appendChild(div);
	div.appendChild(spkey_3);
	div.appendChild(spkey_4);
	div.appendChild(spva);
	spkey_3.value = spkey_8.value;
	spkey_4.value = spkey_9.value;
}
//删除参数
function delShop(){
	var div = this.parentNode;
	div.parentElement.removeChild(div);
}
//coverimg函数
inpu.onchange = function (){
	var node = this.parentNode;
	var img = document.getElementById("co_img");
	changeImgSrc(inpu,img);
}
//检测
function checkInputComplete(){
	var files1 = document.getElementById("cover");
	var files2 = document.querySelectorAll(".hidden")[0];
	var orgprice=form.org_price.value;
	var itemname=form.item_name.value;
	var price=form.price.value;
	var color=form.color.value;
	var type=form.type.value;
	var subtype=form.subtype.value;
	var description=form.description.value;
	if(!files1.files[0]||!files2.files[0]||!itemname||!orgprice||!price||!color||!type||!subtype||!description){
		return false;
	}else{
		return true;
	}
}
window.addEventListener("load",function(){
	completeTimer = setInterval(function(){
		if(checkInputComplete()){
//			console.log("wc");
			warning.style.display = 'none';
			submit.style.backgroundColor = "red";
			submit.removeAttribute("disabled");
		}else{
			warning.style.display = 'block';
			submit.style.backgroundColor = "gray";
			submit.disabled = "disabled";
		}
	},1000);

},false);
//价格正则
var orgprice = document.getElementById("org_price");
var price = document.getElementById("price");
var orgwarn = document.getElementById("orgwarn");
var prwarn = document.getElementById("pr_warn");
//原价
orgprice.onchange = function(){
	var reg = /^[123456789]\d{0,9}(.\d{1,2}|)$/;
	console.log(reg.test(orgprice.value));
	if(!orgprice.value.match(reg)){
		orgwarn.innerText = "错误的价格";
	}else{
		orgwarn.innerText = '';
	}
}
//促销价
price.onchange = function(){
	var reg = /^[123456789]\d{0,9}(.\d{1,2}|)$/;
	console.log(reg.test(price.value));
	if(!price.value.match(reg)){
		prwarn.innerText = "错误的价格";
	}else{
		prwarn.innerText = '';
	}
}
