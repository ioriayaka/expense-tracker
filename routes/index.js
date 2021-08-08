const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
//引用 users 模組
const users = require('./modules/users')
router.use('/', home)
router.use('/records', records)
router.use('/users', users)
module.exports = router