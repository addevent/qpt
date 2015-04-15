/*************************************************************************************************
*	@CreateDate          : 2014.11.28
*	@ModifyDate          : 2014.11.28
*	@FileName            : spot.js
*	@Author              : inspot_jin
*************************************************************************************************/
/**
* �߾����� ��ġ
* @param containerSize : �����̳��� ũ��
* @param targetSize : �����̳ʿ� ��� �ִ� ������Ʈ�� ũ�� 
* @return 
*/		
function getCenterAlignPos( containerSize, targetSize ) {
  var pos = ( containerSize - targetSize ) / 2;
  return pos;
}
		
/**
 * �ش� ����Ʈ�� �������� �߰��� ��ĥ��� 
 * @param centerPos : ���ؼ� 
 * @param targetSize : ������Ʈ�� ũ��
 * @return 
 * 
 */		
function getCenterPos( centerPos, targetSize ) {
  var pos = centerPos - ( targetSize / 2 );
  return pos;
}

/**
 * ������ �����ϰ� �̾ƿ���
 * @param min : ���� ������
 * @param max  : ���� ������
 * @return 
 * 
 */	
function getRandom( min, max ){
	return Math.floor(Math.random()*(max-min))+min;
}


/**
 * ������ ���� �˱�
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
 * PC ���� ��������� �Ǵ��ϱ� 
 * return true : pc
 * return false : mobile
 * 
 */
var isPc = (function() {
  var filter = "win16|win32|win64|mac";
  var isPc = true;
  
  if( navigator.platform  ){
      if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
          //("����� ��⿡�� ����");
		  return false;
      }else{
		  //("PC���� ����");
          return true;
      }
  }
}());

/**
 * URL���� get����� �Ķ���� �޾ƿ��� 
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
		alert(maxLen + "�ڱ����� �Է��� �ּ���");
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


//---------------------------------------------------- �̹��� ������ ��� ( ��ʽ� )
var imgSize = function(a,aa,b){
	var size = (aa*b)/a;
	return size;
};