function FingerCarousel(oId) {
	//得到大盒子
	this.carousel = document.querySelector("#" + oId);
	//所有lis
	this.lis = document.querySelectorAll("#" + oId + " ul li");

	//小圆点
	//			this.xiaoyuandians = document.querySelectorAll("#" + oId +" ol li");
	this.cur_num = document.querySelector(".cur_num");
	this.all_num = document.querySelector(".all_num").innerHTML = this.lis.length;
	//ul
	this.ul = document.querySelector("#" + oId + " ul");
	//loading
	this.loading = document.querySelector("#" + oId + " .loading");
	//所有图片
	this.images = document.querySelectorAll("#" + oId + " ul li img");

	//备份this
	var self = this;

	//等所有图片加载好之后，然后才显示
	for(var i = 0, sum = 0; i < this.images.length; i++) {
		this.images[i].onload = function() {
			sum++;
			if(sum == self.images.length) {
				self.ul.style.display = "block";

			}
		}
	}

	this.init();

	//绑定监听：
	this.carousel.addEventListener("touchstart", function(event) {
		self.touchstartHandler.call(self, event);
	}, false);
	this.carousel.addEventListener("touchmove", function(event) {
		self.touchmoveHandler.call(self, event);
	}, false);
	this.carousel.addEventListener("touchend", function(event) {
		self.touchendHandler.call(self, event);
	}, false);
}

//初始化
FingerCarousel.prototype.init = function() {
		//宽度
		this.w = parseFloat(getComputedStyle(this.carousel)["width"]);

		//信号量
		this.idx = 0;
		//下一张
		this.nextIdx = 1;
		//上一张
		this.prevIdx = this.lis.length - 1;

		//设置高度
		this.carousel.style.height = this.w * (960 / 960) + "px";

		//第0张图复原
		this.lis[0].style.transition = "none";
		this.lis[0].style.webkitTransform = "translate3d(0px,0,0)";
		//用px为单位，除0之外的所有li去猫腻位置
		for(var i = 1; i < this.lis.length; i++) {
			this.lis[i].style.transition = "none";
			this.lis[i].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		}
	}
	//触摸开始
FingerCarousel.prototype.touchstartHandler = function(event) {
		//阻止默认事件
		event.preventDefault();
		//记录时间，这一时刻的时间戳
		this.startTime = new Date();
		//这根手指
		var finger = event.touches[0];
		//触摸开始的位置
		this.startX = finger.clientX;
		//去掉所有li的过渡
		this.lis[this.idx].style.webkitTransition = "none";
		this.lis[this.prevIdx].style.webkitTransition = "none";
		this.lis[this.nextIdx].style.webkitTransition = "none";
		//就位
		this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";

	}
	//触摸移动
FingerCarousel.prototype.touchmoveHandler = function(event) {
		//阻止默认事件
		event.preventDefault();
		//手指
		var finger = event.touches[0];
		//移动的距离
		this.dx = finger.clientX - this.startX;
		//一共有3张图片要跟着手指实时的移动
		this.lis[this.idx].style.webkitTransform = "translate3d(" + (0 + this.dx) + "px,0,0)";
		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + (this.w + this.dx) + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + (-this.w + this.dx) + "px,0,0)";

	}
	//触摸结束
FingerCarousel.prototype.touchendHandler = function(event) {
	//阻止默认事件
	event.preventDefault();
	//看看这次用户抬手和上一次抬手的时间间隔
	var endDuaring = new Date() - this.endTime;
	//给这一次松手加上时间
	this.endTime = new Date();
	//看一下用户花了多少时间触摸
	var touchDuaring = this.endTime - this.startTime;

	//用户两次抬手的时间小于了300毫秒，说明上一次的动画还没有完成，此时不宜再来一个动画，变成干蹦。
	if(endDuaring < 300) {
		var transitionString = "none";
	} else {
		var transitionString = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
	}

	//判断此时是否滑动完成，用过渡来实现动画
	if((this.dx >= this.w / 2) || (this.dx > 10 && touchDuaring < 200)) {
		//向右滑动成功
//		console.log(this.idx)

		this.lis[this.idx].style.webkitTransition = transitionString;
		this.lis[this.idx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransition = transitionString;
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
//		this.cur_num.innerHTML = this.nextIdx-1;
		
		//信号量的改变
		this.nextIdx = this.idx;
		this.idx = this.prevIdx;
		this.prevIdx--;
		this.cur_num.innerHTML = this.idx+1;
		if(this.prevIdx < 0) {
			this.prevIdx = this.lis.length - 1;
		}
	} else if((this.dx <= -this.w / 2) || (this.dx < -10 && touchDuaring < 200)) {
		//向左滑动成功
//		console.log(this.idx)

		
		this.lis[this.idx].style.webkitTransition = transitionString;
		this.lis[this.idx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
		this.lis[this.nextIdx].style.webkitTransition = transitionString;
		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
//		this.cur_num.innerHTML = this.nextIdx+1;
		//信号量的改变
		this.prevIdx = this.idx;
		
		this.idx = this.nextIdx;
//				console.log(this.idx)
						
		this.nextIdx++;
		this.cur_num.innerHTML = this.nextIdx;
		if(this.nextIdx > this.lis.length - 1) {
			this.nextIdx = 0;
		}
	} else {
		//没有成功，弹回来

		
		this.lis[this.idx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
		this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
		this.lis[this.nextIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
	}
}