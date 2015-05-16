// JavaScript Document
$(function(){
	//set page
	var setPage = (function(){
		var _pageW = 800;
		var _pageH = 600;
		var _setPage = {};
		var _count;
		var _currentPage = 0;
		var _currentSubPage = 0;
		var _pageArr = [];
		var _isMotion = false;

		_setPage.init = function(){
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
			setPos();
			setControls();
		}
		
		function addEvent() {
			$(window).resize(function(e) {
				setPos();
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
				_isMotion = true;
				switch(__direction){
					case "right":
						if( _currentPage < (_count-1) ){
							$(_pageArr[_currentPage+1]).css({'display':'block','left':$(window).width()});
							//var _left = getCenterAlignPos( $(window).width(), _pageW );
							$(_pageArr[_currentPage+1]).animate({'left':0},1200,"easeInOutCubic");
							$(_pageArr[_currentPage]).animate({'left':-$(window).width()},1200,"easeInOutCubic",function(){
								$(this).hide();
								_currentPage=_currentPage+1;
								setPos();
								setControls();
								_currentSubPage = 0;
							});
						}
						break;
						
					case "left":
						if( _currentPage > 0 ){
							$(_pageArr[_currentPage-1]).css({'display':'block','left':-$(window).width()});
							//var _left = getCenterAlignPos( $(window).width(), _pageW );
							$(_pageArr[_currentPage-1]).animate({'left':0},1200,"easeInOutCubic");
							$(_pageArr[_currentPage]).animate({'left':$(window).width()},1200,"easeInOutCubic",function(){
								$(this).hide();
								_currentPage=_currentPage-1;
								setPos();
								setControls();
								_currentSubPage = 0;
							});
						}
						break;
						
					case "up":
						var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
						if( _subCount > 0 && _currentSubPage > 0 ){
							var _top = getCenterAlignPos( $(window).height(), _pageH );
							_currentSubPage--;
							//console.log(_currentSubPage);
							var _subTarget = (_top-$(window).height())*_currentSubPage;
							$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget},1200,"easeInOutCubic", function(){
									setControls();
							});
						}
						break;
						
					case "down":
						var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
						if( _subCount > 0 && _currentSubPage < (_subCount-1) ){
							var _top = getCenterAlignPos( $(window).height(), _pageH );
							_currentSubPage++;
							//console.log(_currentSubPage);
							var _subTarget = (_top-$(window).height())*_currentSubPage;
							$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget},1200,"easeInOutCubic", function(){
									setControls();
							});
						}
						break;
				}
			
			}
			
			
			
		}//updatePage
		
		function setPos() {
			var _top = getCenterAlignPos( $(window).height(), _pageH );
			_top = (_top<0)?0:_top;
			$('.page').css({'top':_top});
			
			//sub-page 위치
			var _subPadding = ( $(window).height() - _pageH )/2;
			//alert(_subPadding);
			$('.sub-page li').css({'margin-bottom':_subPadding});
			
			//sub top 보정
			var _subTarget = (_top-$(window).height())*_currentSubPage;
			$('.sub-page',_pageArr[_currentPage]).css({'top':_subTarget});
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
			
			var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
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
		

		_setPage.init();
		return _setPage;
	})();

	
});

function getCenterAlignPos( containerSize, targetSize ) {
  var pos = ( containerSize - targetSize ) / 2;
  return pos;
}


