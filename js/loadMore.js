function LOADMORE(loadbtn,lis,listcontainer,defaultPg){
	//loadMore
	var defaultPage = defaultPg;
	var loading = 0;
	var contentLi = [];
	var $loadMore = $(loadbtn);
	var $ulList= $(listcontainer)

	var $lis = $(lis);
	
	$('.sales_list').hide();
	
	

	if($lis.length > 10) {
		$loadMore.show()
	} else {
		$loadMore.hide()
	}

	$ulList.html("");
	for(var a = 0; a < defaultPage; a++) {
		$lis.eq(a).appendTo($ulList);
	}
	for(var b = defaultPage; b < $lis.length; b++) {
		contentLi.push($lis.eq(b))
	}

	$loadMore.click(function() {
//		console.log(111)
		var k = 0;
		var t = 0;
		var moreList = $(listcontainer + " div").length;
		for(var i = moreList - defaultPage; i < moreList - loading; i++) {

			if(i == contentLi.length) {
				$loadMore.html("没有更多了~");
				return;
			}

			contentLi[i].appendTo($ulList);
			t = moreList + k;
			k++;

		}
	})
}
