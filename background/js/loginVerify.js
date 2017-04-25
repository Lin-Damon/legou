window.onload = function(){
	var user=localStorage.user; 
//	var pass=localStorage.pass;
	if (user == null) {
		alert("请先登录！！！！！！");
		window.location.href="login.html";
        console.log(localStorage.user);
	}
}
window.onbeforeunload = onbeforeunload_handler;    
    function onbeforeunload_handler(){   
//      var warning="确认退出?";
        localStorage.removeItem("user");
//      return warning;   
    }