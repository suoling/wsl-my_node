
// var a = [1,2,3,4,5].map((item, index) => {
//     return item * item
// }).filter(item => {
//     return item % 2 === 0 ? true : false
// }).forEach(item => {
//     console.log(item)
// })

var allPromise = [1,2,3,4,5].map((item) => {
    return new Promise((resolve, reject) => {
        http.get("http://www.jushenghua.com?id=" + item).then(res=> {
            if(res == ok){
                resolve(res.data)
            } else {
                reject(res.err)
            }
        })
    })
})

Promise.all(allPromise).then(res => {

})
