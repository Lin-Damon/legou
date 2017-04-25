var btn = document.getElementsByClassName("btn");
var page = document.getElementsByClassName("article");
var page_1 = document.getElementsByClassName("article_1");
var page_2 = document.getElementsByClassName("article_2");
btn[0].onclick = function(){
	page[0].style.display = "block";
	page_1[0].style.display = "none";
	page_2[0].style.display = "none";;
}
btn[1].onclick = function(){
	page_1[0].style.display = "block";
	page[0].style.display = "none";
	page_2[0].style.display = "none";
}
btn[2].onclick = function(){
	page_2[0].style.display = "block";
	page_1[0].style.display = "none";
	page[0].style.display = "none";
}

var box = document.getElementById("commodity_1");




var box_1 = document.getElementById("article_3");



//选中删除事件
var ele = document.getElementsByClassName("select");
var del = document.getElementById("btn_2");
var father = document.getElementById("commodity_1");
del.onclick = function(){
	for(var i=1;i<ele.length;i++){
		if(ele[i].checked){
			console.log(i);
		father.removeChild(ele[i].parentNode.parentNode);
		}else{
			return;
		}
	}
}
//复选框选中事件_1
ele[0].onclick = function(){
	if(ele[0].checked==true){
	for(var i=1;i<ele.length;i++){
		ele[i].checked = true;
	}
    }else{
    	for(var i=1;i<ele.length;i++){
    	ele[i].checked =false;
    	}
    }
}
for(var i=1;i<ele.length;i++){
	ele[i].onclick = function(){
	    for(var i=1,b=0;i<ele.length;i++){
	    	if(ele[i].checked==true){
	    		b++;
	    		console.log(b);
	    	}
	    }
	    if(b==ele.length-1){
	    	ele[0].checked = true;
	    }else{
	    	ele[0].checked = false;
	    }
	}
}



