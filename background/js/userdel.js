var el = document.getElementsByClassName("select_1");
var del_2 = document.getElementById("btn_6");
var father_2 = document.getElementById("commodity");
LGB.init();
LGB.getDataByTableName("_User",100,success,error);
function success(obj)
{
    for(var i=0;i<obj.length;i++){
    	console.log(obj[i]);
    	del_2.onclick = function(){
    		if(confirm("确定删除吗？")){
    		for(var j=0;j<el.length;j++){
    			el[j].index = i;
    			if(el[j].checked){
    				father_2.removeChild(el[j].parentNode.parentNode);
    				LGB.deleteGoods(obj[this.index],success,error);
    				function success(obj)
					{
					    console.log("保存成功:",obj);
					}
					function error(error)
					{
					    console.log(error);
					}
					}
    		}
    		}else{
    			return;
    		}
    	}
    }
}
function error(error)
{
    console.log(error);
}