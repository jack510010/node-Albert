require('dotenv').config(); // 載入 .env 的設定    本身require進來就是一個object，『require('dotenv').config()』直接這樣寫就可以了。這一行要放在最前面。
// 一般『config()』不需要給參數
// 除非我有指定它的設定檔在哪裡，那就要下path 像這樣『 config({ path: '/custom/path/to/.env' }) 』

const http = require("http");


const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        'content-Type': 'text/html'  
    })
    res.end(`<p>PORT: ${process.env.PORT}</p>`);  
});

server.listen(process.env.PORT); 

console.log(`PORT: ${process.env.PORT}</p>`);


/* 
! 習慣用一個叫『.env』的檔案來做設定， 會需要一些環境變數，這個檔案就不會放到版控裡面。
! 因為同時有數個人在開發，那每次登入都要改寫下面這些東西很麻煩，而且還要push上去，這樣子很困擾。所以不放到版控。
PORT=3001

DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=Albert
*/