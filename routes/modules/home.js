const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
// 設定首頁路由
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

router.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  const selectedMonth = req.query.monthSelect
  let totalAmount = 0
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach((item) => {
        categoryIcons[item.categoryName] = item.categoryIcon
      })
    })
    .then(() => {
      const userId = req.user._id
      Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then((records) => {
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (selectedMonth) {
            records = records.filter(record => {
              const date = record.date
              const monthOfDate = date.getMonth() + 1
              return monthOfDate.toString() === selectedMonth
            })
          }
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { categories, totalAmount, selectedCategory, records, selectedMonth })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router