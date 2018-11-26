var hammertime; //创建一个新的hammer对象
var questionHammer;

//图片放大缩小移动参数存储对象
var imgZoomParm = {
	imgWidth: 0,
	imgWidthChange: 0,
	firstPinch: 1,
	imgTop: 0,
	imgLeft: 0,
	bigState: 0, //放大状态 0没放大  ，1放大
	panState: 0, //图片滑动状态
	panStateTimeOut: null, //修改记录图片滑动状态的句柄
	dbClickTimeOut: null,
	dbState: 0,
	windowScrollTop:0,
	deltaYScrll:0
}

$(function(){
	//图片双击
	$("#questionBox").on("click", "img", function(e) {

		imgZoomParm.dbState = 1;
		if(imgZoomParm.dbClickTimeOut && imgZoomParm.dbState === 1) {
			clearTimeout(imgZoomParm.dbClickTimeOut);
			imgZoomParm.dbClickTimeOut = null;
			imgZoomParm.dbState = 0;

			imgPinchPanFunc.setImgWrapheight();
			if(imgZoomParm.bigState == 0) {
				imgZoomParm.bigState = 1;
				var imgWrapOffsetTop = $("#questionBox .img-wrap").offset().top;
				var imgWrapOffsetLeft = $("#questionBox .img-wrap").offset().left;
				var clickPostionTop = e.pageY - imgWrapOffsetTop; //点击位置相对img-wrap
				var clickPostionLeft = e.pageX - imgWrapOffsetLeft;

				imgPinchPanFunc.swipeAnimate($("#questionBox .img-wrap img"), {
					"width": imgZoomParm.imgWidth * 2,
					'top': -(clickPostionTop) + "px",
					'left': -(clickPostionLeft) + "px"
				}, function() {
					imgZoomParm.imgWidthChange = $("#questionBox .img-wrap img").width();
					imgPinchPanFunc.imgAnimateChangePosition($("#questionBox .img-wrap img"), $("#questionBox .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#questionBox .img-wrap img"));
					});
				});
			} else {
				imgZoomParm.bigState = 0;
				imgPinchPanFunc.swipeAnimate($("#questionBox .img-wrap img"), {
					"width": imgZoomParm.imgWidth,
					'top': "0px",
					'left': "0px"
				}, function() {
					imgZoomParm.imgWidthChange = $("#questionBox .img-wrap img").width();
					imgPinchPanFunc.imgAnimateChangePosition($("#questionBox .img-wrap img"), $("#questionBox .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#questionBox .img-wrap img"));
					});
				});
			}
		}
		imgZoomParm.dbClickTimeOut = setTimeout(function() {
			clearTimeout(imgZoomParm.dbClickTimeOut);
			imgZoomParm.dbClickTimeOut = null;
			imgZoomParm.dbState = 0;
		}, 300);

	});
});



/*图片放大缩小方法库*/
(function() {
	//初始化图片外框及图片属性
	function setImgWrapheight() {
		if(imgZoomParm.firstPinch == 1) {
			imgZoomParm.firstPinch = 0;
			var height = $("#questionBox .img-wrap img").height();
			$("#questionBox .img-wrap").css("height", height + "px!important");
			$("#questionBox .img-wrap img").css("position", "absolute");
		}
	}

	//图片位置调整动画
	function swipeAnimate($_element, animateP, cb) {
		$_element.animate(animateP, 100, function() {
			cb && cb();
		});
	}

	function setImgPosition($_elememt) {
		imgZoomParm.imgTop = $_elememt.position().top;
		imgZoomParm.imgLeft = $_elememt.position().left;
	}

	//图片位置自动调整
	function imgAnimateChangePosition($_img, $_img_wrap, cb) {
		var imgWrapHeight = $_img_wrap.height();
		var imgHeight = $_img.height();
		var topNow = $_img.position().top;
		var leftNow = $_img.position().left;
		var bottomNow = -topNow + imgWrapHeight - imgHeight;
		var rightNow = -leftNow + imgZoomParm.imgWidth - imgZoomParm.imgWidthChange;
		var swipeToLeft = 0,
			swipeToTop = 0;
		var changePositionState = 0;

		//设置自动调整的top和left
		if(imgZoomParm.imgWidth >= imgZoomParm.imgWidthChange) {
			changePositionState = 1;
			//图片缩小了
			swipeToLeft = (imgZoomParm.imgWidth - imgZoomParm.imgWidthChange) / 2;
			swipeToTop = (imgWrapHeight - imgHeight) / 2;
		} else {
			//图片放大了
			if(topNow > 0 && leftNow > 0) {
				changePositionState = 1;
				swipeToTop = 0;
				swipeToLeft = 0;
			} else if(topNow > 0 && leftNow < 0 && rightNow < 0) {
				changePositionState = 1;
				swipeToTop = 0;
				swipeToLeft = "";
			} else if(topNow > 0 && leftNow < 0 && rightNow > 0) {
				var newleftP = imgZoomParm.imgWidthChange - imgZoomParm.imgWidth;
				changePositionState = 1;
				swipeToTop = 0;
				swipeToLeft = -newleftP;
			} else if(topNow < 0 && bottomNow < 0 && rightNow > 0) {
				var newleftP = imgZoomParm.imgWidthChange - imgZoomParm.imgWidth;
				changePositionState = 1;
				swipeToTop = "";
				swipeToLeft = -newleftP;
			} else if(bottomNow > 0 && rightNow > 0) {
				var newleftP = imgZoomParm.imgWidthChange - imgZoomParm.imgWidth;
				var newTop = imgHeight - imgWrapHeight;
				changePositionState = 1;
				swipeToTop = -newTop;
				swipeToLeft = -newleftP;
			} else if(bottomNow > 0 && rightNow < 0 && leftNow < 0) {
				var newTop = imgHeight - imgWrapHeight;
				changePositionState = 1;
				swipeToTop = -newTop;
				swipeToLeft = "";
			} else if(bottomNow > 0 && leftNow > 0) {
				var newTop = imgHeight - imgWrapHeight;
				changePositionState = 1;
				swipeToTop = -newTop;
				swipeToLeft = 0;
			} else if(topNow < 0 && leftNow > 0 && bottomNow < 0) {
				changePositionState = 1;
				swipeToTop = "";
				swipeToLeft = 0;
			}
		}

		if(changePositionState == 1) {
			var animateP = {};
			if(swipeToTop || swipeToTop === 0) {
				animateP.top = swipeToTop + "px"
			}
			if(swipeToLeft || swipeToLeft === 0) {
				animateP.left = swipeToLeft + "px"
			}
			swipeAnimate($_img, animateP, function() {
				cb && cb();
			});
		} else {
			cb && cb();
		}

	}

	//添加事件监听
	function addHammerEvent() {

		//初始化参数
		imgZoomParm = {
			imgWidth: $("#questionBox .img-wrap img").width(),
			imgWidthChange: $("#questionBox .img-wrap img").width(),
			firstPinch: 1,
			imgTop: 0,
			imgLeft: 0,
			bigState: 0, //放大状态 0没放大  ，1放大
			panState: 0, //图片滑动状态
			panStateTimeOut: null, //修改记录图片滑动状态的句柄
			dbClickTimeOut: null,
			dbState: 0
		}

		if(hammertime) {
			hammertime.destroy();
			hammertime = null;
		}

		//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
		hammertime = new Hammer($("#questionBox .img-wrap img")[0]);
		//为该dom元素指定触屏移动事件
		//hammertime.add(new Hammer.Pinch());
		hammertime.get('pinch').set({ enable: true });
		hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		//添加事件
		hammertime.on("pinchstart", function(e) {
			imgPinchPanFunc.setImgWrapheight();
		});

		hammertime.on("pinchin", function(e) {
			var $_img = $("#questionBox .img-wrap img");
			if($_img.width() > imgZoomParm.imgWidth) {
				$_img.width(imgZoomParm.imgWidthChange * e.scale);
				var centerX = e.center.x;
				var centerY = e.center.y;
				$_img.css('top', imgZoomParm.imgTop + e.center.y * (1 - e.scale) + "px");
				$_img.css('left', imgZoomParm.imgLeft + e.center.x * (1 - e.scale) + "px");
			}
		});

		hammertime.on("pinchout", function(e) {
			var $_img = $("#questionBox .img-wrap img");
			imgZoomParm.bigState = 1;
			if($_img.width() < (imgZoomParm.imgWidth * 3)) {
				$_img.width(imgZoomParm.imgWidthChange * e.scale);
				var centerX = e.center.x;
				var centerY = e.center.y;
				$_img.css('top', imgZoomParm.imgTop - e.center.y * (e.scale - 1) + "px");
				$_img.css('left', imgZoomParm.imgLeft - e.center.x * (e.scale - 1) + "px");
			}
		});

		hammertime.on("pinchend", function(e) {
			var $_img = $("#questionBox .img-wrap img");
			if($_img.width() < imgZoomParm.imgWidth) {
				imgZoomParm.bigState = 0;
				imgPinchPanFunc.swipeAnimate($("#questionBox .img-wrap img"), {
					"width": imgZoomParm.imgWidth,
					'top': "0px",
					'left': "0px"
				}, function() {
					imgZoomParm.imgWidthChange = $_img.width();

					//如果图片宽度小于初始化宽度，图片居中显示
					imgPinchPanFunc.imgAnimateChangePosition($("#questionBox .img-wrap img"), $("#questionBox .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#questionBox .img-wrap img"));
					});
				});
			} else {
				imgZoomParm.imgWidthChange = $_img.width();

				//如果图片宽度小于初始化宽度，图片居中显示
				imgPinchPanFunc.imgAnimateChangePosition($("#questionBox .img-wrap img"), $("#questionBox .img-wrap"), function() {
					imgPinchPanFunc.setImgPosition($("#questionBox .img-wrap img"));
				});
			}
		});

		
		//图片滑动
		hammertime.on("pan", function(e) {

			var $_img_wrap = $("#questionBox .img-wrap");
			var $_img = $("#questionBox .img-wrap img");

			imgZoomParm.panState = 1;
			imgPinchPanFunc.setImgWrapheight();
			var deltaX = e.deltaX;
			var deltaY = e.deltaY;
			
			var imgWrapHeight = $_img_wrap.height();
			var imgHeight = $_img.height();
			var topNow = $_img.position().top;
			var bottomNow = -topNow + imgWrapHeight - imgHeight;
			
			/*console.log("bottomNow:"+bottomNow);
			console.log("topNow:"+topNow);*/
			if(bottomNow==0 || topNow==0){
				imgZoomParm.deltaYScrll = deltaY;
			}
			
			if(bottomNow >= -2) {
				if(imgZoomParm.bigState==1){
					$(window).scrollTop(imgZoomParm.windowScrollTop- deltaY+imgZoomParm.deltaYScrll);
				}else{
					$(window).scrollTop(imgZoomParm.windowScrollTop- deltaY);
				}
			}
			
			if(topNow >= -2) {
				if(imgZoomParm.bigState==1){
					$(window).scrollTop(imgZoomParm.windowScrollTop- deltaY+imgZoomParm.deltaYScrll);
				}else{
					$(window).scrollTop(imgZoomParm.windowScrollTop- deltaY);
				}
				
			}
			
			if(imgZoomParm.bigState==1 && topNow < 2 && bottomNow<2){
				$_img.css('top', imgZoomParm.imgTop + deltaY + "px");
			}
			
			if(imgZoomParm.bigState==1){
				$_img.css('left', imgZoomParm.imgLeft + deltaX + "px");
			}
			clearTimeout(imgZoomParm.panStateTimeOut);
		});
		
		//图片滑动
		hammertime.on("panend", function(e) {
			imgZoomParm.windowScrollTop = $(window).scrollTop();
			
			//位置调整
			imgPinchPanFunc.imgAnimateChangePosition($("#questionBox .img-wrap img"), $("#questionBox .img-wrap"), function() {
				imgPinchPanFunc.setImgPosition($("#questionBox .img-wrap img"));
			});

			imgZoomParm.panStateTimeOut = setTimeout(function() {
				imgZoomParm.panState = 0;
			}, 500);

		});
		

		$("#questionBox").find('img')[0].addEventListener("touchmove", function(e) {
			e.preventDefault();
		});
	}

	function addQuestionHammerEvent() {

		if(questionHammer) {
			questionHammer.destroy();
			questionHammer = null;
		}
		
		questionHammer = new Hammer($("#questionBox .one-question")[0]);
		
		//左滑
		questionHammer.on("panleft", function(e) {
			var deltaX = e.deltaX;
			var deltaY = e.deltaY;
			if(imgZoomParm.panState == 1) {
				//console.log("图片左滑动");
			} else {
				//var opacity = 1-(-deltaX/$("#questionBox").width());
				if(Math.abs(deltaX)>Math.abs(deltaY)){
					$("#questionBox .one-question").css({"left":deltaX});
				}
			}
		});
		
		//右滑
		questionHammer.on("panright", function(e) {
			
			var deltaX = e.deltaX;
			var deltaY = e.deltaY;
			
			if(imgZoomParm.panState == 1) {
				//console.log("图片右滑动:");
			} else {
				//var opacity = 1-(deltaX/$("#questionBox").width());
				if(Math.abs(deltaX)>Math.abs(deltaY)){
					$("#questionBox .one-question").css({"left":deltaX});
				}
			}
		});
		
		//题目滑动结束
		questionHammer.on("panend", function(e) {
			if(imgZoomParm.panState==0){
				var deltaX = e.deltaX;
				var deltaY = e.deltaY;
				if(Math.abs(deltaX)>Math.abs(deltaY)){
					var velocityX = e.velocityX;//x轴上移动速度
					var questionBoxWidth = $("#questionBox").width();
					if(Math.abs(velocityX)>0.5 || Math.abs(deltaX)>170){
						if(deltaX>0){
							//跳转上一题
							if(quesIndex>1){
								paperFunc.prevQuestion("left");
							}else{
								swipeAnimate($("#questionBox .one-question"),{"left":0,"opacity":1});
							}
						}else{
							//跳转下一题
							if(quesIndex < quesListCount) {
								paperFunc.nextQuestion("right");
							}else{
								swipeAnimate($("#questionBox .one-question"),{"left":0,"opacity":1});
							}
						}
					}else{
						swipeAnimate($("#questionBox .one-question"),{"left":0,"opacity":1});
					}
				}else{
					swipeAnimate($("#questionBox .one-question"),{"left":0,"opacity":1});
				}
			}
		});
	}

	
	
	window.imgPinchPanFunc = {
		setImgWrapheight: setImgWrapheight,
		swipeAnimate: swipeAnimate,
		setImgPosition: setImgPosition,
		imgAnimateChangePosition: imgAnimateChangePosition,
		addHammerEvent: addHammerEvent,
		addQuestionHammerEvent: addQuestionHammerEvent
	}

})();