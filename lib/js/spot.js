/*************************************************************************************************
*	@CreateDate          : 2014.11.28
*	@ModifyDate          : 2014.11.28
*	@FileName            : spot.js
*	@Author              : inspot_jin
*************************************************************************************************/

$(function(){
	$.fn.spotSlider = function(options){
		var $this = this;
		var controlBtn, pager, pagerItem, pagerBtn, imgItem, imgGroup;
		
		var len, btnNum;
		var currentNum = 0;
		
		var timerID;
		
		// 나중에 가변형으로 하기 위해서 윈도우 리사이즈 이벤트에서 값을 수시로 바꿔주자. 아니면 퍼센트로.. ??
		var imgW;
		
		var targetPos;
		
		var isMotion=false;
		var isAuto=false;
		
		var autoTime = 5000;
		
		// ========================== 생성자
		var init = function(){
			setLayout();
			addEvent();
			
			controlBtn.click();
		}
		// ========================== 세팅
		var setLayout = function(){
			controlBtn = $('.control>a',$this);
			pager = $('.pager',$this);
			pagerItem = $('>ul>li',pager);
			imgGroup = $('>ul',$this);
			imgItem = $('>ul>li',$this);
			pagerBtn = $('>ul>li>a',pager);
			
			len = $(">ul>li",$this).length;
			//console.log("len="+len);
			
			imgW = $this.width();
			//console.log("이미지 넓이="+imgW);
			
			pagerItem.eq(currentNum).find('a').addClass('active');
			imgItem.eq(currentNum).siblings().hide();

		}
		
		var addEvent = function(){
			
			pagerBtn.bind("click",function(e){ 
				if(isMotion==false)motionSlide( $(this).parent().index() );
			});
			
			controlBtn.bind("click",function(e){ 
				//console.log("컨트롤 버튼 클릭");
				if( isAuto ){
					$(this).css('background-position','0 0');
					clearInterval(timerID);
					isAuto=false;
				}else{
					$(this).css('background-position','-12px 0');
					timerID = setInterval(function(){autoPlay()},autoTime);
					isAuto=true;
				}
			});

			$this.bind("mouseenter",function(e){ 
				//console.log("마우스 오버");
				if(isAuto && isMotion==false && timerID!=null ){
					clearInterval(timerID);
					timerID=null;
				}
			});
			
			$this.bind("mouseleave",function(e){ 
				//console.log("마우스 아웃 = "+timerID);
				if(isAuto && isMotion==false && timerID==null){
					timerID = setInterval(function(){autoPlay()},autoTime);
				}
			});
			
			$this.bind("focusin",function(e){ 
				//console.log("포커스 들어옴");
				$this.mouseenter();
			});
			
			$this.bind("focusout",function(e){ 
				//console.log("포커스 나감");
				$this.mouseleave();
			});
		}
		
		// ========================== 작동
		var motionSlide = function( val ){
			isMotion = true;
			imgGroup.css('width',imgW*len);
			imgGroup.css('left',-(currentNum*imgW));
			//console.log("클릭번호 ="+val);
			pagerItem.eq(currentNum).find('a').removeClass('active');
			pagerItem.eq(val).find('a').addClass('active');
			imgItem.show();
			
			targetPos =  -(val*imgW);
			//console.log("targetPos ="+targetPos);
			imgGroup.animate({'left':targetPos},function(e){motionComp(e)});
			
			
			currentNum = val;
		}
		
		var motionComp = function( e ){
			imgItem.eq(currentNum).siblings().hide();
			imgGroup.css('left','0');
			isMotion = false;
		}
		
		var autoPlay = function(){
			var autoNum;
			if( (currentNum+1)<len ){
				autoNum = currentNum+1;
			}else{
				autoNum = 0;
			}
			pagerItem.eq(autoNum).find('a').click();
		}
		
		// ========================== 옵션
		$this.stopAuto = function(){
			//console.log("stopAuto");
			
			// 현재 자동 플레이 인지 판단해서 자동이면 멈추고 자동이 아님 놔둔다.
			if( isAuto ){
				controlBtn.click();
			}
		}
		
		$this.resetSlider = function(){
			//console.log("resetSlider");
			// 첫 페이지 부터 보여준다.
			//버튼을 누르면 이동하는게 보여지니까. 강제세팅
			imgGroup.css('width',imgW*len);
			imgGroup.css('left',-(currentNum*imgW));
			pagerItem.eq(currentNum).find('a').removeClass('active');
			pagerItem.eq(0).find('a').addClass('active');
			imgItem.show();
			targetPos =  -(0*imgW);
			////
			imgGroup.css({'left':targetPos});
			imgItem.eq(0).siblings().hide();
			imgGroup.css('left','0');

			
			currentNum = 0;
			
			//자동이 아니므로 다시 자동으로
			if( isAuto == false ){
				controlBtn.click();
			}
		}
		init();
		return this;
	}
	
	
	$.fn.spotSliderSimple = function(options){
		var $this = this;
		var currentNum=0;
		var count;
		var itemArr = [];
		var stageW;
		var isMoving = false;
		// ========================== 생성자
		var init = function(){
			setLayout();
			//addEvent();
		}
		
		// ========================== 세팅
		var setLayout = function(){
			stageW = $this.width();
			$('>ul>li', $this).each(function(idx){
				itemArr.push(this);
				if( idx>0 ){
					$(this).css("left",-stageW);
				}
				count = itemArr.length;
			});
			//console.log("asdasdasdasd"+$(itemArr[2]).index());
			//console.log("count"+count);
			if( count<2 ){
				$('.control', $this).hide();
			}else{
				addEvent();
			}
		}
		
		var addEvent = function(){
			$('.btn_l', $this).bind("click", function(){if(isMoving==false)startMotion("l")});
			$('.btn_r', $this).bind("click", function(){if(isMoving==false)startMotion("r")});
		}
		
		var startMotion = function(val){
			isMoving=true;
			var newNum;
			if( val=="l" ){
				newNum=(currentNum==0)?(count-1):(currentNum-1);
				$(itemArr[currentNum]).animate({'left':stageW+"px"});
				$(itemArr[newNum]).css({'left':-stageW+"px"}).animate({'left':'0'},onComp);
			}else if( val=="r" ){
				newNum=(currentNum==(count-1))?0:(currentNum+1);
				$(itemArr[currentNum]).animate({'left':-stageW+"px"});
				$(itemArr[newNum]).css({'left':stageW+"px"}).animate({'left':'0'},onComp);
			}
			currentNum = newNum;
		}
		
		var onComp = function(evt){
			isMoving=false;
		}

		init();
		return this;
	}
});