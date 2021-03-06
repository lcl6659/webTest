$(function() {
	var E = $.url().attr("path");
	var F = $("[data-mvcpager=true]");
	var C = F.data("pageparameter"),
		B = F.data("urlformat");
	var A = $.url(B);
	B = A.attr("query") ? $.format("{0}?{1}", E, A.attr("query")) : E;
	F.attr("data-urlformat", B);
	F.find("a:not(.disabled)").each(function() {
		var G = $.url($(this).attr("href")).attr("query") ? $.format("{0}?{1}", E, $.url($(this).attr("href")).attr("query")) : E;
		$(this).attr("href", G)
	});
	var D = function(H) {
		H = H || 1;
		if (H <= 1) {
			var G = new RegExp($.format("[?&]{0}=__{0}__", C), "i");
			B = B.replace(G, "")
		} else {
			var G = new RegExp($.format("__{0}__", C), "i");
			B = B.replace(G, H)
		}
		document.location.href = B
	};
	F.find("[data-pageindexbox=true][data-autosubmit=true]").on("change", function() {
		D(this.value)
	});
	F.find("[data-submitbutton=true]").on("click", function() {
		var G = $("select[data-pageindexbox=true] option:selected").val();
		D(G)
	})
});