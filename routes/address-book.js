const express = require('express');
const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

// 路由模組化
const router = express.Router();

router.get('/', (req, res) => {
    res.render('address-book/main');
});
//------------------------------------這段以下是list-----------------------------------------

router.get('/list', async (req, res) => {
    res.locals.pageName = 'address-book list';
    const perPage = 5; // 每一頁有幾筆
    let page = parseInt(req.query.page) || 1;

    //---------------------------這段以下至做搜尋功能-------------------------------------

    let keyword = req.query.keyword || '';  //  要來做搜尋功能

    res.locals.keyword = keyword; // 傳給template

    //---------------------------這段以上至做搜尋功能-------------------------------------

    const output = {

    };

    let where = " WHERE 1 "  // 給搜尋條件一個 title
    if(keyword){             // 如果有搜尋條件的keyword，就把下面這串接起來
        where += ` AND name LIKE ${db.escape('%' + keyword + '%')} `  // db.escape: 會在外面幫你加上單引號。
    }; //!  就可以得到一個新的變數 『 where 』作為sql搜尋條件的子句

    // totalRows 求總筆數
    const totalSql = `SELECT COUNT(1) totalRows FROM address_book ${where}`; // 會變成帶有搜尋條件下的總筆數，因為加了 ${where} 。
    const [
        [{
            totalRows
        }]
    ] = await db.query(totalSql);
    output.totalRows = totalRows;

    /*
    ! 一開始是這樣寫的 const [result1]  output.result1 = result1
    ! 不是 const [[{totalRows}]]      output.totalRows = totalRows

    ! 現在我要 [result1] 裡面的第一個項目，
    ! 會改寫成 [[result1]] ，然後還要再解開來，要裡面的 totalRows 
    ! 所以會寫成 [[{totalRows}]]
    */

    output.totalPages = Math.ceil(totalRows / perPage); // 求總頁數
    output.perPage = perPage; // 每一頁有幾筆
    output.rows = [];
    output.page = page;


    if (totalRows > 0) {
        if (page < 1) {
            return res.redirect('?page=1');
        }
        if (page > output.totalPages) {
            return res.redirect('?page=' + output.totalPages);
        }
        const sql = `SELECT * FROM address_book ${where} ORDER BY sid DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
        const [rows] = await db.query(sql);
        output.rows = rows;

    }

    // res.json(output);
    res.render('address-book/list', output);
});

//------------------------------------這段以上是list-----------------------------------------


//------------------------------------這段以下是delete-----------------------------------------

router.delete('/delete/:sid([0-9]+)', async (req, res) => { // regular expression [0-9]+  0~9的數字1個以上
    const sql = `DELETE FROM address_book WHERE sid=?`;

    const [result, fields] = await db.query(sql, [req.params.sid]); // query 的結果是一個array

    console.log({
        result
    }); // 這邊的 result 是個物件

    res.json(result);
});
//------------------------------------這段以上是delete-----------------------------------------


//------------------------------------這段以下是create-----------------------------------------


router.route('/add')
    .get(async (req, res) => {
        res.locals.pageName = 'address-book add';
        res.render('address-book/add');
    })

    .post(async (req, res) => {
        //todo 欄位檢查
        const output = {
            success: false,
        }

        /*   新增資料功能  之一
        const sql = "INSERT INTO `address_book`(" + 
        "`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";

        const [result] = await db.query(sql,[
            req.body.name,
            req.body.email,
            req.body.mobile,
            req.body.birthday,
            req.body.address,
        ]);
        !~~~~空字串『不等於是』空值
        */

        const input = {... req.body, created_at: new Date()};  // ... 把他展開來，多一個少一個都不行
        const sql = `INSERT INTO address_book SET ?`;
        let result = {};
        // 處理新增資料時可能發生的錯誤
        try{
            [result] = await db.query(sql,[input]);
        }
        catch(ex){
            output.error = ex.toString();
        }
        


        output.result = result;
        if(result.affectedRows && result.insertId){
            output.success = true;
        }

        console.log({result});
        /*
        {
            "fieldCount":0,
            "affectedRows":1,     新增、修改、刪除
            "insertId":110119,
            "info":"",
            "serverStatus":2,
            "warningStatus":0
        }
        */
        res.json(output);
    });

//------------------------------------這段以上是create-----------------------------------------


//------------------------------------這段以下是edit-----------------------------------------


router.route('/edit/:sid')
    .get(async (req, res) => {
        const sql = `SELECT * FROM address_book WHERE sid =?`;
        // req.params：路徑上的變數代稱
        const [result] = await db.query(sql, [req.params.sid]);


        if(result.length){
            res.render('address-book/edit', {rows: result[0]});
        }else{
            res.redirect('/address-book/list');
        } // 有這筆資料的話就呈現出來


    })

    .post(async (req, res) => {
        //todo 欄位檢查
        const output = {
            success: false,
            postData: req.body,
        }


        const input = {... req.body};  // ... 把他展開來，多一個少一個都不行
        const sql = `UPDATE address_book SET ? WHERE sid=?`;
        let result = {};
        // 處理修改資料時可能發生的錯誤
        try{
            [result] = await db.query(sql,[input, req.params.sid]);
        }
        catch(ex){
            output.error = ex.toString();
        }

        output.result = result;
        if(result.affectedRows === 1){
            if(result.changedRows === 1){
                output.success = true;
            }else{
                output.error ='資料沒有變更。';
            }
        }
        res.json(output);
        
    });


//------------------------------------這段以上是edit-----------------------------------------

module.exports = router; // 匯出router， 原則上這就是一個middleware。