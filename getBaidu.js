
var http=require('http');
//get 请求外网
// http.get('http://www.baidu.com',function(res){
// 	var html='';
// 	var len = 0
// 	res.on('data',function(data){
// 		html+=data;
// 		len +=1;
// 	});
// 	res.on('end',function(){
// 		// console.info(html);
// 	});
// 	console.log(res)
// });

// promise
// let getBaidu = new Promise((resolve, reject) => {
// 	http.get('http://www.baidu.com',function(res){
// 		var html='';
// 		var len = 0
// 		res.on('data',function(data){
// 			html+=data;
// 			len +=1;
// 		});
// 		res.on('end',function(){
// 			resolve(html)
// 		});
// 	});
// })
// getBaidu.then(res => {
// 	console.log(res)
// })

// async await
function getBaidu () {
	return new Promise((resolve, reject) => {
		http.get('http://www.baidu.com',function(res){
			var html='';
			var len = 0
			res.on('data',function(data){
				html+=data;
				len +=1;
			});
			res.on('end',function(){
				resolve(html)
			});
		});
	})
}

async function fn () {
	const res = await getBaidu()
	console.log(res)
}

fn()