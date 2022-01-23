const http = require("http");
const { report } = require("process");

const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        'content-Type': 'text/plain'  // plain指的是一般的文字檔，所以那些h1、p 等等之類的標籤全部都會變成一般文字
    })
    res.end(`<h1>Hola, ciao, ${req.url}</h1>`);  
});




server.listen(3000); // node 一般習慣用3000或5000

