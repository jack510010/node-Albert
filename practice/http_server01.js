const http = require("http");
const { report } = require("process");

const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        'content-Type': 'text/html'
    })
    res.end(`<h1>Hola, ciao, ${req.url}</h1>`);  // .end()是去輸出內容到頁面上
});
// res就是response，server端要回應給用戶端，所以我要回應的時候是用『res』這個物件的『end()』方法

server.listen(3000); // node 一般習慣用3000或5000

// 第8行的Hello修改成hola, ciao，但是頁面刷新之後一樣是hello，原因下一行有註解
//! 當我透過node去執行這隻『http_server01.js』檔案時，他並不會因為改了程式碼他就重新載入，他就只載入一次，所以不會影響到已經執行在記憶體裡面的程式。如果要執行修改後的程式碼那就必須重新啟動。