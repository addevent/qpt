// JavaScript Document
$(function(){
	//set page
	var Qpt = (function(){
		var _pageW;
		var _pageH;
		var _speed = 800;
		var _easing = "easeOutQuad";
		var _Qpt = {};
		var _count;
		var _currentPage = 0;
		var _currentSubPage = 0;
		var _pageArr = [];
		var _subPageArr = [];
		var _isMotion = false;
		var _fragmentArr = [];
		var _fragmentCount = 0;
		var _fragmentNum = 0;
		var _hasFragment = false;
		
		var wrapSlides;
		var isMobileDevice;
		var slidePage;
		
		var config = {

			// The "normal" size of the presentation, aspect ratio will be preserved
			// when the presentation is scaled to fit different resolutions
			width: 960,
			height: 700,

			// Factor of the display size that should remain empty around the content
			//margin: 0.1,
			margin: 0,

			// Bounds for smallest/largest possible scale to apply to content
			minScale: 0.2,
			maxScale: 1.5,
		}

		_Qpt.init = function(){
			//_pageW = $(window).width();
			//_pageH = 600;
			
			_pageW = config.width;
			_pageH = config.height;
			
			wrapSlides = document.querySelector( '#wrap-contents .wrap-slides' );
			slidePage = document.querySelector( '#wrap-contents .page' );
			isMobileDevice = navigator.userAgent.match( /(iphone|ipod|ipad|android)/gi );
			
			
			$('.page').each(function(index, element) {
                _pageArr.push(this);
				//console.log(index);
				if(index>0){
					$(this).hide();
				}
            });
			_count = _pageArr.length;
			//alert(_count);
			setLayout();
			addEvent();
		}
		
		function setLayout() {
			//setPos();
			setPage();
			//setControls();
			layout();
		}
		
		function addEvent() {
			$(window).resize(function(e) {
				//setPos();
				layout();
            });
			
			//키보드 이벤트
			//애니메이션 주고 끝나면 다시 포지션 잡아주기
			
			$(document).keydown(function(event) {
				if (event.keyCode == '37') {
					//alert('좌측 화살키를 누르셨습니다.');
					updatePage("left");
				}else if (event.keyCode == '39' || event.keyCode == '32') {
					//alert('우측 화살키를 누르셨습니다.');
					updatePage("right");
				}else if (event.keyCode == '38') {
					//위 화살표
					updatePage("up");
				}else if (event.keyCode == '40') {
					//아래 화살표
					updatePage("down");
				}

				//alert(event.keyCode);
			});
			
			$('#controls .navigate-right').bind("click", function() {updatePage("right")} );
			$('#controls .navigate-left').bind("click", function() {updatePage("left")} );
			$('#controls .navigate-up').bind("click", function() {updatePage("up")} );
			$('#controls .navigate-down').bind("click", function() {updatePage("down")} );
		}
		
		function updatePage(__direction){
			if(!_isMotion){
				switch(__direction){
					case "right":
						if( !_hasFragment ) {
							//resetPage();
							if( _currentPage < _count-1 ){
								_isMotion = true;
								$(_pageArr[_currentPage+1]).css({'display':'block','left':_pageW});
								//var _left = getCenterAlignPos( $(window).width(), _pageW );
								$(_pageArr[_currentPage+1]).animate({'left':0},_speed);
								$(_pageArr[_currentPage]).animate({'left':-_pageW},_speed,function(){
									$(this).hide();
									_currentPage=_currentPage+1;
									//setPos();
									
									$('.sub-page').css({'top':0});
									_currentSubPage = 0;
									
									resetPage();
									
									setPage();
								});
							}
						}else{
							setPage();
						}
						break;
						
					case "left":
						if( !_hasFragment ) {
							if( _currentPage > 0 ){
								//resetPage();
								_isMotion = true;
								$(_pageArr[_currentPage-1]).css({'display':'block','left':-_pageW});
								//var _left = getCenterAlignPos( $(window).width(), _pageW );
								$(_pageArr[_currentPage-1]).animate({'left':0},_speed);
								$(_pageArr[_currentPage]).animate({'left':_pageW},_speed,function(){
									$(this).hide();
									_currentPage=_currentPage-1;
									//setPos();
									
									$('.sub-page').css({'top':0});
									_currentSubPage = 0;
									
									resetPage();
									
									setPage();
								});
							}
						}else{
							setPage();
						}
						break;
						
					case "up":
						if( !_hasFragment ) {
							
							var _subCount = $('.sub-page>li',_pageArr[_currentPage]).length;
							if( _subCount > 0 && _currentSubPage > 0 ){
								_isMotion = true;
								//var _top = getCenterAlignPos( $(window).height(), _pageH );
								_currentSubPage--;
								//console.log(_currentSubPage);
								//var _subTarget = (_top-$(window).height())*_currentSubPage;
								var _subTarget = -(_pageH)*_currentSubPage;
								$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget},_speed, function(){
										resetPage();
										setPage();
								});
							}
						}else{
							setPage();
						}
						break;
						
					case "down":
						if( !_hasFragment ) {
							//resetPage();
							var _subCount = $('.sub-page>li',_pageArr[_currentPage]).length;
							//alert(_currentSubPage);
							if( _subCount > 0 && _currentSubPage < (_subCount-1) ){
								_isMotion = true;
								//var _top = getCenterAlignPos( $(window).height(), _pageH );
								_currentSubPage++;
								//console.log(_currentSubPage);
								//var _subTarget = (_top-$(window).height())*_currentSubPage;
								var _subTarget = -(_pageH)*_currentSubPage;
								$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget},_speed, function(){
										resetPage();
										setPage();
								});
							}
						}else{
							setPage();
						}
						break;
				}
			
			}
			
			
			
		}//updatePage
		
		function setPage() {
			//_fragmentArr 확인하기
			//var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
			//if( _subCount > 0 ){
			// 1. fragment 가 있는지 확인
			// 2. fragment 가 진행중인지 확인
			//var _fragmentCount = $('.sub-page li',_pageArr[_currentPage]).length;
			
			var _subCount = $('.sub-page>li',_pageArr[_currentPage]).length;
			if( _subCount > 0 ){
				$('.sub-page li',_pageArr[_currentPage]).each(function(index, element) {
					_subPageArr.push(this);
				});
				_fragmentCount = $('.fragment',_subPageArr[_currentSubPage]).length;
				if(_fragmentCount>0) {
					$('.fragment',_subPageArr[_currentSubPage]).each(function(index, element) {
						_fragmentArr.push(this);
					});
				}else{
					_fragmentArr = [];
				}
			}else{
				_subPageArr = [];
				_fragmentCount = $('.fragment',_pageArr[_currentPage]).length;
				if(_fragmentCount>0) {
					$('.fragment',_pageArr[_currentSubPage]).each(function(index, element) {
						_fragmentArr.push(this);
					});
				}else{
					_fragmentArr = [];
				}
			}
			//alert(_fragmentCount);
			
			if( _fragmentCount>0 && _fragmentNum==0 ) {
				// fragment가 있으며 처음인 페이지
				_hasFragment = true;
				_fragmentNum = 1;
			}else if( _fragmentNum==_fragmentCount ) {
				// fragment가 있으며 마지막 페이지
				$(_fragmentArr[_fragmentNum-1]).show();
				_hasFragment = false;
			}else if(_fragmentNum>0){
				// fragment가 있으며 진행중인 페이지
				_hasFragment = true;
				$(_fragmentArr[_fragmentNum-1]).show();
				_fragmentNum++;
			}
			
			setControls();
		}
		
		function resetPage() {
			_fragmentArr = [];
			_fragmentCount = 0;
			_fragmentNum = 0;
			$('.fragment').hide();
		}

		function setControls() {
			
			//페이지에 따른 화살표 버튼 활성화 필요
			if( _currentPage == 0){
				$('#controls .navigate-left').removeClass('enabled');
				$('#controls .navigate-right').addClass('enabled');
			}
			if( _currentPage > 0 ){
				$('#controls .navigate-left').addClass('enabled');
			}
			if( _currentPage < (_count-1) ){
				$('#controls .navigate-right').addClass('enabled');
			}
			if( _currentPage == (_count-1) ){
				$('#controls .navigate-right').removeClass('enabled');
				$('#controls .navigate-left').addClass('enabled');
			}
			
			var _subCount = $('.sub-page>li',_pageArr[_currentPage]).length;
			//alert(_subCount);
			if( _subCount > 0 ){
				if( _currentSubPage == 0 ){
					$('#controls .navigate-up').removeClass('enabled');
					$('#controls .navigate-down').addClass('enabled');
				}else if( _currentSubPage == _subCount-1 ){
					$('#controls .navigate-up').addClass('enabled');
					$('#controls .navigate-down').removeClass('enabled');
				}else{
					$('#controls .navigate-up').addClass('enabled');
					$('#controls .navigate-down').addClass('enabled');
				}
			}else{
				$('#controls .navigate-up').removeClass('enabled');
				$('#controls .navigate-down').removeClass('enabled');
			}
			
			_isMotion = false;
		}
		
		
		//---------------------
		
		
		
		function layout() {
			var size = getComputedSlideSize();
			var slidePadding = 20;

			wrapSlides.style.width = size.width + 'px';
			wrapSlides.style.height = size.height + 'px';

			scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );

			scale = Math.max( scale, config.minScale );
			scale = Math.min( scale, config.maxScale );

			if( scale === 1 ) {
				wrapSlides.style.zoom = '';
				
				wrapSlides.style.left = '';
				//wrapSlides.style.top = '';
				//wrapSlides.style.bottom = '';
				//wrapSlides.style.right = '';
			}
			else {
				/*
				// Prefer zooming in desktop Chrome so that content remains crisp
				if( !isMobileDevice && /chrome/i.test( navigator.userAgent ) && typeof wrapSlides.style.zoom !== 'undefined' ) {
					wrapSlides.style.zoom = scale;
					wrapSlides.style.left = getCenterAlignPos($(window).width(), size.width*scale)+'px';
				}
				// Apply scale transform as a fallback
				else {
					//wrapSlides.style.left = 'auto';
					//wrapSlides.style.top = 'auto';
					//wrapSlides.style.bottom = 'auto';
					//wrapSlides.style.right = 'auto';
					
					wrapSlides.style.left = getCenterAlignPos($(window).width(), size.width*scale)+'px';

					wrapSlides.style.zoom = scale;
				}
				*/
				wrapSlides.style.left = getCenterAlignPos($(window).width(), size.width*scale)+'px';
				wrapSlides.style.zoom = scale;
				
			}
		}// end of layout
		
		function getComputedSlideSize( presentationWidth, presentationHeight ) {
			var size = {
				// Slide size
				width: config.width,
				height: config.height,
	
				// Presentation size
				//presentationWidth: presentationWidth || wrapSlides.offsetWidth,
				//presentationHeight: presentationHeight || wrapSlides.offsetHeight
				presentationWidth: presentationWidth || $(window).width(),
				presentationHeight: presentationHeight || $(window).height()
			};
	
			// Reduce available space by margin
			size.presentationWidth -= ( size.presentationHeight * config.margin );
			size.presentationHeight -= ( size.presentationHeight * config.margin );
			
			//console.log($(window).width());
			// Slide width may be a percentage of available width
			if( typeof size.width === 'string' && /%$/.test( size.width ) ) {
				size.width = parseInt( size.width, 10 ) / 100 * size.presentationWidth;
			}
	
			// Slide height may be a percentage of available height
			if( typeof size.height === 'string' && /%$/.test( size.height ) ) {
				size.height = parseInt( size.height, 10 ) / 100 * size.presentationHeight;
			}
			return size;
		}

		//-------------------------------------------------------
		_Qpt.init();
		return _Qpt;
	})();

	
});

function getCenterAlignPos( containerSize, targetSize ) {
  var pos = ( containerSize - targetSize ) / 2;
  return pos;
}


