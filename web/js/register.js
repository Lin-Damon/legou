//注册帐号与已有
var free_regist = document.getElementsByClassName("free_regist")[0];
var lg_left = document.getElementsByClassName("lg_left")[0];//邮箱登陆
var lg_left_regist = document.getElementsByClassName("lg_left_regist")[0];//新用户注册
free_regist.onclick = function(){
	lg_left.className = "lg_left lf d_none";
	lg_left_regist.className = "lg_left_regist lf d_block"
}
var exist_user = document.getElementsByClassName("exist_user")[0];
exist_user.onclick = function(){
	lg_left.className = "lg_left lf d_block";
	lg_left_regist.className = "lg_left_regist lf d_none"
}
//验证登陆   后台数据 
var error_tip = document.getElementsByClassName("error_tip")[0];
var mail_name = document.getElementsByClassName("mail_name")[0];
var vaildation_pass = document.getElementsByClassName("vaildation_pass");
var btn = document.getElementsByClassName("submit")[0];
btn.onclick = function(){
	login();
}
window.onkeydown = function(e){
	if(e.keyCode==13){
		login();
		new_register();
	}
}
LGB.init();
function login(){//登陆
	var mail_name = document.getElementsByClassName("mail_name")[0];
	var vaildation_pass = document.getElementsByClassName("vaildation_pass")[0];
	var username = mail_name.value;
	var passwords = vaildation_pass.value;
	if(mail_name.value==""){
			error_tip.className="error_tip d_block";
			error_tip.innerText="请输入你的用户名";
			vaildation_pass.value ="";
			return;
		}
		else if(vaildation_pass.value==""){
			error_tip.className="error_tip d_block";
			error_tip.innerText="请输入你的密码";
			vaildation_pass.value ="";
			return;
		}
		else{
			LGB.logIn(username,passwords,successFN,errorFN);
			function successFN(obj){
				window.open("../index.html","_self");
			}
			function errorFN(error){
				if(error.code=="301"||error.code=="202"||error.code=="101"){
				error_tip.className="error_tip d_block";
				error_tip.innerText="你输入的邮箱或密码错误，或者用户不存在";
				}	
			}
		}
	}
//再次点击时，隐藏错误的信息
mail_name.onfocus = function(){
	error_tip.className = "error_tip d_none";
}

//新用户注册
var new_mail = document.getElementsByClassName("new_mail")[0];//邮箱
var mail_pass = document.getElementsByClassName("mail_pass")[0];//密码
var confirm_mail = document.getElementsByClassName("confirm_mail")[0];//确认密码
var enter = document.getElementsByClassName("enter")[0];
var errorTip = document.getElementsByClassName("errorTip")[0];
enter.onclick = function(){
	new_register();
}
function new_register(){
	var check=document.querySelector('.checkbox');
	if(check.checked){//判断是否点击了同意乐购协议，如果同意了，进行下一步判断，是否输入邮箱正确
		if(mail_pass.value!=confirm_mail.value){
		errorTip.innerText = "你所输入密码错误";
		errorTip.className = "errorTip d_block";
		confirm_mail.value = "";
		return;
		}
		else{
			var data={							//将获取到的邮箱和密码
			"email":new_mail.value,
			"username":new_mail.value,
			"password":mail_pass.value,
			"favaicon":"http://bmob-cdn-9441.b0.upaiyun.com/2017/03/15/037579ef4013c5ea809ee4fde3fed0b9.jpg"
		};
		LGB.signUp(data,successFN,errorFN);
		function successFN(obj){
			errorTip.innerText = "已向你的邮箱发送验证信息，请查收";
			errorTip.className = "errorTip d_block";
			errorTip.style.color="lightseagreen"
		}
		function errorFN(error){
			if(error.code=="301"||error.code=="202"||error.code=="101"||new_mail.value==""||mail_pass.value==""||confirm_mail==""){
				errorTip.innerText = "你所输入的邮箱格式错误,或者没有输入密码";
				errorTip.className = "errorTip d_block";
				}		
			}
		}
	}else{
		errorTip.innerText = "请点击同意乐购网络服务使用协议";
		errorTip.className = "errorTip d_block";
		return 
	}
}
new_mail.onfocus = function(){//点击时，小提示消失
	errorTip.className = "errorTip d_none";
}
mail_pass.onfocus = function(){
	errorTip.className = "errorTip d_none";
}
confirm_mail.onfocus = "errortip d_none"

