require('dotenv').config(); // 載入 .env 的設定    本身require進來就是一個object，『require('dotenv').config()』直接這樣寫就可以了。這一行要放在最前面。

const express = require('express');   
const multer = require('multer');
const upload = multer({dest: 'tmp_uploads/'});
const app = express();  
const fs = require('fs').promises;


app.set('view engine', 'ejs'); // 樣版引擎




//app.use()   use的意思是所有的方法
app.use(express.urlencoded({extended: false})); //url格式 可以拿到中介軟體 middleware
app.use(express.json()); //json格式 這個也是中介軟體 middleware
app.use(express.static('public'));  // 使用靜態內容的資料夾要放在路由之前。  // 這個是根目錄，所以其他靜態的檔案，例如css、前端的js或者圖檔都可以放在public這個資料夾裡面。 
app.use('/jquery', express.static('node_modules/jquery/dist/'));     // 放進jquery，複製相對路徑
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));  // 放進bootstrap，複製相對路徑



// 路由定義開始: Begin
app.get('/', (req, res)=>{ 
    res.render('home', {name: 'albert'})  // 寫入home.ejs裡面的值，改ejs的話nodemon不會重新啟動，也不需要重新啟動就可以去render新的樣板

    //res.send(`<h2>Hello</h2>`);  
});

app.get('/json-sales', (req, res)=>{ 
   const sales = require('./data/sales'); // 副檔名可以不寫。他會自動把json的內容轉換成原生的陣列或物件

    //console.log(sales);
    //res.json(sales);
    res.render('json-sales', {sales});
});

app.get('/try-qs', (req, res)=>{ 

    res.json(req.query);  //queryString 進到express這邊時，會被放在req的query裡面。req.query類似PHP裡面的『$_GET』啦。
});


app.post('/try-post', (req, res)=>{     

    res.json(req.body); 
});
//----------------------------------------以下是try-post-form------------------
//表單頁面要兩個路由，一個get、一個post，基本上沒錯
app.get('/try-post-form', (req, res)=>{     

    res.render('try-post-form'); 
});

app.post('/try-post-form', (req, res)=>{     

    res.render('try-post-form', req.body); 
});
//----------------------------------------以上是try-post-form------------------

app.post('/try-upload',upload.single('avatar'), async (req, res) => {
    if(req.file && req.file.mimetype === 'image/jpeg' || 'image/png'){
        try{
            await fs.rename(req.file.path, __dirname + '/public/img/' + req.file.originalname);
            return res.json({success: true, filename: req.file.originalname});
        }catch(ex) {
           return res.json({success: false, error: '無法存檔'});
        }
        
    }else{
        await fs.unlink(req.file.path); // 刪除暫存檔
        res.json({success: false, error: '格式不對'});
    }
    res.json(req.file);
});

//--------------------------------以下是headshots------------注意！！ fs加上promises之後這裡就會爛掉----------------------------
app.get('/headshots', (req,res) => {
    res.render('headshots');
});

app.post('/headshots', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    if(req.file && req.file.originalname){

        if(/\.(jpg|jpeg|png|gif)$/i.test(req.file.originalname)){

            fs.rename(req.file.path, '/public/img/' + req.file.originalname);

        }else{

            fs.unlink(req.file.path);
        }
    }
    res.render('headshots', {
        result: true,
        name: req.body.name,
        avatar: '/img/' + req.file.originalname
    });
});
//--------------------------------以上是headshots---------------------------------------------

// 路由定義結束: End
app.use('/', (req, res)=>{
    res.status(404).send(`<h1>找不到頁面</h1>`);
})
let port = process.env.PORT || 3000; 
app.listen(port, ()=>{
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