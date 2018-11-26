$(function () {
    //更改基本font-size
    var _FONT_SIZE = (document.documentElement.clientWidth / 3.75);
    (document.childNodes[1]||document.children[0]).style.fontSize = _FONT_SIZE + "px";
    window.GlobalFastClick = FastClick.attach(document.body);

    $(window).on("resize",function () {
        var _FONT_SIZE = (document.documentElement.clientWidth / 3.75);
        (document.childNodes[1]||document.children[0]).style.fontSize = _FONT_SIZE + "px";
    })

    var mySwiper = new Swiper('.main-content',{
        direction : 'vertical',
    });
    var video = document.getElementById("video");
    var $_muiscBox = $("#musicBox");
    $_muiscBox.on("click",function () {
        var state = video.paused;
        if(state){
            video.play();
            $_muiscBox.removeClass("music-pause");
        }else{
            video.pause();
            $_muiscBox.addClass("music-pause");
        }

    });

});