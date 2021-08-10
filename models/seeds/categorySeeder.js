const db = require('../../config/mongoose')
const Category = require('../category')
const category = [
  {
    categoryName: '家居物業',
    en_name: 'home',
    categoryIcon: 'fas fa-home'
  },
  {
    categoryName: '交通出行',
    en_name: 'transportation',
    categoryIcon: 'fas fa-shuttle-van'
  },
  {
    categoryName: '休閒娛樂',
    en_name: 'entertainment',
    categoryIcon: 'fas fa-grin-beam'
  },
  {
    categoryName: '餐飲食品',
    en_name: 'food',
    categoryIcon: 'fas fa-utensils'
  },
  {
    categoryName: '其他',
    en_name: 'others',
    categoryIcon: 'fas fa-pen'
  }
]
db.once('open', () => {
  Category.create(category)
  .then(() => {
    console.log('Add category seeder done...')
    return db.close()
  })
  .then(() => {
    console.log('database connection close...')
  })
})