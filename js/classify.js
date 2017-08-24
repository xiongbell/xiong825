var $classifyTit = $(".classify_tit span");
var $classifyName = $(".classify_name");
var $classifyDefault = $(".classify_default");
var $classifyPrice = $(".classify_price");
var $blackBg = $(".black_bg");
var $classifyAll = $(".classify_all");
var $secondClassifyLi = $(".second_classify li");
var $thirdClassifyLi = $(".third_classify li");
var $thirdClassifyLi_i = $(".third_classify li i");
var $classifyDefault = $(".classify_default");
var $classifyPrice = $(".classify_price");
var $tit = $(".mui-title");

$classifyTit.click(function() {
	$(this).addClass("classify_tit_color").siblings().removeClass("classify_tit_color")

	if($classifyName.hasClass("classify_tit_color")){
		$classifyPrice.removeClass("classify_price_bg_up")
		$classifyPrice.removeClass("classify_price_bg_down")
		$classifyName.addClass('classify_name_default');
		
	}
	
	if($classifyDefault.hasClass("classify_tit_color")) {
		$classifyAll.slideUp(100);
		$blackBg.hide();
		$classifyPrice.removeClass("classify_price_bg_up")
		$classifyPrice.removeClass("classify_price_bg_down")
		$classifyName.addClass('classify_name_default');
		window.location.reload();
	}
	if($classifyPrice.hasClass("classify_tit_color")) {
		$classifyAll.slideUp(100);
		$blackBg.hide();
		$classifyPrice.addClass("classify_price_bg_up");
		$classifyName.addClass('classify_name_default');
		if($classifyPrice.hasClass("classify_price_bg_up")) {
			$classifyPrice.toggleClass("classify_price_bg_down");
			window.location.reload();

		}
	}
})

$classifyName.click(function() {
	if($(this).hasClass("classify_name_bg")) {
		$(this).removeClass("classify_name_bg");
		$classifyAll.slideUp(100);
		$blackBg.hide()
	} else {
		$(this).removeClass("classify_name_default")
		$(this).addClass("classify_name_bg")
		$classifyAll.slideDown(100);
		$blackBg.show()
	}
})
$secondClassifyLi.click(function() {

	var i = $(this).index() - 1;
	$(this).addClass("li_act").siblings().removeClass("li_act")
	$thirdClassifyLi.eq(i).show().siblings().hide();
	if($(this).index() === 0) {
		$classifyName.html($(this).eq(0).html())
		$classifyAll.slideUp(100);
		$classifyName.removeClass("classify_name_bg");
		$blackBg.hide();
	}
	var idxHtml = $secondClassifyLi.eq($(this).index()).html();

	$classifyName.html(idxHtml);
	$tit.html(idxHtml);
	window.location.reload();

})
$thirdClassifyLi_i.click(function() {
	idxHtmlContent = $(this).html();
	$classifyName.html(idxHtmlContent);
	$tit.html(idxHtmlContent);
	$classifyAll.slideUp(100);
	$classifyName.removeClass("classify_name_bg");
	$blackBg.hide();
	window.location.reload();
})
$blackBg.click(function() {
	$(this).hide();
	$classifyAll.hide();
	$classifyName.removeClass("classify_name_bg");
	window.location.reload();
})