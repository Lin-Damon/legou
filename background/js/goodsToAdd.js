			var some = document.querySelector("#some_3");
			//添加一个节点
			function addBox(){
				var box = document.createElement("div");
				var img = document.createElement("img");
				var hidden = document.createElement("input");
				hidden.name = "detailimg";
				img.src = "img/shi.png";
				img.className = "upload";
				box.className = "box";
				var node;
				hidden.empty = true;//代表这是空的选择框
				hidden.type = "file";
				hidden.className = "hidden";
				hidden.addEventListener("change",changeFn,false);
				some.appendChild(box);
				box.appendChild(img);
				box.appendChild(hidden);
			};
			//九宫格的函数
			function changeFn(e){
				var e = e||window.event;
				var node = e.target.parentNode;
				var hidden = node.getElementsByClassName("hidden")[0];
				var upload = node.getElementsByClassName("upload")[0];
				var num = document.getElementsByClassName("box").length;
				if(hidden.empty&&num<9)
				{
					addBox();
				}
				hidden.empty = false;
				changeImgSrc(hidden,upload);
			}
			window.onload = function(){
//				data;
//				if(展示){ data.num  };
//				if(新建){addBox()};
				addBox();
			}
			//改变img的src的函数
			function changeImgSrc(inp,img){
				var file = inp.files[0];
//				console.log(inp);
				
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function(e){
//					console.log(e);
					var src = e.target.result;
					img.src = src;
				}
			}
			



var submit = document.getElementById("submit");
			var form = document.getElementById("big");
			var id = '';
			
//			var sett = document.getElementById("set").value;
//			console.log(sett);
			//转化为json
//			console.log(stringToJson(sett));
			function stringToJson(str){
				var res = [];
				var arr = str.split("-");
//				[:,:]
				for(var i in arr)
				{
					var newarr = arr[i].split(":");
					var obj = {
						"key":newarr[0],
						"value":newarr[1],
					}
					res.push(obj);
				}
				return res;
			}
			
			
//			var set = JSON.parse(string);
//			console.log(set);
			
//			console.log(form.size);
			//获取以时间命名的函数
			function getCurrentDate(){
				var name ='';
				var time = new Date();
				var year = time.getFullYear(); //返回该日期的年
				var month = time.getMonth();//返回该日期的月（注意，这里用0表示1月，所以真实的月份应该+1）
				var day = time.getDate()//返回该日期是该月的第几天;
				var h = time.getHours();
				var m = time.getMinutes();
				var s = time.getSeconds();
				var random = Math.floor(Math.random()*100000);
				name = ''+year+month+day+h+m+s+random+".jpg";
				return name;
			}
			
			//上传事件
			submit.onclick = function(){
//				console.log(1212);
				
				
				LGB.init();
				var data = {
					"itemname":form.item_name.value,
					"price":form.price.value,
					"size":form.size.value,
					"color":form.color.value,
					"set": stringToJson(form.set.value),
					"type":form.type.value,
					"coverimg":'',
					"description":form.description.value,
					"detailimg":'',
				}
				console.log(data);
				LGB.save("Goods",data,function(obj){console.log(obj)},function(error){console.log(obj)});

			}
			
			
			function success(obj){
				console.log(obj);
			}
			function error(obj){
				console.log(obj);
			}
			function uploadCover(){
				LGB.uploadFile(form.coverimg,getCurrentDate(),function(obj){
					return obj;
				},function(error){
					console.log(error);
				})
			}
			function uploadDetail(){
				var count;
				var boxs = document.getElementsByClassName("box");
				var lastHidden = boxs[boxs.length-1].getElementsByClassName("hidden")[0];
				var hiddens = document.getElementsByClassName("hidden");
//				alert(hiddens.constructor === Array);
				var hs = [];
				for(var i = 0;i<hiddens.length;i++)
				{
					hs.push(hiddens[i]);
				}
//				console.log(hiddens);
				if(!lastHidden.files.length>0){
					hs.pop();
				}
				
				var arr =[];
				for(var i in hs){
//					console.log(hs[i]);
					LGB.uploadFile(hs[i],getCurrentDate(),function(obj){
						arr.push(obj);
						console.log(obj);
						if(arr.length == hs.length)
						{
//							console.log(arr);
							return arr;
						}
						
					},function(error){console.log(error)});
				}
				
			}