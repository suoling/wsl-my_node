
var http=require('http');
//get 请求外网
http.get('http://www.baidu.com',function(res){
	var html='';
	var len = 0
	res.on('data',function(data){
		html+=data;
		len +=1;
	});
	res.on('end',function(){
		// console.info(html);
	});
	console.log(res)
});
