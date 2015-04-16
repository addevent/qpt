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
            });
			_count = _pageArr.length;
			//alert(_count);
			_setPage.setLayout();
			_setPage.addEvent();
		}
		
		_setPage.setLayout = function(){
			_setPage.setPos();
		}
		
		_setPage.addEvent = function(){
			$(window).resize(function(e) {
				_setPage.setPos();
            });
			
			//키보드 이벤트
			//애니메이션 주고 끝나면 다시 포지션 잡아주기
			
			$(document).keydown(function(event) {
				//alert("_isMotion : "+_isMotion);
				if( !_isMotion ){
					
					if (event.keyCode == '37') {
						//alert('좌측 화살키를 누르셨습니다.');
						if( _currentPage > 0 ){
							_isMotion = true;
							$(_pageArr[_currentPage-1]).css({'left':-_pageW});
							var _left = getCenterAlignPos( $(window).width(), _pageW );
							$(_pageArr[_currentPage-1]).animate({'left':_left});
							$(_pageArr[_currentPage]).animate({'left':$(window).width()},function(){
								_currentPage=_currentPage-1;
								_setPage.setPos();
								_isMotion = false;
								_currentSubPage = 0;
							});
						}
					}else if (event.keyCode == '39' || event.keyCode == '32') {
						//alert('우측 화살키를 누르셨습니다.');
						if( _currentPage < (_count-1) ){
							_isMotion = true;
							$(_pageArr[_currentPage+1]).css({'left':$(window).width()});
							var _left = getCenterAlignPos( $(window).width(), _pageW );
							$(_pageArr[_currentPage+1]).animate({'left':_left});
							$(_pageArr[_currentPage]).animate({'left':-_pageW},function(){
								_currentPage=_currentPage+1;
								_setPage.setPos();
								_isMotion = false;
								_currentSubPage = 0;
							});
						}
					}else if (event.keyCode == '38') {
						//위 화살표
						var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
						if( _subCount > 0 && _currentSubPage > 0 ){
							var _top = getCenterAlignPos( $(window).height(), _pageH );
							_currentSubPage--;
							console.log(_currentSubPage);
							var _subTarget = (_top-$(window).height())*_currentSubPage;
							$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget});
						}
					}else if (event.keyCode == '40') {
						//아래 화살표
						var _subCount = $('.sub-page li',_pageArr[_currentPage]).length;
						if( _subCount > 0 && _currentSubPage < (_subCount-1) ){
							var _top = getCenterAlignPos( $(window).height(), _pageH );
							_currentSubPage++;
							console.log(_currentSubPage);
							var _subTarget = (_top-$(window).height())*_currentSubPage;
							$('.sub-page',_pageArr[_currentPage]).animate({'top':_subTarget});
						}
					}
				}//if isMotion
				//alert(event.keyCode);
			});
			
		}
		
		_setPage.setPos = function(){
			var _top = getCenterAlignPos( $(window).height(), _pageH );
			$('.page').css({'top':_top});
			
			for( var i in _pageArr ){
				//현재 페이지 중앙정렬 
				if( i == _currentPage ){
					var _left = getCenterAlignPos( $(window).width(), _pageW );
					//alert(_top);
					$(_pageArr[i]).css({'left':_left});
				}else{
					$(_pageArr[i]).css({'left':-_pageW});
				}
			}
			
			//sub-page 위치
			var _subPadding = ( $(window).height() - _pageH )/2;
			//alert(_subPadding);
			$('.sub-page li').css({'margin-bottom':_subPadding});
			
			//sub top 보정
			var _subTarget = (_top-$(window).height())*_currentSubPage;
			$('.sub-page',_pageArr[_currentPage]).css({'top':_subTarget});
		}
		

		_setPage.init();
		return _setPage;
	})();

	
});

function getCenterAlignPos( containerSize, targetSize ) {
  var pos = ( containerSize - targetSize ) / 2;
  return pos;
}


