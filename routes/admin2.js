const express = require('express');

// 路由模組化
const router = express.Router();

router.get('/admin2/:p1?/:p2?', (req, res) => {
    res.json({
        params: req.params,
    });
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。
