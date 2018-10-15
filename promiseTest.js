var http = require('http')
var iconv = require('iconv-lite')

var QQ = function (baidu) {
    console.log(baidu)
    return new Promise(function (resolve, reject) {
        http.get('http://www.qq.com/', res => {
            var htmlData = []
            var htmlDataLength = 0
            res.on('data', function (data) {
                htmlData.push(data);
                htmlDataLength += data.length;
            })
            res.on('end', function () {
                // console.log(html)
                var bufferHtmlData = Buffer.concat(htmlData, htmlDataLength)
                decodeHtmlData = iconv.decode(bufferHtmlData, 'utf8');
                // callback(decodeHtmlData)
                if (res.statusCode == 200) {
                    resolve(decodeHtmlData)
                } else {
                    reject(res)
                }
            })
        })
    })
}

new Promise( (resolve, reject) => {

    http.get('http://www.baidu.com/', (res) => {
        var htmlData = []
        var htmlDataLength = 0
        res.on('data', function (data) {
            htmlData.push(data);
            htmlDataLength += data.length;
        })
        res.on('end',  ()=> {
            // console.log(html)
            var bufferHtmlData = Buffer.concat(htmlData, htmlDataLength)
            decodeHtmlData = iconv.decode(bufferHtmlData, 'utf8');
            // callback(decodeHtmlData)
            if (res.statusCode == 200) {
                resolve(decodeHtmlData)
            } else {
                reject(res)
            }
        })
    })
}).then(QQ).then(res => {
    console.log('QQ网页：', res)
}).catch(err => {
    console.log('error:', err)
})






// http.get('http://www.baidu.com/', (res) => {
//       console.log(res)  
// })
