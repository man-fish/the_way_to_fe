// ajax请求封装
function ajax(method,url,params,done){

	method=method.toUpperCase();

	var array=[];

	for(var key in params){
		array.push(key+'=' +params['key']);
	}

	var requeststr = array.join('&');

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new  ActiveXObject('Microsoft.XMLHTTP');

	xhr.addEventListener('readystatechange',function(){
		if(this.readyState!=4)return;
			try{
				done(JSON.parse(this.responseText));
			}catch(e){
				done(this.responseText);
			}
	})
	if (method=='GET') {
		url=url+'?'+requeststr;
	}
	xhr.open(method,url);

	var resp = null;

	if(method=='POST'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		resp=requeststr;
	}

	xhr.send(resp);
}