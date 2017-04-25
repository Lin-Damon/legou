window.onscroll = function(){
	var scHeight  =  document.documentElement.scrollTop || document.body.scrollTop;
	var box_3 = document.getElementById("article_4");
	var box_4 = document.getElementById("article_3");
	box_3.style.top = scHeight + "px";
	box_4.style.top = scHeight + "px";
//	console.log(scHeight);
}
LGB.init();
LGB.getDataByTableName("Goods",13,success,error);
function success(obj)
{
//	console.log("获取成功:",obj);
    for(var i=0;i<obj.length;i++){
	console.log(obj[i]);
	var box = document.getElementById("commodity_1");
	var ul = document.createElement("ul");
	var li_inp = document.createElement("li");
    var li_number = document.createElement("li");
    var li_name = document.createElement("li");
    var li_img = document.createElement("li");
    var li_money = document.createElement("li");
    var li_state = document.createElement("li");
    var li_operate = document.createElement("li");
    var inp = document.createElement("input");
    inp.type = "checkbox";
    inp.className = "select";
    box.appendChild(ul);
    li_inp.appendChild(inp);
    ul.appendChild(li_inp);
    li_number.innerText = obj[i].id;
    ul.appendChild(li_number);
    li_name.innerText = obj[i].attributes.itemname;
    ul.appendChild(li_name);
    var img = document.createElement("img");
    img.src = obj[i].attributes.coverimg;
    li_img.appendChild(img);
    ul.appendChild(li_img);
    li_money.innerText = obj[i].attributes.price;
    ul.appendChild(li_money);
    li_state.innerText = obj[i].attributes.subtype;
    ul.appendChild(li_state);
    var a_1 = document.createElement("button");
    a_1.innerText = "修改";
    a_1.indexs=i;
    a_1.className = "modify";
    li_operate.appendChild(a_1);
    var a_2 = document.createElement("button");
    a_2.innerText = "查看";
    a_2.index=i;
    li_operate.appendChild(a_2);
    ul.appendChild(li_operate);
    
    var box_3 = document.getElementById("article_4");
    var btn_6 = document.getElementById("submit_1");
    var box_4 = document.getElementById("article_3");
    var btn_1 = document.getElementById("submit_3");
    var btn_8 = document.getElementById("submit_2");
    a_1.onclick = function(){
    	box_4.style.display = "block";
    	tel=obj[this.indexs];
    	modifyData(tel);
    	
    }
    btn_8.onclick = function(){
    	box_4.style.display = "none";
    }
    btn_1.onclick = function(){
    	var txt_3 = document.getElementsByClassName("text_3");
    	if(confirm("确定修改吗？")){
    	box_4.style.display = "none";
    	var data = {
    		"itemname":txt_3[0].value,
    		"orgprice":parseInt(txt_3[2].value),
    		"price":parseInt(txt_3[3].value),
    		"type":txt_3[7].value,
    		"description":txt_3[9].value,
    	}
    	LGB.updateGoods(txt_3[1].value,data,success,error);
    	function success(obj)
			{
			    console.log("保存成功:",obj);
			}
			function error(error)
			{
			    console.log(error);
			}
		}else{
			return;
		}
    }
    a_2.onclick = function(){
    	box_3.style.display = "block";
    	data=obj[this.index];
//  	console.log(data);
    	setDetailBoard(data);	
    }
    btn_6.onclick = function(){
    	box_3.style.display = "none";
    }
    }
    
}

function modifyData(tel){
	var txt_3 = document.getElementsByClassName("text_3");
	var img = document.getElementById("woshiimg");
	txt_3[0].value = tel.attributes.itemname;
	txt_3[1].value = tel.id;
	txt_3[2].value = tel.attributes.orgprice;
	txt_3[3].value = tel.attributes.price;
	txt_3[4].value = tel.attributes.size;
	txt_3[5].value = tel.attributes.color;
	var set0 =  tel.attributes.set[0];
	if(set0)
	{txt_3[6].value = tel.attributes.set[0].value;}else{set.value = "无"}
	txt_3[7].value = tel.attributes.type;
	txt_3[9].value = tel.attributes.description;
	txt_3[4].setAttribute("disabled","true");
	txt_3[1].setAttribute("disabled","true");
    txt_3[5].setAttribute("disabled","true");
    txt_3[8].setAttribute("disabled","true");
    txt_3[10].style.backgroundColor = 'gray';
    img.src = tel.attributes.coverimg;
}
function submitData(tel){
	var txt_3 = document.getElementsByClassName("text_3");
    	var data = {
    		"itemname":txt_3[0].value,
    	}
    	console.log(tel.id);
//  	LGB.updateGoods(dld.id,data,success,error);
//  	function success(obj)
//			{
//			    console.log("保存成功:",obj);
//			}
//			function error(error)
//			{
//			    console.log(error);
//			}
}
function setDetailBoard(data){
	var article_id = document.getElementById("txt_1");
    var Product_id = document.getElementById("numb_1");
    var org_price = document.getElementById("org_price");
    var price = document.getElementById("price");
    var size = document.getElementById("size_1");
    var color = document.getElementById("color_1");
    var set = document.getElementById("set_1");
    var coverimg = document.getElementById("some_1");
    var form = document.getElementById("form");
    var description = document.getElementById("description")
    
   
    console.log(data);
    article_id.value = data.attributes.itemname;
	Product_id.value = data.id;
	org_price.value = data.attributes.orgprice + "元";
	price.value = data.attributes.price + "元";
	size.value = data.attributes.size;
	color.value = data.attributes.color;
	var set0 =  data.attributes.set[0];
	if(set0)
	{set.value = data.attributes.set[0].value;}else{set.value = "无"}
	form.value = data.attributes.subtype;
	description.value = data.attributes.description;
	var img_2 = document.getElementById("coverimg_1");
	img_2.src = data.attributes.coverimg;
}
function error(error)
{
	console.log(error);
}
