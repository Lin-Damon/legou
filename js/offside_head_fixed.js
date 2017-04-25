function Offside(id1,herf1,herf2,herf3,herf4){
	this.id=id1;
	var herf1 = herf1||"../pages/shopCar.html",herf2 = herf2||"#",herf3 = herf3||"#",herf4 = herf4||"#";
	this.OffsideStyle=function(){
		console.log(1);
		var offside = document.getElementById(this.id);
		offside.style.cssText="position: fixed;z-index:9000;width: 29px;height:100%;font-size:12px;right:-30px;color: white;background-color: #202020;";
		var offside1 = document.createElement("div");//为下面布局做一个绝对定位
		offside.appendChild(offside1);
		offside1.style.cssText="position:relative;height:100%;width:23px;";
		var offside2 = document.createElement("div");
		offside1.appendChild(offside2);
		//0ffside2是一直显示的购物车
		offside2.innerHTML="<a href="+herf1+" style='text-decoration:none;'><img style='margin:4px 0 2px 2px;' src='../img/rightgou1.png' width='70%'/><br /><span>购物车</span></a>";
		offside2.style.cssText="z-index:9999;color:white;position:fixed;right:0;top:79px;background-color:#202020;text-align: center;width: 23px; height: 76px;vertical-align:middle;padding:4px 3px 0;list-style-type:none;"
		for(var i=0;i<6;i++){
			var offside1 = offside.getElementsByTagName("div")[0];
			var offsideli =document.createElement("li");
			offside1.appendChild(offsideli);
			offsideli.className="offsidelis";
			// console.log(1);
			offsideli.style.cssText="background-color:#202020;text-align: center;width: 23px;height: 75px;vertical-align:middle;padding:4px 3px 0 ;border-bottom:1px solid white;list-style-type:none ;"
		}
		var offsidelis=document.getElementsByClassName("offsidelis");
		offsidelis[1].innerHTML="<a href="+herf2+" style='text-decoration:none;'><img style='margin:6px 0 3px 0;' src='../img/rightgou1.png' width='60%'/><br /><span>购物车</span></a>";
		offsidelis[2].innerHTML="<a href="+herf2+" style='text-decoration:none;'><img style='margin:6px 0 3px 0;' src='../img/righthui1.png' width='60%'/><br /><span>优惠券</span></a>";
		offsidelis[3].innerHTML="<a href="+herf3+" style='text-decoration:none;'><img style='margin:6px 0 3px 0;' src='../img/rightqu1.png' width='60%'/><br /><span>钱包</span></a>";
		offsidelis[4].innerHTML="<a href="+herf4+" style='text-decoration:none;'><img style='margin:6px 0 3px 0;' src='../img/rightzhu1.png' width='60%'/><br /><span>足迹</span></a>";
		//返回顶部
		offsidelis[5].innerHTML="<a href='#top' style='display: block;border-bottom: 1px solid white;'>^</br>TOP</a> ";
		offsidelis[5].style.borderBottom="none";
		offsidelis[5].style.display="none";
		offsidelis[5].style.paddingTop=40+"px";
		//a标签样式
		var offa =offside1.getElementsByTagName("a");
		offa[0].style.color="white";
		offa[1].style.color="white";
		offa[2].style.color="white";
		offa[3].style.color="white";
		offa[4].style.color="white";
		offa[5].style.cssText="color:white;text-decoration:none";
		function zf(){
			offside.style.transition= "all 1s";
			offside.style.right=0+"px";
		}
		//鼠标样式
		offside2.onmouseover=function(){
			offside2.style.backgroundColor="red";
			zf();
			this.onmouseout=function(){
				offside2.style.backgroundColor="#202020";
				offside.style.right=-29+"px";
			}
		}
		for(var i=0;i<offsidelis.length;i++){
			offsidelis[i].index=i;
			offsidelis[i].onmouseover=function(){
			zf();
			offsidelis[this.index].style.backgroundColor="red";
			if(this.index==0||this.index==5){
				console.log(this.index);
				offsidelis[this.index].style.backgroundColor="#202020";
			}
			this.onmouseout=function(){
				offsidelis[this.index].style.backgroundColor="#202020";
				offside.style.right=-29+"px";
			}
		}
		}
		offside2.onclick=function(){
			
		}
		}
	}
//登录后显示头像img和用户链接
Offside.prototype.OffsideEntry = function(imgsrc,herf){
	var offsidelis=document.getElementsByClassName("offsidelis");
	offsidelis[0].innerHTML="<a href="+herf+"><img src="+imgsrc+" /></a>"
	var OffsidePhoto=offsidelis[0].getElementsByTagName("img");
	OffsidePhoto[0].style.cssText="display: block;width:12px;height:12px;border-radius:50%;border:1px solid white;margin:50px 8px 5px 5px;"
}




////head的fixed
function HeadFixed(tagId,navurl,navvaule){
	this.HeadFixedStyle=function(){
		var head =document.getElementById(tagId);
		head.style.cssText="position: fixed;top:-55px;left: 0;width: 100%;height: 50px;background-color: #fdeed9;box-shadow: 0 1px 6px 0 #ccc;z-index: 7000;"
		//滚动事件
		window.onscroll = function(){ //绑定scroll事件
		    var t = document.documentElement.scrollTop || document.body.scrollTop;  
		    var top_div = document.getElementsByClassName("offsidelis" );
		    if( t >= 100 ) { //判断
		        head.style.transition= "all 0.5s";
				head.style.top=0;
				 top_div[5].style.display = "block"; 
		    } else { 
		        head.style.top= -55+"px";
		        // console.log(top_div);
		        top_div[5].style.display = "none"; 
		    } 
		}
		var headcopy = document.createElement("div");//为下面布局做一个绝对定位
		head.appendChild(headcopy);
		headcopy.style.cssText="position: relative;text-align: center;"
		headcopy.innerHTML="<img src='../img/logo.png' style='width: 115px;height: 30px;position: absolute;left: 5px;top: 5px;'/><div class='nav_search' style='width:480px;height:50px;margin: 0 auto;'></div>"
		var nav_search = document.createElement("div");
		var nav_headcopy =document.getElementsByClassName("nav_search");
		nav_headcopy[0].appendChild(nav_search);
		nav_search.style.cssText=" z-index:22;width: 480px;height: 34px;border: 1px solid #ffc90e;background-color:white;border-radius: 0 6px 6px 0;margin-top: 5px;";
		var nav_com=document.createElement("div");
		nav_search.appendChild(nav_com);
		nav_com.style.position="relative";
		nav_com.innerHTML="<span style='color: #ffc90e;float: left; display: inline-block;width: 75px;height: 34px;line-height: 34px;cursor: pointer;'>搜商品<img src='../img/navsj.png' style='display:inline-block;width: 8px;height: 8px;margin: 2px;'/></span><ul style='position:absolute;top:34px;left:-1px;list-style-type:none;margin:0;padding: 0;width: 75px;display: none;border:1px solid gainsboro;border-top:none; background-color: white'><li style='width: 75px;height: 30px;line-height: 30px;'><span style='text-decoration:none;color: #ffc90e;cursor:pointer'>搜店铺</span></li><li style='width:75px;height: 30px;line-height:30px;'><span style='text-decoration:none;color: #ffc90e;cursor:pointer'>搜商品</span></li></ul></div><input type='text' id='search_input' placeholder='极简校园系帆布鞋' style='display: inline-block; width: 303px;height: 26px;border: none;line-height: 34px;outline: none;'/><span id='search_btn'  style='display: inline-block;width: 77px;height: 34px;line-height: 34px;color:white;font-size: 18px;border-radius: 0 5px 5px 0;border: none;outline: none;background-color: #ffc90e;cursor: pointer;padding-left:25px'>搜&nbsp;&nbsp;&nbsp;索<span>"
		var inputs = nav_com.getElementsByTagName("input");
		//兼容火狐
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		         inputs[0].style.width=303+"px";
		   } 
		var nav_com_ul=nav_com.getElementsByTagName("ul")[0];
		var nav_com_li=nav_com.getElementsByTagName("li");
		var nav_com_span=nav_com.getElementsByTagName("span")[0];
		var nav_com_span_div=nav_com_span.getElementsByTagName("div")[0];
		nav_com_span.onmouseover=function(){
			nav_com_ul.style.display="block";
			this.onmouseout=function(){
				nav_com_ul.style.display="none";
			}
		}
		nav_com_li[0].onmouseover=function(){
			nav_com_li[0].style.backgroundColor="gainsboro"
			nav_com_ul.style.display="block";
			this.onmouseout=function(){
				nav_com_ul.style.display="none";
				nav_com_li[0].style.backgroundColor="white"
			}
		}
		nav_com_li[1].onmouseover=function(){
			nav_com_li[1].style.backgroundColor="gainsboro"
			nav_com_ul.style.display="block";
			this.onmouseout=function(){
				nav_com_ul.style.display="none";
				nav_com_li[1].style.backgroundColor="white"
			}
		}
		nav_com_li[0].onclick=function(){
			nav_com_span.innerHTML="搜店铺<img src='../img/navsj.png' style='display:inline-block;width: 8px;height: 8px;margin: 2px;'/>";
		}
		nav_com_li[1].onclick=function(){
			nav_com_span.innerHTML="搜商品<img src='../img/navsj.png' style='display:inline-block;width: 8px;height: 8px;margin: 2px;'/>";
		}
	}
}