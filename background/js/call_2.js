LGB.init();
LGB.getDataByTableName("_User",100,success,error);//获取Goods表中的前100条数据
function success(ogg)
{
//  console.log("获取成功:",ogg);
    for(var i=0;i<ogg.length;i++){
//  	console.log(ogg[i]);
    	var box = document.getElementById("commodity");
	    var ul = document.createElement("ul");
	    var li_inp = document.createElement("li");
	    var li_name = document.createElement("li");
	    var li_sex = document.createElement("li");
	    var li_phone = document.createElement("li");
	    var li_address = document.createElement("li");
	    box.appendChild(ul);
	    ul.appendChild(li_inp);
	    li_name.innerText = ogg[i].attributes.username;
	    ul.appendChild(li_name);
	    li_sex.innerText = ogg[i].attributes.sex;
	    ul.appendChild(li_sex);
	    if(ogg[i].attributes.phone){li_phone.innerText = ogg[i].attributes.phone;}else{li_phone.innerText = "无"}
        ul.appendChild(li_phone);
        if(ogg[i].attributes.address){li_address.innerText = ogg[i].attributes.address;}else{li_address.innerText = "无"}
	    ul.appendChild(li_address);
    }
}
function error(error)
{
    console.log(error);
}