const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        'content-Type': 'text/html'  
    });
    fs.writeFile(
        'headers.txt',
        JSON.stringify(req.headers, null, 3),
        error => {
            if(error){
                res.end(`<h1>錯誤： ${error}</h1>`);
            }else{
                res.end(`<h2>ok</h2>`);
            }
        });
});

server.listen(3000);