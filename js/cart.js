//legou头部
function LeguTop(topid){
	this.id=topid;
	this.LeguTopStyle=function(){
		var id = this.id;
		id.className="legutop_style";
		id.innerHTML="<div class='top-left'><a href='###' ><img  src='img/top1.png'/><span style='color:#333333;line-height: 30px;vertical-align:middle'>乐购首页</span></a></div><div class='top-right'><div class='nav1'><a href='###'>登录</a>&nbsp;<a href='###'>注销</a></div>|<div class='nav2'>☰&nbsp;我的订单</div>|<div class='nav3'><img src='img/top2.png'/>&nbsp;购物车</div>|<div class='nav4'>客服服务<span style='font-size: 5px;'>ⅴ</span></div>|<div class='nav5'><img src='img/top3.png'/>我的小店<span style='font-size: 5px;'>ⅴ</span></div></div>"
		var nav1 = document.getElementsByClassName("nav1");
		var nav3 =document.getElementsByClassName("nav3");
		var nav4 =document.getElementsByClassName("nav4");
		var nav5 =document.getElementsByClassName("nav5");
		var nav3ul =  document.createElement("ul");
		var nav4ul =  document.createElement("ul");
		var nav5ul =  document.createElement("ul");
		nav3[0].appendChild(nav3ul);
		nav4[0].appendChild(nav4ul);
		nav5[0].appendChild(nav5ul);
		for(var i=0;i<1;i++){
			var nav3li =  document.createElement("li");
			nav3ul.appendChild(nav3li);
			nav3li.innerHTML="购物车没有商品";
		}
		for(var i=0;i<3;i++){
			var nav4li =  document.createElement("li");
			nav4ul.appendChild(nav4li);
			nav4li.className="navli"
		}
		var navli = document.getElementsByClassName("navli");
			navli[0].innerHTML="消费者服务";
			navli[1].innerHTML="商家服务";
			navli[2].innerHTML="规则中心";
		for(var i=0;i<4;i++){
			var nav5li =  document.createElement("li");
			nav5ul.appendChild(nav5li);
			nav5li.className="navli2"
		}
		var navli2 = document.getElementsByClassName("navli2");
			navli2[0].innerHTML="管理后台";
			navli2[1].innerHTML="商家社区";
			navli2[2].innerHTML="商家培训";
			navli2[3].innerHTML="市场入驻 ";
			nav3[0].onmousemove=function(){
				nav3ul.style.display="block"
				this.onmouseout=function(){
					nav3ul.style.display="none"
				}
			}
			nav4[0].onmousemove=function(){
				nav4ul.style.display="block"
				this.onmouseout=function(){
					nav4ul.style.display="none"
				}
			}
			nav5[0].onmousemove=function(){
				nav5ul.style.display="block"
				this.onmouseout=function(){
					nav5ul.style.display="none"
				}
			}
	}
}

LeguTop.prototype.Login_logout = function(a,b,c,d){
	this.a=a;
	this.b=b;
	this.c=c;
	this.d=d;
	var nav1 = document.getElementsByClassName("nav1");
	var Inout= nav1[0].getElementsByTagName("a");
	Inout[0].innerText=this.a;
	Inout[0].href=this.b;
	Inout[0].style.color="black";
	Inout[1].innerText=this.c;
	Inout[1].href=this.d;
	Inout[1].onclick=function(){
		Inout[0].innerText="登录";
		Inout[1].innerText="注册";
	}
}
LeguTop.prototype.Lgougouwu = function(a,b,c,d,e,f,g){}


//legou底部
 function LeguButton(butid){
 	this.id=butid;
 	this.LeguButtonStyle=function(){
 		var id = this.id;
 		id.className="legubutton_style";
 		id.innerHTML="<div class='legu-foot'><div class='foot_help'><div class='foot_help_conter'><h4 class='foot_help_conter-h4'>-新手帮助-</h4><ul><li class='foot_help_item'>常见问题</li><li class='foot_help_item'>自助服务</li><li class='foot_help_item'>联系客服</li><li class='foot_help_item'>意见反馈</li><li class='foot_help_item'></li></ul></div><div class='foot_help_conter'><h4 class='foot_help_conter-h4'>-权益保障-</h4><ul><li class='foot_help_item'>全国包邮</li><li class='foot_help_item'>7天无理由退货</li><li class='foot_help_item'>退货运费补贴</li><li class='foot_help_item'>限时发货</li><li class='foot_help_item'></li></ul></div><div class='foot_help_conter'><h4 class='foot_help_conter-h4'>-支付方式-</h4><ul><li class='foot_help_item'>微信支付</li><li class='foot_help_item'>支付宝</li><li class='foot_help_item'>白付美支付</li><li class='foot_help_item'></li><li class='foot_help_item'></li></ul></div><div class='foot_help_conter'><h4 class='foot_help_conter-h4'>-移动客服端下载-</h4><ul><li class='foot_help_item'>乐购</li><li class='foot_help_item'>乐购杂志</li><li class='foot_help_item'>乐购淘</li><li class='foot_help_item'></li></ul></div></div><div class='foot_info'><ul><li class='foot_info_item'><a href='###'>关于我们</a></li><li class='foot_info_item'><a href='###'>招聘信息</a></li><li class='foot_info_item'><a href='###'>联系我们</a></li><li class='foot_info_item'><a href='###'>商家入驻</a></li><li class='foot_info_item'><a href='###'>商家后台</a></li><li class='foot_info_item'><a href='###'>乐购学院</a></li><li class='foot_info_item'><a href='###'>商家社区</a></li></ul><p>@2017Legou.com成都乐购网络公司</p><br /><p>营业执照注册号：3345451246544534&nbsp;|&nbsp;网络文化经营许可证：川网文（2016）0349-325号&nbsp;|&nbsp;增值电信业务经营许可证：B2-4574524585&nbsp;|&nbsp;安全责任书&nbsp;|&nbsp;公网安备&nbsp;5486544685346865号</p></div></div>"
 	}
 }