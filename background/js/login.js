var username = document.getElementById("text");
var passwor = document.getElementById("password");
var btn = document.getElementById('login');
var verus = document.getElementById('verifyuser');
var verpa = document.getElementById('verifypass');
var hint = document.getElementById("hint");     
btn.onclick = function(){
	var user = username.value;
	var pass = passwor.value;
	stopDef();
	if(user&&pass){
	LGB.init();
	console.log(username);
	LGB.superLogIn(user,pass,success,error);
	function success(user)
	{
	    console.log("登录成功",user);
	    window.location.href="index.html";
	    localStorage.setItem("user",user);
		console.log(localStorage.user);
	}
	
	function error(error)
	{
	    console.log(error);
	    hint.value = '请输入正确的用户名或密码......'
	    verus.value = '';
		verpa.value = '';
	}
	}else{
		verus.value = '请输入用户名';
		verpa.value = '请输入密码';
		hint.value = ''
	}
}
function stopDef(){
			var event = getEvent();
			if (event.preventDefault) {
				event.preventDefault();
			}
			else{
				event.returnValue = false;
			}
		}

		function getEvent(){
			if (window.event) {return window.event};
			//找到Firefox里面的事件
			var func = getEvent.caller;//找到该函数的调用者
			console.log(func);
			while(func != null)
			{
				console.log(func.arguments[0]);
				if (func.arguments[0]) {
					return func.arguments[0];
				}
				func = func.caller;
			}
			return null;
		}