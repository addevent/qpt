/*************************************************************************************************
*	@CreateDate          : 2014.11.28
*	@ModifyDate          : 2014.11.28
*	@FileName            : spot.js
*	@Author              : inspot_jin
*************************************************************************************************/
/**
* 중앙정렬 위치
* @param containerSize : 컨테이너의 크기
* @param targetSize : 컨테이너에 들어 있는 오브젝트의 크기 
* @return 
*/		
function getCenterAlignPos( containerSize, targetSize ) {
  var pos = ( containerSize - targetSize ) / 2;
  return pos;
}
		
/**
 * 해당 포인트를 기준으로 중간에 걸칠경우 
 * @param centerPos : 기준선 
 * @param targetSize : 오브젝트의 크기
 * @return 
 * 
 */		
function getCenterPos( centerPos, targetSize ) {
  var pos = centerPos - ( targetSize / 2 );
  return pos;
}

/**
 * 랜덤값 간단하게 뽑아오기
 * @param min : 가장 적은값
 * @param max  : 가장 높은값
 * @return 
 * 
 */	
function getRandom( min, max ){
	return Math.floor(Math.random()*(max-min))+min;
}


/**
 * 브라우저 종류 알기
 * if(getBrowser.name == "msie") { ... }
 * 
 */	
var getBrowser = (function() {
  var s = navigator.userAgent.toLowerCase();
  var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
              /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
              /(msie) ([\w.]+)/.exec(s) ||               
              /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
             [];
  return { name: match[1] || "", version: match[2] || "0" };
}());

/**
 * PC 인지 모바일인지 판단하기 
 * return true : pc
 * return false : mobile
 * 
 */
var isPc = (function() {
  var filter = "win16|win32|win64|mac";
  var isPc = true;
  
  if( navigator.platform  ){
      if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
          //("모바일 기기에서 접속");
		  return false;
      }else{
		  //("PC에서 접속");
          return true;
      }
  }
}());

/**
 * URL에서 get방식의 파라메터 받아오기 
 * 
 */
function getUrlParameters(){
	var url = location.href; 
	var param = null; 
	var params = new Object; 
	param = url.split("?");  
	if(param.length > 1){  
	    param = param[1].split("&");  
		for(var i = 0 ; i < param.length; ++i){  
			var imsi = param[i].split("=");  
			params[imsi[0]] = imsi[1];  
	    }  
		params.getString = function(str){  
			if(this[str]) return this[str];  
			else return null;  
		}  
		params.getNumber = function(str){  
			if(this[str]) return Number(this[str]);  
			else return null;  
		}  
		return params;  
	}  
	return null; 
}

function dataChk(str, maxLen)
{
	if (str.value.length > maxLen) 
	{
		alert(maxLen + "자까지만 입력해 주세요");
		str.value = str.value.substring(0,maxLen);
		str.focus();
		return;
	}
}

var isMobile = (function() {
  var keyword = new Array('iPhone', 'iPod', 'Android', 'Windows CE', 
                          'BlackBerry', 'Symbian', 'Windows Phone',  
                          'webOS', 'Opera Mini', 'Opera Mobi', 'POLARIS',  
                          'IEMobile', 'lgtelecome', 'LG', 'MOT', 'SAMSUNG', 'Samsung', 'SonyEricsson')
                    , ua = navigator.userAgent 
                    , re = null 
                    , index = '' 
                    , res = false; 
                 
    for(index in keyword) { 
		re = new RegExp(keyword[index]); 
        res = re.test(ua); 
        if(res == true) { break; }
	} 
                 
  return res; 
}());


//---------------------------------------------------- 이미지 사이즈 계산 ( 비례식 )
var imgSize = function(a,aa,b){
	var size = (aa*b)/a;
	return size;
};