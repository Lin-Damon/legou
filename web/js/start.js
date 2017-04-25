var currentID,BigImg,coverimg,selectSize,selectColor,colorClickFalg=false,sizeClickFalg=false,user; 

window.onload=function(){
	var id = location.search.split('?')[1];//从别处获取
	currentID = id;
	LGB.init();
	LGB.queryByItemID(id,success,error);		
	user = LGB.getCurrentUser();
	if(!user){
	    console.log("还未登录");
	}
	else{
	    console.log("您好，"+user.getUsername());
	}

	
	
	// if (user) {
	// 	var uesrimg=LGB.getCurrentUser().attributes.favaicon;
	// 	c.OffsideEntry(uesrimg,"userCenter.html");
	// }

	var add = document.getElementsByClassName("num-add")[0];
	var reduce = document.getElementsByClassName("num-reduce")[0];
	var num = document.getElementsByClassName("num-input")[0];
	reduce.onclick = function(){
		num.value--;
		if(num.value <= 1){
			num.value=1;
		}
	}
	add.onclick = function(){
		num.value++;
	}
	

	var m1 = document.querySelector('#m_1');
	var m2 = document.querySelector('#m_2');
	var m3 = document.querySelector('#m_3');
	var a1 = document.querySelector('.main');
	var a2 = document.querySelector('.comment');
	var a3 = document.querySelector('.like_item');
	var tab=document.querySelector('.tab');
	m1.onclick = function() {
		document.body.scrollTop=1000;
		a2.style.display = 'none';
		a3.style.display = 'none';
		a1.style.display = 'block';
	}
	m2.onclick = function() {
		document.body.scrollTop=1000;
		a1.style.display = 'none';
		a3.style.display = 'none';
		a2.style.display = 'block';
	}
	m3.onclick = function() {
		document.body.scrollTop=1000;
		a1.style.display = 'none';
		a2.style.display = 'none';
		a3.style.display = 'block';
	}
	addEventListener('scroll',myscroll,false);
	function myscroll(){
		var scH=document.documentElement.scrollTop||document.body.scrollTop;
		var tab=document.querySelector('.tab');
		if(scH>1000){
		tab.style.position="fixed";
		}else{
			tab.style.position="";
		}
	}


	var buyCart = document.getElementsByClassName("buy-cart")[0];
	function userBoughtThis(){
		var shopcar = user.attributes.shopcar;
		for(var i in shopcar){
			if(shopcar[i].itemid == currentID && shopcar[i].num == num.value && shopcar[i].size == selectSize && shopcar[i].color == selectColor){
				return true;
			}
		}
		return false;
	}
	function pleaseLogIn(){
		window.open("./logIn.html","_self");
	}
	buyCart.onclick = function(){
		if (!user) {
			pleaseLogIn();
			return;
		}
		var hint1 = document.getElementsByClassName("hint1")[0];
		var hint2 = document.getElementsByClassName("hint2")[0];
		hint2.style.display = "none";
		hint1.style.display = "none";
		// if(checkUserLogIn()){
			if(user)
			{
				if(colorClickFalg==true && sizeClickFalg==true){
					addItemToShopCar();
				}
				else{
					if(colorClickFalg==false){
						var warn = document.getElementsByClassName("warn")[0];
						warn.style.display = "block";
					}
					if(sizeClickFalg==false){
						var caution = document.getElementsByClassName("caution")[0];
						caution.style.display = "block";
					}
				}
				
			}else{
				hint2.style.display = "block";
			}
		}	
	// }
		
	function addItemToShopCar(){
		// var user = LGB.getCurrentUser();
		LGB.getUserShopCar(function(car){
			console.log(car);
			var shopcar = car || [];
			var record = {
			"itemid":currentID,
			"coverimg":coverimg,
			"itemname":document.getElementsByClassName("goods-title")[0].innerText,
			"price":document.getElementsByClassName("price")[1].innerText,
		 	"num":num.value,
		 	"size":selectSize,
		 	"color":selectColor,
		}
		shopcar.push(record);
		var hint1 = document.getElementsByClassName("hint1")[0];
		hint1.style.display = "block";

		LGB.updateShopCar({"shopcar":shopcar},function(obj){
			
			console.log("更新购物车成功",obj);
		},function(error){
			console.log("更新失败",error);
		});
		},function(){})
		var shopcar = user.attributes.shopcar||[];
		
	}

	
	var clearSlct= "getSelection" in window ? function(){
	window.getSelection().removeAllRanges();
	} : function(){
	 document.selection.empty();
	};
	window.onmouseup=function(){
	clearSlct();
	}
	window.onkeyup=function(){
	clearSlct();
	}
}
function setData(data){
//	1,设置商品名称
	var title = document.getElementsByClassName('goods-title')[0].getElementsByTagName('span')[0];
	title.innerText = data.attributes.itemname;
	var orgprice = document.getElementsByClassName('price')[0];
	orgprice.innerText=data.attributes.orgprice;
	var price = document.getElementsByClassName('price')[1];
	price.innerText = data.attributes.price;
	
	
	var colorArr=[];
	for(var i in data.attributes.color){
		var colors=document.createElement('div');
		colors.className='colors';
		colors.style.marginBottom = '4px';
		colorArr.push(colors);
		document.querySelector('.color').appendChild(colors);
		colors.addEventListener('click',function(){
			colorClickFalg=true;
			selectColor = this.innerText;
			console.log(selectColor);
			
			for(var j=0;j<colorArr.length;j++){
			colorArr[j].style.outline='';
			this.style.outline = "2px solid black";
			}
			return selectColor;
		},false);
		colors.innerText=data.attributes.color[i];
	}
	var warn = document.createElement('span');
	warn.className = "warn";
	warn.innerText = "请选择颜色";
	warn.style.color = "red";
	warn.style.display = "none";
	document.querySelector('.color').appendChild(warn);
	
	
	var sizeArr=[];
	for(var i in data.attributes.size){
		var sizes=document.createElement('div');
		sizes.className='size-s';
		sizeArr.push(sizes);
		document.querySelector('.size').appendChild(sizes);
		sizes.addEventListener('click',function(){
			sizeClickFalg=true;
			selectSize = this.innerText;
			console.log(selectSize);
			
			for(var j=0;j<sizeArr.length;j++){
			sizeArr[j].style.outline='';
			this.style.outline = "2px solid black";
			}
			return selectSize;
		},false);
		sizes.innerText=data.attributes.size[i];
	}
	var caution = document.createElement('span');
	caution.className = "caution";
	caution.innerText = "请选择尺码";
	caution.style.color = "red";
	caution.style.display = "none";
	document.querySelector('.size').appendChild(caution);

	
	coverimg = data.attributes.coverimg;
	BigImg = document.createElement('img');
	BigImg.id='J_BigImg';
	BigImg.src = data.attributes.detailimg[0];
	console.log(BigImg.src);
	document.querySelector(".big-img").appendChild(BigImg);
	var imgArr=[];
	for(var i = 0;i<5;i++){
		var liv = document.createElement("li");
		liv.className = "c";
		var img = document.createElement("img");
		var imgs = data.attributes.detailimg[i];
		img.src = imgs;
		imgArr.push(img);
		liv.appendChild(img);
		document.querySelector('.box1').appendChild(liv);
	}
	var listImg=document.querySelectorAll('.c');
	for(var i=0;i<listImg.length;i++){
		listImg[i].index=i;
		listImg[i].onmouseover=function(){
			BigImg.src=imgArr[this.index].src;
		}
	}


	var description = document.getElementsByClassName("graphic-text")[0];
	description.innerText=data.attributes.description;
	
	for(var i in data.attributes.set){
		var ars=document.createElement('span');
		var arsValue=document.createElement('span');
		var li = document.createElement('li');
		li.className='li';
		ars.className='ars';
		arsValue.className='ars_value';
		document.querySelector('.arguments').appendChild(li);
		li.appendChild(ars);
		li.appendChild(arsValue);
		var aaaa= data.attributes.set[i].key+"："+data.attributes.set[i].value
		li.innerText=aaaa;
		li.style.cssText="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;";
	}
	
	
	for(var i in data.attributes.detailimg){
		var lazy = document.createElement('img');
		lazy.className = "lazy";
		document.querySelector('.Img').appendChild(lazy);
		lazy.src=data.attributes.detailimg[i];
	}
	
	
}


function success(obj)
{
    console.log("查询成功",obj);
    setData(obj);
}
function error(error)
{
    console.log(error);
}
