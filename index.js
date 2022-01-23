require('dotenv').config(); // 載入 .env 的設定    本身require進來就是一個object，『require('dotenv').config()』直接這樣寫就可以了。這一行要放在最前面。

const express = require('express');   // 第一個動作 引入express。  『express』他是一個套件安裝進來的，所以不要給路徑。

const app = express();  // 第二個動作 建立一個app『web server』，把它當作func來使用


//* app.get() 這個get指的是http方法的get

app.get('/', (req, res)=>{   //! 第三個動作 定義路由，有兩個重要的地方，一個是路徑另一個是方法   // 『 '/' 』 就是根目錄的意思
    res.send(`<h2>Hello</h2>`);  // send() 如果是字串的話會看成html
})

let port = process.env.PORT || 3000;   // 『 port = process.env.PORT 』是從'dotenv'過來的
app.listen(port, ()=>{   // 第四個動作 下一個listen來偵聽
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`啟動: ${port}`, new Date());
});  

/*
可以send 這些東西
res.send({ some: 'json' })   物件
res.send('<p>some html</p>')  一般文字
res.status(404).send('Sorry, we cannot find that!')  狀態
res.status(500).send({ error: 'something blew up' })  狀態

設定head可以用set 例如： res.set('Content-Type', 'text/html')
*/