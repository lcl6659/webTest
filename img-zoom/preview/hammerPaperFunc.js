var hammertime; //创建一个新的hammer对象
var questionHammer;

//图片放大缩小移动参数存储对象
var imgZoomParm = {
	
}


/*图片放大缩小方法库*/
;(function() {
	//初始化图片外框及图片属性
	function setImgWrapheight() {
		/*if(imgZoomParm.firstPinch == 1) {
			imgZoomParm.firstPinch = 0;
			var height = $("#myImgPreview .img-wrap img").height();
			//$("#questionBox .img-wrap").css("height", height + "px!important");
			$("#myImgPreview .img-wrap img").css("position", "absolute");
		}*/
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
		var imgWrapWidth = $_img_wrap.width();
		var imgHeight = $_img.height();
		var imgWidth = $_img.width();
		var topNow = $_img.position().top;
		var leftNow = $_img.position().left;
		var bottomNow = -topNow + imgWrapHeight - imgHeight;
		var rightNow = -leftNow + imgWrapWidth - imgZoomParm.imgWidthChange;
		var swipeToLeft = 0,
			swipeToTop = 0;
		var changePositionState = 0;

		//设置自动调整的top和left
		if(imgZoomParm.imgWidth >= imgZoomParm.imgWidthChange) {
			changePositionState = 1;
			//图片缩小了
			swipeToLeft = imgZoomParm.imgBeginLeft;
			swipeToTop = imgZoomParm.imgBeginTop;
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
				var newleftP = imgZoomParm.imgWidthChange - imgWrapWidth;
				changePositionState = 1;
				swipeToTop = 0;
				swipeToLeft = -newleftP;
			} else if(topNow < 0 && bottomNow < 0 && rightNow > 0) {
				var newleftP = imgZoomParm.imgWidthChange - imgWrapWidth;
				changePositionState = 1;
				swipeToTop = "";
				swipeToLeft = -newleftP;
			} else if(bottomNow > 0 && rightNow > 0) {
				var newleftP = imgZoomParm.imgWidthChange - imgWrapWidth;
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
			
			if(imgHeight<imgWrapHeight){
				swipeToTop = (imgWrapHeight-imgHeight)/2;
			}
			
			if(imgWidth<imgWrapWidth){
				swipeToLeft = (imgWrapWidth-imgWidth)/2;
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
			imgWidth: $("#myImgPreview .img-wrap img").width(),//图片初始化宽度
			imgHeight: $("#myImgPreview .img-wrap img").height(),//图片初始化高度
			imgBeginTop:$("#myImgPreview .img-wrap img").position().top,//图片初始化top
			imgBeginLeft:$("#myImgPreview .img-wrap img").position().left,//图片初始化left
			imgWidthChange: $("#myImgPreview .img-wrap img").width(),//图片改变的宽度
			imgHeightChange: $("#myImgPreview .img-wrap img").height(),//图片改变后高度
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
		hammertime = new Hammer($("#myImgPreview .img-wrap img")[0]);
		//为该dom元素指定触屏移动事件
		hammertime.add(new Hammer.Pinch());
		hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		
		//图片双击
		hammertime.on("doubletap", function(e) {
			console.log("e.center.x:"+e.center.x);
			console.log("e.center.y:"+e.center.y);
			$("#msg").text(e.center.x);
			imgZoomParm.dbState = 1;
			imgZoomParm.dbClickTimeOut = setTimeout(function() {
				clearTimeout(imgZoomParm.dbClickTimeOut);
				imgZoomParm.dbState = 0;
			}, 300);
			
			/*imgPinchPanFunc.setImgWrapheight();*/
			if(imgZoomParm.bigState == 0) {
				imgZoomParm.bigState = 1;
				var clickPostionTop = imgZoomParm.imgBeginTop-(e.center.y-imgZoomParm.imgBeginTop); //点击位置相对img-wrap
				var clickPostionLeft = imgZoomParm.imgBeginTop-(e.center.x-imgZoomParm.imgBeginLeft);

				imgPinchPanFunc.swipeAnimate($("#myImgPreview .img-wrap img"), {
					"width": imgZoomParm.imgWidth * 2,
					"height":imgZoomParm.imgHeight*2,
					'top': clickPostionTop + "px",
					'left': clickPostionLeft + "px"
				}, function() {
					imgZoomParm.imgWidthChange = $("#myImgPreview .img-wrap img").width();
					imgZoomParm.imgHeightChange = $("#myImgPreview .img-wrap img").height();
					imgPinchPanFunc.imgAnimateChangePosition($("#myImgPreview .img-wrap img"), $("#myImgPreview .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#myImgPreview .img-wrap img"));
					});
				});
			} else {
				imgZoomParm.bigState = 0;
				imgPinchPanFunc.swipeAnimate($("#myImgPreview .img-wrap img"), {
					"width": imgZoomParm.imgWidth,
					"height":imgZoomParm.imgHeight,
					'top': imgZoomParm.imgBeginTop+"px",
					'left': imgZoomParm.imgBeginLeft+"px"
				}, function() {
					imgZoomParm.imgWidthChange = $("#myImgPreview .img-wrap img").width();
					imgZoomParm.imgHeightChange = $("#myImgPreview .img-wrap img").height();
					imgPinchPanFunc.imgAnimateChangePosition($("#myImgPreview .img-wrap img"), $("#myImgPreview .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#myImgPreview .img-wrap img"));
					});
				});
			}
			
		});
		
		//点击图片
		hammertime.on("tap",function(){
			setTimeout(function(){
				if(imgZoomParm.dbState==0){
					$("#myImgPreview").css("display","none");
				}
			},300);
		});
		
		//添加事件
		/*hammertime.on("pinchstart", function(e) {
			imgPinchPanFunc.setImgWrapheight();
		});*/
		
		//缩小
		hammertime.on("pinchin", function(e) {
			var $_img = $("#myImgPreview .img-wrap img");
			if($_img.width() > imgZoomParm.imgWidth) {
				$_img.width(imgZoomParm.imgWidthChange * e.scale);
				$_img.height(imgZoomParm.imgHeightChange * e.scale);
				var centerX = e.center.x;
				var centerY = e.center.y;
				var newTop = imgZoomParm.imgTop+(e.center.y-imgZoomParm.imgTop)* (1 - e.scale) ;
				var newLeft = imgZoomParm.imgLeft+(e.center.x-imgZoomParm.imgLeft)*(1 - e.scale);
				$_img.css('top', newTop + "px");
				$_img.css('left', newLeft + "px");
			}
		});

		//放大
		hammertime.on("pinchout", function(e) {
			
			var $_img = $("#myImgPreview .img-wrap img");
			
			if($_img.width() < (imgZoomParm.imgWidth * 3)) {
				$_img.width(imgZoomParm.imgWidthChange * e.scale);
				$_img.height(imgZoomParm.imgHeightChange * e.scale);
				var centerX = e.center.x;
				var centerY = e.center.y;
				var newTop = imgZoomParm.imgTop-(e.center.y-imgZoomParm.imgTop)* (e.scale - 1) ;
				var newLeft = imgZoomParm.imgLeft-(e.center.x-imgZoomParm.imgLeft)*(e.scale - 1);
				/*$_img.css('top', imgZoomParm.imgTop - e.center.y * (e.scale - 1) + "px");
				$_img.css('left', imgZoomParm.imgLeft - e.center.x * (e.scale - 1) + "px");*/
				$_img.css('top', newTop+ "px");
				$_img.css('left', newLeft+ "px");
			}
		});

		hammertime.on("pinchend", function(e) {
			var $_img = $("#myImgPreview .img-wrap img");
			if($_img.width() <= imgZoomParm.imgWidth) {
				imgZoomParm.bigState = 0;
				imgPinchPanFunc.swipeAnimate($("#myImgPreview .img-wrap img"), {
					"width": imgZoomParm.imgWidth,
					"height":imgZoomParm.imgHeight,
					'top': imgZoomParm.imgBeginTop+"px",
					'left': imgZoomParm.imgBeginLeft+"px"
				}, function() {
					imgZoomParm.imgWidthChange = $_img.width();
					imgZoomParm.imgHeightChange = $_img.height();
					//如果图片宽度小于初始化宽度，图片居中显示
					imgPinchPanFunc.imgAnimateChangePosition($("#myImgPreview .img-wrap img"), $("#myImgPreview .img-wrap"), function() {
						imgPinchPanFunc.setImgPosition($("#myImgPreview .img-wrap img"));
					});
				});
			} else {
				imgZoomParm.bigState = 1;
				imgZoomParm.imgWidthChange = $_img.width();
				imgZoomParm.imgHeightChange = $_img.height();
				//如果图片宽度小于初始化宽度，图片居中显示
				imgPinchPanFunc.imgAnimateChangePosition($("#myImgPreview .img-wrap img"), $("#myImgPreview .img-wrap"), function() {
					imgPinchPanFunc.setImgPosition($("#myImgPreview .img-wrap img"));
				});
			}
		});

		
		//图片滑动
		hammertime.on("pan", function(e) {
			$("#msg").text(imgZoomParm.imgWidthChange);
			var $_img_wrap = $("#myImgPreview .img-wrap");
			var $_img = $("#myImgPreview .img-wrap img");

			//imgZoomParm.panState = 1;
			/*imgPinchPanFunc.setImgWrapheight();*/
			var deltaX = e.deltaX;
			var deltaY = e.deltaY;
			
			var imgWrapHeight = $_img_wrap.height();
			var imgHeight = $_img.height();
			var topNow = $_img.position().top;
			var bottomNow = -topNow + imgWrapHeight - imgHeight;
			
			
			$_img.css('top', imgZoomParm.imgTop + deltaY + "px");
			$_img.css('left', imgZoomParm.imgLeft + deltaX + "px");
			clearTimeout(imgZoomParm.panStateTimeOut);
		});
		
		//图片滑动
		hammertime.on("panend", function(e) {
			//位置调整
			imgPinchPanFunc.imgAnimateChangePosition($("#myImgPreview .img-wrap img"), $("#myImgPreview .img-wrap"), function() {
				imgPinchPanFunc.setImgPosition($("#myImgPreview .img-wrap img"));
			});
			/*imgZoomParm.panStateTimeOut = setTimeout(function() {
				imgZoomParm.panState = 0;
			}, 500);*/
		});
		
		$("#myImgPreview").find('img')[0].addEventListener("touchmove", function(e) {
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