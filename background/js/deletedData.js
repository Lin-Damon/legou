var ele = document.getElementsByClassName("select");
var del = document.getElementById("btn_2");
var father = document.getElementById("commodity_1");
LGB.init();
LGB.getDataByTableName("Goods",100,success,error);
function success(obj)
{
    for(var i=0;i<obj.length;i++){
    	del.onclick = function(){
    		if(confirm("确定删除吗？")){
    		for(var j=0;j<ele.length;j++){
    			if(ele[j].checked){
    				console.log(obj[j-1]);
    				console.log(ele[j]);
    				father.removeChild(ele[j].parentNode.parentNode);
    				LGB.deleteGoods(obj[j-1].id,success,error);
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