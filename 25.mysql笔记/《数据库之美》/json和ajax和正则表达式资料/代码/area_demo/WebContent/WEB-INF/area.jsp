<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
//定义xmlhttprequest
var xmlHttp;
function ajaxFunction(){
	try{
	  // Firefox, Opera 8.0+, Safari
	   xmlHttp=new XMLHttpRequest();
	}catch (e){
	 // Internet Explorer
		try {
	     xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	    }catch (e){
		     try{
		        	xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		     }catch (e){
		        alert("您的浏览器不支持AJAX！");
		        return false;
		     }
     	}
  	 }
}


function loadOpt(obj, areaType){
	//创建XMLHttpRequest
	ajaxFunction();
	var url = "/area_demo/loadOpt";
	
	//打开连接,第一个参数是请求方式，第二个参数是请求地址，第三个参数是同步还是异步，true异步，false是同步
	xmlHttp.open('post', url, true);
	//如果是post请求必须设置,setRequestHeader必须放在open下面
	xmlHttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange = function(){
		//readyState==4请求完成
		if(xmlHttp.readyState == 4){
			//服务器响应正确
			if(xmlHttp.status == 200){
				//接收服务器的响应数据
				var result = xmlHttp.responseText;
				//在js中有json格式的对象，但是不是字符串
				//var obj = {name:'zhangsan', age:23}
				//alert(result)
				//[{"areaId":9,"areaName":"哈尔滨市","level":2,"pid":3},{"areaId":10,"areaName":"齐齐哈尔市","level":2,"pid":3}]
				var jsonResult = window.eval("("+result+")");
				//[object Object],[object Object],转换后是数组
				//alert(jsonResult);
				if(areaType == 'city'){
					var cityObj = document.getElementById('city');
					var optStr = "<option value=\"-2\">--请选择市--</option>";
					
					for(var i = 0; i < jsonResult.length; i++){
						var areaId = jsonResult[i].areaId;
						var areaName = jsonResult[i].areaName;
						optStr = optStr + "<option value=\""+areaId+"\">"+areaName+"</option>";
					}
					cityObj.innerHTML = optStr;
				}else if(areaType == 'district'){
					var cityObj = document.getElementById('district');
					var optStr = "<option value=\"-2\">--请选择区--</option>";
					
					for(var i = 0; i < jsonResult.length; i++){
						var areaId = jsonResult[i].areaId;
						var areaName = jsonResult[i].areaName;
						optStr = optStr + "<option value=\""+areaId+"\">"+areaName+"</option>";
					}
					cityObj.innerHTML = optStr;
				}
				
				
			}
		} 
	}
	var data = "pid="+obj.value;
	//发送数据,如果是get请求数据是在url上传递，不需要发送数据,send必须在最后调用。
	xmlHttp.send(data);
	
}

function callback(){
	
}
</script>

</head>
<body>
<table>
	<tr>
		<td>省
			<select id="province" onchange="loadOpt(this, 'city')">
				<option value="-2">--请选择省--</option>
				<c:forEach items="${pList }" var="area">
					<option value="${area.areaId }">${area.areaName }</option>
				</c:forEach>
			</select>
			
		</td>
		<td>市
			<select id="city" onchange="loadOpt(this, 'district')">
				
			</select>
		</td>
		<td>区
			<select id="district">
				
			</select>
		</td>
	</tr>
	
	
</table>
</body>
</html>