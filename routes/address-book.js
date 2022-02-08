const express = require('express');
const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

// 路由模組化
const router = express.Router();

router.get('/', (req, res) => {
    res.render('address-book/main');
});
//------------------------------------這段以下是list-----------------------------------------

router.get('/list', async(req, res) => {
    res.locals.pageName = 'address-book list';
    const perPage = 5;  // 每一頁有幾筆
    let page = parseInt(req.query.page) || 1;

    const output = {
    
    };

    // totalRows 求總筆數
    const totalSql = `SELECT COUNT(1) totalRows FROM address_book`  // 可以去phpMyAdmin 的 sql那邊把語法寫好之後，在這裡貼上就不怕寫錯。
    const [[{totalRows}]] = await db.query(totalSql);
    output.totalRows = totalRows;

    /*
    ! 一開始是這樣寫的 const [result1]  output.result1 = result1
    ! 不是 const [[{totalRows}]]      output.totalRows = totalRows

    ! 現在我要 [result1] 裡面的第一個項目，
    ! 會改寫成 [[result1]] ，然後還要再解開來，要裡面的 totalRows 
    ! 所以會寫成 [[{totalRows}]]
    */

    output.totalPages = Math.ceil(totalRows / perPage);  // 求總頁數
    output.perPage = perPage;  // 每一頁有幾筆
    output.rows = [];
    output.page = page;
    
    
    if(totalRows > 0){
        if(page < 1){
            return res.redirect('?page=1');
        }
        if(page > output.totalPages){
            return res.redirect('?page=' + output.totalPages);
        }
        const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
        const [rows] = await db.query(sql);
        output.rows = rows;

    }

    // res.json(output);
    res.render('address-book/list', output);
});

//------------------------------------這段以上是list-----------------------------------------


//------------------------------------這段以下是delete-----------------------------------------

router.delete('/delete/:sid([0-9]+)', async (req, res) => {  // regular expression [0-9]+  0~9的數字1個以上
    const sql = `DELETE FROM address_book WHERE sid=?`;

    const [result, fields] = await db.query(sql, [req.params.sid]);  // query 的結果是一個array

    console.log({result});  // 這邊的 result 是個物件

    res.json(result);
});
//------------------------------------這段以上是delete-----------------------------------------


//------------------------------------這段以下是create-----------------------------------------


router.route('/add')
    .get( async (req, res) => {  
        res.locals.pageName = 'address-book add';
        res.render('address-book/add');
    })
    
    .post(upload.none(), async (req, res) => {  
        res.json(req.body);
    });


module.exports = router;  // 匯出router， 原則上這就是一個middleware。
