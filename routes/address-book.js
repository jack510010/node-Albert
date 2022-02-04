const express = require('express');

// 路由模組化
const router = express.Router();

router.get('/', (req, res) => {
    res.render('address-book/main');
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。
