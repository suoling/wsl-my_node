var fs = require('fs')
var request = require("request")
// cheerio是nodejs的抓取页面模块，
// 为服务器特别定制的，快速、灵活、实施的jQuery核心实现
var cheerio = require("cheerio")
var http = require('http')
// iconv-lite用于在node当中处理在各种操作系统出现的各种奇特编码，
// 该模块不提供读写文件的操作，只提供文件编码转换的功能。
var iconv = require('iconv-lite')
var dir = './images'
var baseUrl = 'http://www.mm131.com/xinggan/'

// 获取html源代码
var getHTML = function (url, callback) {
    http.get(url, (res) => {
        var htmlData = []
        var htmlDataLength = 0
        res.on('data', function(data) {
            htmlData.push(data);
            htmlDataLength += data.length;
        })
        res.on('end', function() {
            // console.log(html)
            var bufferHtmlData = Buffer.concat(htmlData,htmlDataLength)
            decodeHtmlData = iconv.decode(bufferHtmlData,'gbk');
            callback(decodeHtmlData)
        })
    })
}

var getImgSrc = function (html) {
    var $ = cheerio.load(html)
    // console.log($('img'))
    let imgSrcArr = []    
    $('.main .list-left dd img').each(function(index,item) {
        // console.log(index)
        let imgSrc = $(item).attr('src')
        imgSrcArr.push(imgSrc)
        // console.log(imgSrc)
    })
    return imgSrcArr
}

var getNextPageUrl = function (html) {
    var $ = cheerio.load(html,{decodeEntities: false})
    let nextPageUrl = ''
    $('.main .list-left .page a').each((index, item) => {
        // console.log($(item).text())
        if ($(item).text() === '下一页') {
            // console.log($(item).attr('href'))
            nextPageUrl = baseUrl + $(item).attr('href')
        }
    })
    return nextPageUrl
}




var imgSrcAll = []
var reqUrl = baseUrl
var count = 0;

var xxxx = (html) => {
    // console.log(html)
    // console.log(getImgSrc(html))
    // console.log(getNextPageUrl(html))
    imgSrcAll.push(getImgSrc(html))
    console.log(count++)
    reqUrl = getNextPageUrl(html)
    if(reqUrl && count < 2){
        getHTML(reqUrl,xxxx)
    } else {
        console.log(imgSrcAll)
        downFiles(imgSrcAll)
    }
}


var downFiles = function(arr){
    
    arr.map(item => {
        item.map(aItem => {
            download(aItem, dir, uuid() + '.jpg')
        })
    })   
}

getHTML(reqUrl,xxxx)

var download = function(url, dir, filename){
    console.log(url)
    request.head(url, () => {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    })
}


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}



