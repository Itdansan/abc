// 主体JS

$(document).ready(function(){

	/*实例化构造函数*/
	var oMethod = new method(0);

	$("#man").toggle(
		function(){
			if($("#login-a").attr("data-index")==1){
				oMethod.hideLogin();
			}else{
				oMethod.showLogin();
			}
		},
		function(){
			if($("#login-a").attr("data-index")==1){
				oMethod.hideLogin();
			}else{
				oMethod.showLogin();
			}
		}
		
	);
	
	
	//点击登陆按钮
	$('#login-a')
	.bind('click',
		function(){
			oMethod.flag = 0;
			// console.log(oMethod.flag);
			oMethod.showLogin();
		}
		)
	.hover(oMethod.showUnderline,
		oMethod.showUnderline);


	//点击注册按钮
	$('#register')
	.on('click',

		function(){
			oMethod.flag = 1;
			// console.log(oMethod.flag);
			oMethod.showLogin();
		}

		)
	.hover(oMethod.showUnderline,
		oMethod.showUnderline);


	$('#hold_login').click(function(){
		$(this).parent().toggleClass('check');
		
	});



	//点击搜索按钮
	$('#search').toggle(function(){
		if($("#search").attr("data-index") == 0){
			oMethod.showSearch();
		}else{
			oMethod.hideSearch();
		}
	},
	function(){
		$("#search").attr("data-index") == 0 ? oMethod.showSearch() : oMethod.hideSearch();
	});

	$('#close_search').click(oMethod.hideSearch);

	//点击搜索框
	$("#want_search").focus(function(){
		$(this).next().animate({opacity:"0"},300)
	});
	

	// 登陆表单验证

	/*第一个input*/
	$('#login_check>input:first')
	.focus(function(){
		$(this)
		.css({"border-color":"#999",color:"#000"})
		.next().css("color","transparent");
		
	})
	.blur(function(){
		// 验证手机号
		var pattern = /^(1([358][0-9]|(47)|[7][0178]))[0-9]{8}$/;
		// 验证邮箱
		var  pattern2 = /^[1-9a-zA-Z][0-9a-zA-Z]{4,}@([0-9a-zA-Z]{2,})\.(com|net|cn|org|COM)$/;
		var bool = pattern.test($(this)[0].value);
		var bool2 = pattern2.test($(this)[0].value);
		// bool ?  $(this).css("border-color","#999") : $(this).css("border-color","red"); 
		if(bool || bool2){
			$(this).css("border-color","#999");
		}else{
			$(this)
			.css({"border-color":"red",color:"transparent"})
			.next()
			.css({color:"red"})
			.text("请输入有效的邮箱/手机号码!");
		}

	});

	/*第二个input*/
	$('#login_check>input:eq(1)')
	.focus(function(){
		//判断第一个input是否有输入内容
		$('#login_check>input:first')[0].value == '' ? $('#login_check>input:first').css("border-color","red") : $('#login_check>input:first').css("border-color","");

		$(this)
		.css({"border-color":"#999",color:"#000"})
		.next().css("color","transparent");
	})
	.blur(function(){
		// 验证密码
		var pattern =/^.{6,12}$/;
		var bool = pattern.test($(this)[0].value);
		if(bool){
			$(this).css("border-color","#999");
		}else{
			$(this)
			.css({"border-color":"red",color:"transparent"})
			.next()
			.css({color:"red"})
			.text("密码必须在6-12个字符之间");
		}
	});

	/*第三个input*/
	$("#login_check>input:eq(2)")
	.focus(function(){
		//判断第一、二个input是否有输入内容
		$('#login_check>input:first')[0].value == '' ? $('#login_check>input:first').css("border-color","red") : $('#login_check>input:first').css("border-color","");

		$('#login_check>input:eq(1)')[0].value == '' ? $('#login_check>input:eq(1)').css("border-color","red") : $('#login_check>input:first').css("border-color","");

		$(this)
		.css({"border-color":"#999",color:"#000"})
		.next().css("color","transparent");
	})
	.blur(function(){
		var pattern = /^[\d]{4}$/;
		var bool = pattern.test($(this)[0].value);
		if(bool){
			$(this).css("border-color","#999");
		}else if($(this)[0].value == ''){
			$(this)
			.css({"border-color":"red"})
			.next().css("color","#999");
		}else{
			$(this)
			.css({"border-color":"red"})
		}
	});

	// 注册验证
	$('#sex a').eq(0).click(function(){
		if(!$(this).hasClass("check")){
			$(this).addClass("check");
		}if($(this).next().hasClass("check")){
			$(this).next().removeClass("check");
		}
		
	})
	.end()
	.eq(1).click(function(){
		if(!$(this).hasClass("check")){
			$(this).addClass("check");
		}if($(this).prev().hasClass("check")){
			$(this).prev().removeClass("check");
		}
	});

	// 注册表单验证
	
	$('#phnum')
	.bind('focus',function(){
		$(this)
		.attr("placeholder","")
		.css({"border-color":"rgb(153, 153, 153)","color":"#333"})
		.next().remove();
	})
	.bind('blur',function(){
		// 手机号码验证
		var pattern = /^(1([358][0-9]|(47)|[7][0178]))[0-9]{8}$/;

		var bool = pattern.test($(this)[0].value);

		if(bool){
			$(this).css({"border-color":"rgb(153, 153, 153)","color":"#333"});
		}else{
			var val = $(this).attr("value");   
			$(this).css({"border-color":"red","color":"red"})
			.after('<span style="color:red;">请输入11位有效中国手机号码！</span>');
		}
	})

	//邮箱验证
	$('#reg_email')
	.on('focus',function(){
		$(this)
		.attr("placeholder","")
		.css({"border-color":"rgb(153, 153, 153)","color":"#333"})
		.next().remove();
	})
	.on('blur',function(){
		var  pattern = /^[1-9a-zA-Z][0-9a-zA-Z]{4,}@([0-9a-zA-Z]{2,})\.(com|net|cn|org|COM)$/;

		var bool = pattern.test($(this)[0].value);

		if(bool){
			$(this).css({"border-color":"rgb(153, 153, 153)","color":"#333"});
		}else{
			var val = $(this).attr("value");   
			$(this).css({"border-color":"red","color":"red"})
			.after('<span style="color:red;">请输入有效的电子邮箱地址！</span>');
		}
	});

	// 密码验证
	var passVal = null;
	$('#pass1')
	.focus(function(){
		$(this)
		.attr("placeholder","")
		.css({"border-color":"rgb(153, 153, 153)","color":"#333"})
		.next().remove();
		$("#pass2").attr("value","");
	})
	.blur(function(){
		var pattern =/^.{6,12}$/;
		var bool = pattern.test($(this)[0].value);
		passVal = $(this).attr("value");
		if(bool){
			$(this).css({"border-color":"rgb(153, 153, 153)","color":"#333"});
		}else{
			$(this).css({"border-color":"red","color":"red"})
			.after('<span style="color:red;">密码为6-12位字符！</span>');
		}
	});

	$('#pass2')
	.focus(function(){
		$(this)
		.attr("placeholder","")
		.css({"border-color":"rgb(153, 153, 153)","color":"#333"})
		.next().remove();
	})
	.blur(function(){
		if(passVal != $(this).attr("value")){
			$(this).css({"border-color":"red","color":"red"})
			.after('<span style="color:red;">抱歉，两次输入的密码不匹配！！</span>');
		}else{
			$(this).css({"border-color":"rgb(153, 153, 153)","color":"#333"});
		}
	});

	$('#ul_idc input.idc')
	.eq(0)
	.focus(function(){
		$(this).eq(0)
		.attr("placeholder","")
		.css({"border-color":"rgb(153, 153, 153)","color":"#333"})
		.next().next().remove();
	})
	.blur(function(){
		
		if($(this).val() == "6135"){
			$(this).css({"border-color":"rgb(153, 153, 153)","color":"#333"});
		}else{
			$(this).css({"border-color":"red","color":"red"})
			.next()
			.after('<span style="color:red;">您填写的验证码有误，请重新输入！</span>');
		}
	});

	/*男的 女的 儿童 事件 开始*/
	$('#nav-choose>li.underline').mouseover(function(){

		//判断搜索框与登陆框高度是否为0
		if(parseInt($('header section.search').css("height")) == 0 && parseInt($('section.login').css("height")) == 0){ 
			// 判断是否存在#bg这个元素，长度不为0说明有这个元素
			if($( "#bg" ).length == 0){
				$('header').append('<div id="bg" style="width:100%;height:'+$(document).height()+'px;background-color:rgba(0,0,0,.8)"></div>');
			}
			

			$(this)
			.siblings()
			.children()
			.css({"text-decoration":"none"});
			

			$(this)
			.children()
			.css({"text-decoration":"underline"});
			 
			var index = $(this).attr("data-index");
			$('#myOption aside').css("display",'none');
			$('#myOption aside').eq(index)
			.css("display","block")
			.animate({"height":"261px"});
		}
	});

	$('#myOption aside').mouseleave(function(){
		
		if(parseInt($('header section.search').css("height")) == 0 && parseInt($('section.login').css("height")) == 0){

			$("#bg").remove();

			var index = $('#nav-choose>li.underline').attr("data-index");
				$('#myOption aside')
				.slideUp(500)
				.css("height","0px");
			$(this).children().css("text-decoration","underline");

			$('#nav-choose>li.underline')
			.siblings()
			.children()
			.css({"text-decoration":"none"});	
				
		}
	});

	$('nav').mouseover(function(){

		if(parseInt($('header section.search').css("height")) == 0 && parseInt($('section.login').css("height")) == 0){

			$("#bg").remove();

			var index = $('#nav-choose>li.underline').attr("data-index");
				$('#myOption aside')
				.slideUp(500)
				.css("height","0px");
			$(this).children().css("text-decoration","underline");

			$('#nav-choose>li.underline')
			.siblings()
			.children()
			.css({"text-decoration":"none"});	
				
		}
	});

	/*男的 女的 儿童 点击事件 结束*/

	/*区域二选项卡事件*/
	$('section.main-two>ul>li').bind('mouseover',function(){

		if(document.documentElement.clientWidth > 705){//判断是否处于手机的尺寸
			$(this).stop(true);
		$('#can').stop(true);

		var index = $(this).attr("data-index");

		switch(index){
			case '0':
			$('#can').animate({"left":"9%"},800);
			break;
			case '1':
			$('#can').animate({"left":"34%"},800);
			break;
			case '2':
			$('#can').animate({"left":"59%"},800);
			break;
			case '3':
			$('#can').animate({"left":"84%"},800);
			break;
			default:
			alert("error")

		}

			if($('section.main-two>aside').eq(index).css("display") == 'none'){
				$('section.main-two>aside')
					.css({"display":"none","opacity":"0"})
					.eq($(this).attr("data-index"))
					.css("display","block")
					.animate({"opacity":'1'},800,function(){
						$('section.main-two>ul>li').eq(index).attr("data-flag","stop")
					})
			}
		}
		
			
	});



	// 点击问号帮助按钮
		$('#help').bind('click',function(){
			window.location.href = "./help.html";
		});

	// 点击首页LOGO
	$('#index').on('click',function(){
		window.location.href = "./index.html";
	})
	

});//end
var myBool = true;

/**
 * [method 定义一个构造函数专门来存放方法的（提高性能）]
 * @param  {[type]} flag [传入一个标志数字,用来区分显示登陆(flag == 0)、注册(flag == 1)页面]
 * @return {[this]}      [通过构造函数实例化对象之后会默认返回当前对象（this）]
 * 
 * 在构造函数的原型中定义了方法
 * 1.显示登陆、注册框的方法
 * 2.隐藏登陆、注册框的方法
 * 3.显示搜索框的方法
 * 4.隐藏搜索框的方法
 * 5.是否显示当前对象的下划线的方法
 */
function method(flag){
	this.flag = flag;
}

/*在method原型中添加方法*/

//定义一个显示登陆、注册框的方法
method.prototype.showLogin = function(){

	var flag = this.flag;
	// console.log("hide:"+flag);
	//判断搜索框是否有显示
	if(parseInt($('header section.search').css("height")) > 0){
			method.prototype.hideSearch();
		}

    if(!$('section.login').is(":animated") && !$('section.login').children('div[class="login-div"]').is(":animated") && !$("#man").hasClass('man')){

	 	if($("#login-a").attr("data-index") == 0){//判断是否处于显示状态
	 		$('header').append('<div id="bg" style="width:100%;height:'+$(document).height()+'px;background-color:rgba(0,0,0,.8)"></div>');
	 	}

	 	//点击遮罩层

	 	$('#bg').click(function(){
	 		// console.log("click #bg")
	 		method.prototype.hideLogin();
	 	})
	 	
		$('section.login')
		.animate({height:"398px"},500,function(){

			if(flag == 0){
				// console.log("显示登陆")
				$(this).children('div[class="login-div"]')
				.animate({opacity:"1"},300,function(){
				$("#man").addClass("man");
			})
			}
			else if(flag == 1){
				// console.log("隐藏登陆")
				$('section.login')
			.children('div[class="login-div"]')
			.css("display","none")
			.end()
			.children('div[class="register"]').css("display","block")
			.animate({opacity:"1"},600,function(){
				$("#man").addClass("man");
			})
			}

	});



	$("#login-a").attr("data-index","1");

	}
	//点击注册按钮
	$('#dd_register')
	.bind('click',function(){
		//判断是否处于动画与高度是否为0
		if(!$('section.login').children('div[class="login-div"]').is(":animated") && parseInt($('section.login').css("height"))){
			$('section.login')
			.children('div[class="login-div"]')
			.animate({opacity:'0'},300,function(){
				$(this).css({display:"none"})
			})
			.end()
			.children('div[class="register"]').css("display","block")
			.animate({opacity:"1"},600);
		}
		
	});

	$('#register')
	.bind('click',function(){
		//判断是否处于动画与高度是否为0
		if(!$('section.login').children('div[class="login-div"]').is(":animated") && parseInt($('section.login').css("height"))){
			$('section.login')
			.children('div[class="login-div"]')
			.animate({opacity:'0'},300,function(){
				$(this).css({display:"none"})
			})
			.end()
			.children('div[class="register"]').css("display","block")
			.animate({opacity:"1"},600);
		}
		
	});

	//点击登陆按钮
	$('#login-a')
	.bind('click',function(){
		if(!$('section.login').children('div[class="register"]').is(":animated")){
			$('section.login')
			.children('div[class="register"]')
			.animate({opacity:'0'},300,function(){
				$(this).css({display:"none"})
			})
			.end()
			.children('div[class="login-div"]')
			.css({"display":"block","opacity":"0"})
			// .delay(300)
			.animate({opacity:"1"},600);
		
		}
	});
	
};

//定义一个隐藏登陆、注册框的方法
method.prototype.hideLogin = function(){
	var This = this;
	if(!$('section.login').is(":animated") && !$('section.login').children('div[class="login-div"]').is(":animated") && $("#man").hasClass('man')){
		This.flag = 0;
		// console.log("hide:"+This.flag);
		// console.log("remove bg")
		$("#bg").remove();
		$("#man").removeClass("man");
			$('section.login')
			.children('div[class="login-div"]')
			.animate({opacity:"0"},300,function(){
			$('section.login')
			.animate({height:"0px"},400,function(){
				if($('section.login').children('div[class="register"]').css("display") == "block"){
				$('section.login')
				.children('div[class="login-div"]')
				.css({display:"block",opacity:"0"})
				.end()
				.children('div[class="register"]')
				.css({display:"none",opacity:"0"});

		}
			});
		});
		$("#login-a").attr("data-index","0");
		

	 }
};


//定义一个显示搜索框的方法
method.prototype.showSearch = function(){

	//判断登陆框是否有显示
	if(parseInt($('section.login').css("height")) >= 0){
			method.prototype.hideLogin();
			$("#man").removeClass("man");
		}


	if(!$('header section.search').is(":animated")){
		
		$('#search').addClass('show');

		$('#search').attr("data-index","1");
		// console.log($("#search").attr("data-index"));
		$('header section.search')
		.animate({height:"80px"},200);

		//创建一个遮罩层
		$('header').append('<div id="bg" style="width:100%;height:'+$(document).height()+'px;background-color:rgba(0,0,0,.8);"></div>');

		// 点击遮罩层
		$('#bg').click(function(){
		
			method.prototype.hideSearch();
		});
	}
};

//定义一个隐藏搜索框的方法
method.prototype.hideSearch = function(){

	if(!$('header section.search').is(":animated")){

		$('#search').removeClass("show");

		$('#search').attr("data-index","0");


		// 移除遮罩层
		$("#bg").remove();
		$('header section.search')
		.animate({height:"0px"},300)
	}
}

//定义是否显示当前对象下划线的方法
method.prototype.showUnderline = function(){
	$(this).css("text-decoration") == "none" ? $(this).css("text-decoration","underline") : $(this).css("text-decoration","none");
}


// 滑轮滚动事件
window.onscroll = function(){

	//尝试执行代码，避免浏览器报错影响程序执行
	try{
		if(!myBool)
		new banner().clear();
		else
			myBool = false;		

	}catch(e){
		// console.log("error")
	}
	

	if($(document).scrollTop() >= (document.documentElement.clientHeight)*3){
		// $('#back_top').stop(true);
		if(!$('#back_top').is(":animated") && $('#back_top').css("display") == 'none'){
			// console.log("1");
			$('#back_top').css('display','block').animate({"width":"60px"},500);
		}
		
		
	}else if($(document).scrollTop() < (document.documentElement.clientHeight)*3 && $('#back_top').css("display") == 'block'){
		// $('#back_top').stop(true);

		if(!$('#back_top').is(":animated")){
			// console.log('2')
		$('#back_top').animate({"width":"0px"},380,function(){
			$(this).css("display",'none');
		});
	}
			
	}


	if($(document).scrollTop() >= 100){
		
		if(document.documentElement.clientWidth < 605){//判断是否处于手机的尺寸
		$('header').css("display",'none');
		}else{
			$('header').addClass('change');
			$('#search').addClass("change");
		}
	}
	else if($(document).scrollTop() == 0){
		if(document.documentElement.clientWidth < 605){//判断是否处于手机的尺寸
		$('header').css("display",'block');
		}else{
			$('header').removeClass('change');
			$('#search').removeClass("change");
		}
	}
	if(document.documentElement.clientWidth > 605){
		$('header').css("display",'block');
		
	}
	

	if($(document).scrollTop() >= (document.documentElement.clientHeight)*2){
		$('#goTop').css("display",'block');
	}else{
		$('#goTop').css("display",'none');
	}

	// console.log($(document).scrollTop());

	try{
		if($(document).scrollTop() >= 900 && $(document).scrollTop()<1700){
		// document.title = "yes";
		
			chMethod.autoLb($('#total div'),$('#two ol li'),$('#two ul li'));

	}else{
		// document.title = "no";
		clearInterval(chMethod.timer);
	}
}catch(e){

}
	

}