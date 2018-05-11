// 轮播图

$(function(){

	// 实例化构造函数
	var oBanner = new banner(0);

	$('#next').bind('click',function(){
		if(!$('#ul-banner li').is(":animated")){
			oBanner.index++;
			if(oBanner.index >=7){
				oBanner.index = 0;
			}
			// console.log(oBanner.index);
			oBanner.move($('#ul-banner li'));
			oBanner.moveTitle($('#banner_title'));
			// console.log(oBanner.constructor);
			// console.log(oBanner.__proto__);
		}
		
	});

	$("#prev").bind('click',function(){
		if(!$('#ul-banner li').is(":animated")){
		oBanner.index <= 0 ? oBanner.index = 6 : oBanner.index--;
		// console.log(oBanner.index);
		oBanner.move($('#ul-banner li'));
		oBanner.moveTitle($('#banner_title'));
		}
	});
	// $("#ul-banner li:eq(2)").animate({opacity:"1"},1000);

	$('#banner_title')
	.bind('mouseover',function(e){
		//事件委托
		var tar = e.target;
		if(tar.nodeName == "LI"){
			
			$('#ul-banner li').stop(true);
			oBanner.index = $(tar).attr("data-index");
			oBanner.move($('#ul-banner li'));
			oBanner.moveTitle($('#banner_title'));
	
		}
	});

	setInterval(function(){
		if(document.documentElement.clientWidth < 705){//判断是否处于手机的尺寸
		
			// alert("df")
			$('#ul-banner li').stop(true);
		oBanner.move($('#ul-banner li'));
		oBanner.index++;
			if(oBanner.index >=7){
				oBanner.index = 0;
			}
	}
	},3000);
	

// 画布
var canvas = document.getElementById("can");
var cxt = canvas.getContext('2d');
cxt.beginPath();
cxt.moveTo(0,0);
cxt.lineTo(20,20);
cxt.strokeStyle = "rgba(99,99,99,.8)";
cxt.stroke();

cxt.beginPath();
cxt.moveTo(20,20);
cxt.lineTo(40,0);
cxt.stroke();

	// 回到顶部
	var toTop = $('#back_top').get(0);

	toTop.onclick = function(){
		oBanner.backTop();
	};

	$('#goTop').click(function(){
		alert("Df")
	})

// console.log(oBanner.constructor);//通过实例对象查看构造函数


});//end


// 定义一个轮播图构造函数
function banner(index){
	this.index = index;
	this.timer = null;
}

//定义构造函数的原型方法
banner.prototype = {
	//避免原来的constructor被覆盖掉
	constructor:banner,
	move:function(obj){
			obj
			.css("opacity","0")
			.eq(this.index)
			.animate({opacity:"1"},1200);		
	},
	moveTitle:function(obj){
		$(obj)
		.children()
		.css({"border-top-color":"#fff","color":"#999"})
		.eq(this.index)
		.css({"border-top-color":"#000","color":"#000"});
	},

	// 定义一个回到顶部的方法
	backTop:function(){
	var This = this;
	
		this.timer = setInterval(function(){//初始化定时器

			myBool = true;

			// console.log("df")
			var oTop = document.body.scrollTop || document.documentElement.scrollTop;//获取当前滚动条距上的高度
			
			var speed = Math.ceil(oTop/8);//设置速度
			document.body.scrollTop = document.documentElement.scrollTop = oTop-speed;

			
				banner.prototype.clear = function(){//定义一个专门清除当前定时器的函数
					clearInterval(This.timer);
				}
				if(oTop == 0)
					banner.prototype.clear();
			
		},30);

	}

};



