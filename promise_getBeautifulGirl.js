var fs = require('fs')
var request = require("request")
var cheerio = require("cheerio")
var mkdirp = require('mkdirp')
var http = require('http')
var iconv = require('iconv-lite')

// 获取每页的美女图片
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

// 获取下一页的url
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


// 获取随机的字符串
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


new Promise((resolve, reject) => {
    http.get()
})