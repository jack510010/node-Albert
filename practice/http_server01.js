const http = require("http");

const server = http.createServer((req, res)=>{

    res.end(`<h1>Hello, ${req.url}</h1>`);  // .end()是去輸出內容到頁面上
});
// res就是response，server端要回應給用戶端，所以我要回應的時候是用『res』這個物件的『end()』方法

server.listen(3000); // node 一般習慣用3000或5000