$(function() {
	/*图片懒加载*/
	$(".intro-info-img").scrollLoading();
	$(".b-pic").scrollLoading();

	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 5000, //可选选项，自动滑动
		pagination: '.swiper-pagination',
		paginationClickable: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		autoplayDisableOnInteraction : false,
		loop: true
	});

	//增加导航固定模式，使导航跟随滚动条滚动
	jQuery(window).scroll(function() {
		var sTop = jQuery(document).scrollTop();
		if(sTop >= 42) {
			$("#topNav").addClass("nav_fixed");
			$(".HOT-KEYS").addClass("HOT-KEYS-ADD");
		} else {
			$("#topNav").removeClass("nav_fixed");
			$(".HOT-KEYS").removeClass("HOT-KEYS-ADD");
		}
	});
	
	
	$("#lianxiwomen").on("click",".dt",function(){
		$("#lianxiwomen").hide();
	});
	
	//设置顶部日期
	setDate();

});


function setDate(){
	var newDate = new Date();
	var fullYear = newDate.getFullYear();
	var month = newDate.getMonth();
	var day = newDate.getDate();
	var arr = ["日","一","二","三","四","五","六"];
	var ss = arr[newDate.getDay()];
	$("p.wel").text("今天是"+fullYear+"年"+month+"月"+day+"日 星期"+ss+"，欢迎光临本站 ");
}
