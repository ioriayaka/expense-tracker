const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

// 新增Create
router.get('/new', (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  if (!name || !category || !date || !amount || !merchant) {
    return res.redirect('/records/new')
  }
  return Record.create({ name, category, date, amount, merchant, userId })
    .then(() => {
      req.flash('success_messages', '已成功建立支出紀錄！')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

// 編輯 update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})
//修改支出
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findById({ _id, userId })
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => {
      req.flash('success_messages', '已成功修改支出紀錄！')
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => {
      req.flash('success_messages', '已成功刪除支出紀錄！')
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router