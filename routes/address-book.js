const express = require('express');
const db = require('./../modules/connect-mysql');
// 路由模組化
const router = express.Router();

router.get('/', (req, res) => {
    res.render('address-book/main');
});

router.get('/list', async(req, res) => {
    const perPage = 5;
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

    res.json(output);
    //res.render('address-book/list');
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。
