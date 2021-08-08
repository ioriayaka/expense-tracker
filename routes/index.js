const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
//引用 users 模組
const users = require('./modules/users')
const auth = require('./modules/auth')
// 掛載 middleware
const { authenticator } = require('../middleware/auth')  

router.use('/records', authenticator, records) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 加入驗證程序
module.exports = router