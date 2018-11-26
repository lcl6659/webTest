function marquee(B, E) {
    var C = document.getElementById("marquee" + B);
    var A = document.getElementById("marquee" + B + "_1");
    var F = document.getElementById("marquee" + B + "_2");
    if (E == "up") {
        if (F.offsetTop - C.scrollTop <= 0) {
            C.scrollTop -= (A.offsetHeight + 20)
        } else {
            var D = C.scrollTop;
            C.scrollTop++;
            if (C.scrollTop == D) {
                C.scrollTop = 1
            }
        }
    } else {
        if (F.offsetWidth - C.scrollLeft <= 0) {
            C.scrollLeft -= A.offsetWidth
        } else {
            C.scrollLeft++
        }
    }
}
function marqueeStart(B, E) {
    var C = document.getElementById("marquee" + B);
    var A = document.getElementById("marquee" + B + "_1");
    var F = document.getElementById("marquee" + B + "_2");
    F.innerHTML = A.innerHTML;
    var D = window.setInterval("marquee(" + B + ", '" + E + "')", 20);
    C.onmouseover = function () {
        window.clearInterval(D)
    };
    C.onmouseout = function () {
        D = window.setInterval("marquee(" + B + ", '" + E + "')", 20)
    }
}
function searchSubmit() {
    var A = document.searchForm;
    if (A.search.value == "") {
        A.search.focus();
        return
    }
    A.submit()
}
var navCurrentId = "";
function showMenu(C) {
    var B = document.getElementById("menu" + C);
    B.style.visibility = "visible";
    var A = document.getElementById("menuA" + C);
    if (A.className == "current") {
        navCurrentId = A.id
    } else {
        A.className = "current"
    }
}
function hiddMenu(C) {
    var B = document.getElementById("menu" + C);
    B.style.visibility = "hidden";
    var A = document.getElementById("menuA" + C);
    if (A.id != navCurrentId) {
        A.className = ""
    }
}
function languageOver() {
    var A = document.getElementById("lbox");
    A.style.display = "block"
}
function languageOut(B) {
    var A = document.getElementById("lbox");
    A.style.display = "none"
}
var commonjspath = (function (B, A, C) {
    for (A in B) {
        if (B[A].src && B[A].src.indexOf("/common.js") !== -1) {
            C = B[A];
            break
        }
    }
    C = C || B[B.length - 1];
    return C.src
}(document.getElementsByTagName("script")));
var rightButton = commonjspath.split("rightButton=")[1];
if (rightButton && rightButton == "1") {
    document.oncontextmenu = function (A) {
        return false
    };
    document.onselectstart = function (A) {
        return false
    };
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        document.writeln("<style>body {-moz-user-select: none;}</style>")
    }
}
function setFontSize(A) {
    var B = document.getElementById("info_content");
    if (B) {
        B.style.fontSize = A + "px"
    }
}
function bannerShow(C, B, A, E, F) {
    if (C == "3D") {
        var G = "&xml=/banner?defaultBannerId=" + F;
        document.write('<div style="width:' + B + 'px;margin:0 auto;">');
        document.write('<object id="banner" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + B + '" height="' + A + '" align="left" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="FlashVars" value="flashVars=' + G + '" /> <param name="movie" value="banner/banner' + C + '.swf" /> <param name="quality" value="high" /> <param name="play" value="true" /> <param name="loop" value="true" /> <param name="scale" value="noscale" /> <param name="wmode" value="transparent" /> <param name="devicefont" value="false" /> <param name="bgcolor" value="' + E + '" /> <param name="menu" value="true" /> <param name="allowFullScreen" value="false" /> <param name="allowScriptAccess" value="sameDomain" /> <param name="salign" value="lt" /> <embed name="banner" FlashVars="flashVars=' + G + '" width="' + B + '" height="' + A + '" src="banner/banner' + C + '.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" align="left" play="true" loop="true" scale="noscale" wmode="transparent" devicefont="false" bgcolor="' + E + '" menu="true" allowFullScreen="false" allowScriptAccess="sameDomain" salign="lt" type="application/x-shockwave-flash" > </embed> </object>');
        document.write("</div>")
    } else {
        if (C == 5) {
            var D = $.ajax({
                url: "/banner?mode=js&defaultBannerId=" + F,
                async: false
            }).responseText;
            document.write(D)
        } else {
            if (C == 6) {
                var D = $.ajax({
                    url: "/banner?mode=jsMobile&defaultBannerId=" + F,
                    async: false
                }).responseText;
                document.write(D)
            } else {
                if (C == 7) {
                    var D = $.ajax({
                        url: "/banner?mode=jsbanner&defaultBannerId=" + F,
                        async: false
                    }).responseText;
                    document.write(D)
                } else {
                    var G = "&xml=/banner?defaultBannerId=" + F;
                    document.write('<div style="width:' + B + 'px;margin:0 auto;">');
                    document.write('<object id="banner" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + B + '" height="' + A + '" align="left" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="FlashVars" value="flashVars=' + G + '" /> <param name="movie" value="banner/banner' + C + '.swf" /> <param name="quality" value="high" /> <param name="play" value="true" /> <param name="loop" value="true" /> <param name="scale" value="noscale" /> <param name="wmode" value="transparent" /> <param name="devicefont" value="false" />  <param name="menu" value="true" /> <param name="allowFullScreen" value="false" /> <param name="allowScriptAccess" value="sameDomain" /> <param name="salign" value="lt" /> <embed name="banner" FlashVars="flashVars=' + G + '" width="' + B + '" height="' + A + '" src="banner/banner' + C + '.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" align="left" play="true" loop="true" scale="noscale" wmode="transparent" devicefont="false" menu="true" allowFullScreen="false" allowScriptAccess="sameDomain" salign="lt" type="application/x-shockwave-flash" > </embed> </object>');
                    document.write("</div>")
                }
            }
        }
    }
}
function setHome(A, C) {
    try {
        A.style.behavior = "url(#default#homepage)";
        A.setHomePage(C)
    } catch (D) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (D) {
                alert(T("不支持设为主页"));
                return
            }
            var B = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            B.setCharPref("browser.startup.homepage", C)
        }
    }
}
function addFavorite(A, C) {
    try {
        window.external.addFavorite(A, C)
    } catch (B) {
        try {
            window.sidebar.addPanel(C, A, "")
        } catch (B) {
            alert(T("不支持收藏"))
        }
    }
}
$(window).scroll(function () {
    if ($(window).scrollTop() > 120) {
        $("#pageTop").fadeIn()
    } else {
        $("#pageTop").fadeOut()
    }
});
$(document).ready(function () {
    $(".pageTop ").on("click",
    function (A) {
        A.preventDefault();
        $("body,html").animate({
            scrollTop: 0
        },
        300)
    })
});