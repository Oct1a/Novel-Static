
// 使用搭建的JSON代理 
const URLPROXY = "http://jsonp.dllca.cn/?url=";

// 给网址编码
const encode = function(url){
	return encodeURIComponent(url)
}

/* 鼠标移动显示菜单列表 */
$('#show-allMenu').mouseover(function(){
	$('.menu-list').css('display','block');
})
$('.menu-list').mouseout(function(){
	$(this).css('display','none');
})
$('.menu-list').mouseover(function(){
	$(this).css('display','block');
})

/* 登录框事件 */
function login(event){
	this.id = $(event).attr('id')
	if(this.id === 'login'){
		$('.login').css('display','block')
		$('.login-box input[type="submit"]').attr('value','登录')
		$('.tips p')[0].childNodes[0].nodeValue = '登录即代表同意';
	}else{
		// 注册事件
		$('.login').css('display','block')
		$('.login-box input[type="submit"]').attr('value','注册');
		$('.tips p')[0].childNodes[0].nodeValue = '注册即代表同意';
		// $('.tips p').text($('.tips p').text().replace("登录","注册"))
	}
}

// 屏蔽搜索框默认回车事件
$(document).on("keypress", ".search-wrap form", function(event) { 
    return event.keyCode != 13;
});
// 回车绑定搜索按钮
function search() {
  if(event.keyCode==13) {
    $('#search-btn').click()
  }
}

// 关闭登录框 
$('.close').click(function(){
	$('.login').css('display','none');
})

// 登录框
$('#login_btn').click(function(event){
	event.preventDefault();
	var username = $('#username').val();
	var password = $('#userpwd').val();
	var btn = event.currentTarget.value;
	if (username!= "" && password !="") {
		var reg = /^[A-z]\w{5,8}/g
		if(!reg.test(password)){
			alert("密码必须以字母开头,长度6-8位！")
			return;
		}
		alert(btn+"成功！");
		$('.login').css('display','none');
		$('.user-message,.user-avatar').css('display','block');
		$('.user-wrap p').css('display','none');
	}else{
		alert("用户名或密码不许为空！")
	}
})

// 分类ID与名称 (全部分类)
$.get(`${URLPROXY}http://admin.iqingtun.com/web/bookroom/bookcategory`,(data)=>{
		$.each(data.data,(i,value)=>{
			if (i >= 8 ) {return false;}
			$('.header-nav .menu-list ul').append(`
					<li><a href="./bookAll.html?class_id=${value.id}">${value.title}</a></li>
				`)
		})
		// 完本页面的分类获取，暂不弄分类功能
		if($('.books-classify').length != 0){
			$.each(data.data,(i,value)=>{
				$('.books-classify .tags').eq(0).append(`
						<span id=${value.id} class=${i==0 ? "active":''}>${value.title}</span>
					`)
			})
		}
})

/**
 * 获取URL参数
 	参考 https://blog.csdn.net/suyu_happy/article/details/78643005
 */
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) return decodeURI(r[2]); return null; //返回参数值
}

// 蒙版显示隐藏
function setMask(state="block"){
	$('.mask').css('display',state);
}

// 点击搜索按钮
$('#search-btn').click(function(){
	window.open("./bookAll.html?search="+$('#search-input').val(),"_self")
})

// 更改主样式颜色
// $(":root").css('--main-color','pink')