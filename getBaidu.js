
var http=require('http');
//get 请求外网
http.get('http://www.baidu.com',function(res){
	var html='';
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		// console.info(html);
	});
	console.log(res)
});
