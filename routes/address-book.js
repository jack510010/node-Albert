const express = require('express');
const db = require('./../modules/connect-mysql');
// 路由模組化
const router = express.Router();

router.get('/', (req, res) => {
    res.render('address-book/main');
});

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
        const sql = `SELECT * FROM address_book LIMIT ${(page - 1) * perPage}, ${perPage}`;
        const [rows] = await db.query(sql);
        output.rows = rows;

    }

    // res.json(output);
    res.render('address-book/list', output);
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。
