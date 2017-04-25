var modify = document.getElementsByClassName("modify");
LGB.init();
LGB.getDataByTableName("Goods",13,success,error);
function success(obj)
{
	console.log(obj[1]);
    for(var i=0;i<obj.length;i++){
    	for(var j=0;j<modify.length;j++){
    		modify[j].index = i;
    		modify[this.index].onclick = function(){
    			console.log(this.index);
    		}
    	}
    }
}
function error(error)
{
    console.log(error);
}