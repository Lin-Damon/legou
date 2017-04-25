LGB.init();
var input_mail = document.getElementsByClassName("input_mail")[0];
var confirm_modify = document.getElementsByClassName("confirm_modify")[0];
var check_mail = document.getElementsByClassName("check_mail")[0];
window.onkeydown = function(e){
	if(e.keyCode==13){
		modilf_pass();
	}
}
confirm_modify.onclick = function(){
	modilf_pass();
}
function modilf_pass(){
	var input_mails = input_mail.value;
	LGB.resetPassword(input_mails,successFN,errorFN);
	var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	if(!reg.test(input_mails)){
		check_mail.innerHTML = "请输入正确的邮箱";
		check_mail.style.color = "red";
		check_mail.className="check_mail d_block"
	}
	else{
		check_mail.innerHTML = "已发送邮箱，请查收,如超过20s没收到，请再次输入邮箱";
		check_mail.style.color = "greenyellow";
		check_mail.className="check_mail d_block"
	}
	function successFN(){
		
	}
	function errorFN(error){
	}
}
input_mail.onfocus = function(){
	input_mail.value="";
	check_mail.className="check_mail d_none"
	
}
