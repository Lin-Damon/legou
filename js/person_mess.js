//搜索栏
		function visibleware(){
			//创造节点
			var ol=document.createElement('ol');
			var select=document.getElementsByClassName('select')[0];
			console.log(select)
			ol.style.listStyle='none';
			ol.style.margin=0;
			ol.style.padding=0;
			ol.style.paddingTop=5+'px';
			select.appendChild(ol);
			for(var i=0;i<2;i++){
				var li=document.createElement('li');
				li.style.width=58+'px';
				li.style.height=34+'px';
				li.style.textAlign='center';
				li.style.lineHeight=34+'px';
				li.style.color='orange';
				li.style.backgroundColor='white'
				li.className='ware';
				li.style.display='none';
				ol.appendChild(li);				
			}
			var li=document.getElementsByClassName('ware')
			li[0].innerText='商品';
			li[1].innerText='店铺'
			select.onmouseover=function(){
				for(var i=0;i<2;i++){
					li[i].style.display='block';
				}
			}
			select.onmouseout=function(){
				for(var i=0;i<2;i++){
					li[i].style.display='none';
				}
			}
			for(var i=0;i<2;i++){
				li[i].index=i;
				li[i].onmouseover=function(){
					this.style.backgroundColor='Seashell';				
				}
				li[i].onmouseout=function(){
					this.style.backgroundColor='white';				
				}
			}
		}

//左则点击事件
var per_title = document.getElementsByClassName("per_title");
var per_nav_item = document.getElementsByClassName("per_nav_item");
var cln = "per_nav_item d_none";//类名控制版块的消失
var clb = "per_nav_item d_block";//类名控制版块的显示
per_title[0].onclick = function(){//我的订单
	if(per_nav_item[0].className ==cln){
		per_nav_item[0].className=clb;
	}
	else{
		per_nav_item[0].className =cln
	}
}
per_title[3].onclick = function(){//优惠特权
	if(per_nav_item[1].className ==cln){
		per_nav_item[1].className=clb;
	}
	else{
		per_nav_item[1].className =cln
	}
}
per_title[5].onclick = function(){//安全设置
	if(per_nav_item[2].className ==cln){
		per_nav_item[2].className=clb;
	}
	else{
		per_nav_item[2].className =cln;
	}
}
per_title[6].onclick = function(){//维权管理
	if(per_nav_item[3].className ==cln){
		per_nav_item[3].className=clb;
	}
	else{
		per_nav_item[3].className =cln;
	}
}
per_title[7].onclick = function(){//帐号设置
	if(per_nav_item[4].className ==cln){
		per_nav_item[4].className=clb;
	}
	else{
		per_nav_item[4].className =cln
	}
}

//左则跳转到修改密码
var set_pass = document.getElementsByClassName("set_pass")[0];//要点击的事件
var per_cont_pass =document.getElementsByClassName("per_cont_pass")[0]//要显现的内容
var per_right_cont = document.getElementsByClassName("per_right_cont")[0];//隐藏的内容
set_pass.onclick = function(){
	jump(per_right_cont,per_cont_pass,shippAddress);
}
//点击基本信息跳转基本信息
var basic_mess = document.getElementsByClassName("basic_mess")[0];
basic_mess.onclick = function (){
	jump2(per_right_cont,per_cont_pass,shippAddress);
}
//左则跳转快递地址
var shippAddress = document.getElementsByClassName("shippAddress")[0];
per_title[4].onclick = function(){
	jump(per_cont_pass,shippAddress,per_right_cont);
}
function jump(a,b,c){
	a.className = "a le d_none";
	b.className = "b le d_block";
	c.className ="c le d_none";
}
function jump2(a,b,c){
	a.className = "a le d_block";
	b.className = "b le d_none";
	c.className = "c le d_none";
}
//年月日 birthday
var month_big = new Array("1","3","5","7","8","10","12"); //包含所有大月的数组
var month_small = new Array("4","6","9","11"); //包含所有小月的数组 
 init();
//页面加载时调用的初始化select控件的option的函数
function init()
{
  var select_year = document.getElementById("year"); //获取id为"year"的下拉列表框
  var select_month = document.getElementById("month"); //获取id为"month"的下拉列表框
  var select_day = document.getElementById("day"); //获取id为"day"的下拉列表框
   
  //将年份选项初始化，从1980到2000
  for(var i = 1920; i <= 2017; i++)
  {
    select_year_option = new Option(i, i);
    select_year.options.add(select_year_option);
  }
   
  //将月份选项初始化，从1到12
  for(var i = 1; i <= 12; i++)
  {
    select_month_option = new Option(i, i);
    select_month.options.add(select_month_option);
  }
   
  //调用swap_day函数初始化日期  
  swap_day();
}
//判断数组array中是否包含元素obj的函数，包含则返回true，不包含则返回false
function array_contain(array, obj)
{
  for (var i = 0; i < array.length; i++)
  {
    if (array[i] === obj)
    {
      return true;
    }
  }
  return false;
}
 
//根据年份和月份调整日期的函数
function swap_day()
{
  var select_year = document.getElementById("year"); //获取id为"year"的下拉列表框
  var select_month = document.getElementById("month"); //获取id为"month"的下拉列表框
  var select_day = document.getElementById("day"); //获取id为"day"的下拉列表框
   
  select_day.options.length = 0; //在调整前先清空日期选项里面的原有选项
  var month = select_month.options[select_month.selectedIndex].value; //获取被选中的月份month
   
  //如果month被包含在month_big数组中，即被选中月份是大月，则将日期选项初始化为31天
  if(array_contain(month_big, month))
  {
    for(var i = 1; i <= 31; i++)
    {
      select_day_option = new Option(i, i);
      select_day.options.add(select_day_option);
    }
  }
   
  //如果month被包含在month_small数组中，即被选中月份是小月，则将日期选项初始化为30天
  else if(array_contain(month_small, month))
  {
    for(var i = 1; i <= 30; i++)
    {
      select_day_option = new Option(i, i);
      select_day.options.add(select_day_option);
    }
  }
   
  //如果month为2，即被选中的月份是2月，则调用initFeb()函数来初始化日期选项
  else
  {
    initFeb();   
  }
}
//判断年份year是否为闰年，是闰年则返回true，否则返回false
function isLeapYear(year)
{
  var a = year % 4;
  var b = year % 100;
  var c = year % 400;
  if( ( (a == 0) && (b != 0) ) || (c == 0) )
  {
    return true;
  }
  return false;
}
 
//根据年份是否闰年来初始化二月的日期选项
function initFeb()
{
  var select_year = document.getElementById("year"); //获取id为"year"的下拉列表框
  var select_day = document.getElementById("day"); //获取id为"day"的下拉列表框
  var year = parseInt(select_year.options[select_year.selectedIndex].value); //获取被选中的年份并转换成Int
   
  //如果是闰年，则将日期选项初始化为29天
  if(isLeapYear(year))
  {
    for(var i = 1; i <= 29; i++)
    {
      select_day_option = new Option(i, i);
      select_day.options.add(select_day_option);
    }
  }
   
  //如果不是闰年，则将日期选项初始化为28天
  else
  {
    for(var i = 1; i <= 28; i++)
    {
      select_day_option = new Option(i, i);
      select_day.options.add(select_day_option);
    }
  }
}
//地区联动

//			console.log(provinces);
//			console.log(address.allCitys);
//			 console.log(address.getSubCity("广东"));
//			console.log(address.getCounty("广东","深圳"));
