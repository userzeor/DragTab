(function (window,document) {
	var dragTab = document.querySelector('.dragTab');
	dragTab.style.height = document.documentElement.clientHeight+'px';
	var dragTab_content = document.querySelector('.dragTab_content');
	var header_title = document.querySelectorAll('.header_title');
	var dragTab_header = document.querySelector('.dragTab_header');
	var dragTab_iscroll = document.querySelector('.dragTab_iscroll');
	var dragTab_header_scroll = document.querySelector('.dragTab_header_scroll');
	var header_scrollWidth = header_title.length*dragTab_header.clientWidth/5;
	var beyond_width = header_scrollWidth - dragTab_header.clientWidth;
	dragTab_content.style.height = document.documentElement.clientHeight -48 +'px';
	dragTab_header_scroll.style.transform = 'translate3d(0px,0px,0px)';
	var dragTab_wrapGroup = document.querySelector('.dragTab_wrapGroup');
	var dragTab_wrap = document.querySelectorAll('.dragTab_wrap');
	//console.log(beyond_width);
	
	setContentMove();
	
	//..........content初始化
	dragTab_wrapGroup.style.width = dragTab_header.clientWidth*dragTab_wrap.length+'px';
	for (var j=0;j<dragTab_wrap.length;j++) {
		dragTab_wrap[j].style.width = dragTab_header.clientWidth+'px';
		dragTab_wrap[j].style.left = j*dragTab_header.clientWidth+'px';
	}
	//..........end
	
	//..........头部左右可拖动
	var startX = null;
	var moveX = null;
	var endX = null;
	var finger_moveX = null;
	var StransX = null;
	var dqX = 0;
	var zjX = 0;
	var iscroll = 0;
	dragTab_header_scroll.addEventListener('touchstart',function (e) {
		startX = e.touches[0].pageX; // 手指位置
		StransX = 0;
		dqX = get3dX();
	});
	dragTab_header_scroll.addEventListener('touchmove',function (e) {
        e.preventDefault();// 防止拖动页面
		moveX = e.touches[0].pageX;
		if (header_title.length>5) {
			setTouchMove(moveX);
			setIscrollX(moveX);
		}
	});
	dragTab_header_scroll.addEventListener('touchend',function (e) {
		endX = e.changedTouches[0].pageX;
		dqX = zjX;
	});
	//..........end
	
	//..........头部自动宽度和底部条动画
	if (header_title.length>5) {
		dragTab_header_scroll.style.width = header_scrollWidth + 'px';
		dragTab_iscroll.style.width = dragTab_header.clientWidth/5 + 'px';
		dragTab_iscroll.style.transform = 'translate3d(0px,0px,0px)';
		//console.log(header_scrollWidth)
	} else{
		dragTab_iscroll.style.width = 100/header_title.length + '%';
	}
	for (var i=0;i<header_title.length;i++) {
		header_title[i].setAttribute('index',i);
		if (header_title.length>5) {
		    header_title[i].style.width = dragTab_header.clientWidth/5 + 'px';
		    header_title[i].addEventListener('click',function () {
		    	exceedFiveTab(this);
		    });
	    }else{
	    	header_title[i].style.width = 100/header_title.length + '%';
	    	header_title[i].addEventListener('click',function () {
	    		underFiveTab(this);
	    	});
	    }
	}
	//..........end
	function underFiveTab(that) {
		var indexElm = that.getAttribute('index');
		var title_offsetleft = that.offsetLeft;
		var contentOffset = indexElm*dragTab_header.clientWidth;
		dragTab_iscroll.style.transform = 'translate3d('+ title_offsetleft +'px,0px,0px)';
		dragTab_iscroll.style.transitionDuration = '500ms';
		dragTab_wrapGroup.style.transform = 'translate3d(-'+ contentOffset +'px,0px,0px)';
		dragTab_wrapGroup.style.transitionDuration = '500ms';
		for (var i=0;i<header_title.length;i++) {
			header_title[i].classList.remove('title_active');
			that.classList.add('title_active');
		}
	}
	function exceedFiveTab(that) {
		var indexElm = that.getAttribute('index');
		var title_dqX = get3dX();
		var contentOffset = indexElm*dragTab_header.clientWidth;
		var title_offsetleft = indexElm*dragTab_iscroll.clientWidth+title_dqX;
		iscroll = indexElm*dragTab_iscroll.clientWidth;
		dragTab_iscroll.style.transform = 'translate3d('+ title_offsetleft +'px,0px,0px)';
		dragTab_iscroll.style.transitionDuration = '500ms';
		dragTab_wrapGroup.style.transform = 'translate3d(-'+ contentOffset +'px,0px,0px)';
		dragTab_wrapGroup.style.transitionDuration = '500ms';
		for (var i=0;i<header_title.length;i++) {
			header_title[i].classList.remove('title_active');
			that.classList.add('title_active');
		}
	}
	
	function get3dX() {
		var transZRegex = /\.*translate3d\((.*)px\)/i;
		var trans = dragTab_header_scroll.style.transform;
		var transArr = transZRegex.exec(trans)[1];
		var transNum = transArr.split(',')[0].indexOf('p');
		var transX = parseInt(transArr.split(',')[0].substring(0,transNum));
		return transX;
	}
	function getIscroll3dX() {
		var transZRegex = /\.*translate3d\((.*)px\)/i;
		var trans = dragTab_iscroll.style.transform;
		var transArr = transZRegex.exec(trans)[1];
		var transNum = transArr.split(',')[0].indexOf('p');
		var IscrollX = parseInt(transArr.split(',')[0].substring(0,transNum));
		return IscrollX;
	}
	
	function getIscroll3dY(el) {
		var transZRegex = /\.*translate3d\((.*)px\)/i;
		var trans = el.style.transform;
		var transArr = transZRegex.exec(trans)[1];
		var transNum = transArr.split(',')[1].indexOf('p');
		var IscrollX = parseInt(transArr.split(',')[1].substring(0,transNum));
		//console.log(IscrollX);
		return IscrollX;
	}
	
	function setTouchMove(moveX) {
		finger_moveX = moveX-startX;
		StransX = finger_moveX;
			if (finger_moveX>=0) {
				zjX = StransX + dqX;
				if (zjX>=0) {
					zjX = 0;
				}
				dragTab_header_scroll.style.transform = 'translate3d('+(zjX)+'px,0px,0px)';
			}
			if (finger_moveX<=0) {
				zjX = StransX + dqX;
				if (Math.abs(zjX)>=beyond_width) {
					zjX = -beyond_width;
				}
				dragTab_header_scroll.style.transform = 'translate3d('+(zjX)+'px,0px,0px)';
			}
	}
	
	function setIscrollX(moveX) {
		finger_moveX = moveX-startX;
		StransX = finger_moveX;
			if (finger_moveX>=0) {
				zjX = StransX + dqX;
				if (zjX>=0) {
					zjX = 0;
				}
				dragTab_iscroll.style.transform = 'translate3d('+(iscroll+zjX)+'px,0px,0px)';
				dragTab_iscroll.style.transitionDuration = '';
			}
			if (finger_moveX<=0) {
				zjX = StransX + dqX;
				if (Math.abs(zjX)>=beyond_width) {
					zjX = -beyond_width;
				}
				dragTab_iscroll.style.transform = 'translate3d('+(iscroll+zjX)+'px,0px,0px)';
				dragTab_iscroll.style.transitionDuration = '';
			}
	}
	function setContentMove() {
		var gunY = 0;
		var startY = 0;
		var moveY = 0;
		var fingerY = 0;
		var currentY = 0;
		for (var j=0;j<dragTab_wrap.length;j++) {
			if (dragTab_wrap[j].clientHeight>dragTab_content.clientHeight) {
				var overHeight = dragTab_wrap[j].clientHeight - dragTab_content.clientHeight;
				dragTab_wrap[j].style.transform = 'translate3d(0px,0px,0px)';
				dragTab_wrap[j].addEventListener('touchstart',function (e) {
				     startY = e.touches[0].pageY;
				     currentY = getIscroll3dY(this);
				     gunY = 0;
				     this.stimeStamp = e.timeStamp
				     //console.log(e);
			    });
			    dragTab_wrap[j].addEventListener('touchmove',function (e) {
				     moveY = e.touches[0].pageY;
				     fingerY = moveY - startY;
				     if (fingerY>=0) {
				     	gunY = currentY + fingerY;
				     	if (gunY>=0) {
				     		gunY = 0;
				     	}
				     	this.style.transform = 'translate3d(0px,'+ gunY +'px,0px)';
				     	this.style.transitionDuration = '0ms';
				     	this.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
				     }
				     if (fingerY<=0) {
				     	gunY = fingerY + currentY;
				     	if (Math.abs(gunY)>=overHeight) {
							gunY = -overHeight;
						}
				     	this.style.transform = 'translate3d(0px,'+ gunY +'px,0px)';
				     	this.style.transitionDuration = '0ms';
				     	this.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
				     }
				     //console.log(e.timeStamp-this.stimeStamp);
			    });
			    dragTab_wrap[j].addEventListener('touchend',function (e) {
				     currentY = gunY;
				     this.etimeStamp = e.timeStamp;
				     this.speed = (fingerY / (this.etimeStamp - this.stimeStamp)).toFixed(2);
//				     if(this.speed>=0.8&&this.speed<=1.4){
//				     	this.style.transitionDuration = '200ms';
//				     }
//				     if(this.speed>1.4&&this.speed<=2.2){
//				     	this.style.transitionDuration = '350ms';
//				     }
//				     if(this.speed>2.2){
//				     	this.style.transitionDuration = '500ms';
//				     }
				     console.log(this.speed);
			    });
			}
		}
	}
})(window,document);
