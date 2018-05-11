
//实例化对象
var chMethod = new myMethod(3,1);
	
	$(function(){

			

			$('#oNext').bind('click',function(){
				chMethod.flag = 0;
				chMethod.index++;
				if(chMethod.index>3){
					chMethod.index = 0;
				}
				chMethod.move($('#total div'),$('#two ol li'),$('#two ul li'));
			});

			$('#oPrev').bind('click',function(){
				chMethod.flag = 1;
				chMethod.index--;
				if(chMethod.index<0){
					chMethod.index = 3;
				}
				chMethod.move($('#total div'),$('#two ol li'),$('#two ul li'));
			});

			$('#two ol li').click(function(){
				chMethod.flag = 0;
				chMethod.index = $(this).attr("data-num");

				chMethod.move($('#total div'),$('#two ol li'),$('#two ul li'));
			});


			// chMethod.autoLb($('#total div'),$('#two ol li'),$('#two ul li'));
			
			// 鼠标移到轮播的图片停止轮播
			$("#two")
			.bind('mouseenter',function(){
				
				clearInterval(chMethod.timer);
			})
			// 鼠标移出自动轮播
			.bind('mouseleave',
				function(){
					chMethod.autoLb($('#total div'),$('#two ol li'),$('#two ul li'))
				}
				);

			$('#oNext2').click(function(){
				if($('#ulLb').position().left < -$(document).width()){
					$('#ulLb').animate({"left":"0"},500);
				}else{
					$('#ulLb').animate({"left":"+=-100%"},500);
				}
				
				// console.log($('#ulLb').position().left,$(document).width())
				
			})

			$('#oPrev2').click(function(){

				if($('#ulLb').position().left == 0){
					$('#ulLb').animate({"left":"-200%"},500);
				}else{
					$('#ulLb').animate({"left":"-=-100%"},500);
				}
			})

			$('#goTop').click(function(){
				chMethod.backTop();
			})

		})//end

/**
* [method description]
* @param  {[type]} index [description]
* @return {[type]}       [description]
*/
function myMethod(index,flag){
	this.index = index;
	this.flag = flag;
}

// 定义轮播的方法
myMethod.prototype.move = function(oDiv,oCircle,oUl){
	// 判断动画是否处于动画状态
		var This = this;
		if(!oDiv.is(":animated")){
			

				// 将div设定位置
				oDiv.each(function(i){
					$(this).css({left:(-350+i*30)+'px',top:0,background:'url(./images/c'+This.index+'.jpg) no-repeat 0 0',opacity:0});
					$(this).css('backgroundPositionX',-150*i+'px')
					.css("background-size","cover");
				});


				oCircle
				.css({"border-color":"transparent"})
				.eq(This.index).css({"border-color":"#d1da26"});

				oUl.css({opacity:0})
				.eq(This.index).css({opacity:1});

				
				var num=30,num2=20;

				if(This.flag){
					for(var i=oDiv.length-1;i>=0;i--){
						num += 10;
						num2*=-1;
						oDiv.delay(i*num+num).eq(i).animate({left:150*i,top:num2,opacity:.8},500,function(){
							$(this).animate({top:0,opacity:1},300);
						});
					}
				}else{
					for(var i=0;i<=oDiv.length;i++){
						num += 10;
						num2*=-1;
						oDiv.delay(i*num+num).eq(i).animate({left:150*i,top:num2,opacity:.8},500,function(){
							$(this).animate({top:0,opacity:1},300);
						});
					}
				}
			
		}
};

// 定义自动轮播的方法
myMethod.prototype.autoLb = function(oDiv,oCircle,oUl){

	
	var This = this;
		clearInterval(This.timer);
		This.timer = setInterval(

			//清除定时器叠加
			function(){	
				 This.index++;
				 if(This.index>3){
					This.index = 0;
				}

				This.move(oDiv,oCircle,oUl);
			}
			,5000);
	
	

}

//定义回到顶部的方法
myMethod.prototype.backTop = function(){
	var This = this;
		this.timer2 = setInterval(function(){//初始化定时器
			var oTop = $(document).scrollTop();//获取当前滚动条距上的高度
			
			var speed = Math.ceil(oTop/4);//设置速度
			// document.body.scrollTop = document.documentElement.scrollTop = oTop-speed;
			$(document).scrollTop(oTop - speed);

			if(oTop == 0)

				clearInterval(This.timer2);
		},30);
}

