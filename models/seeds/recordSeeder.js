const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const data = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60,
    merchant: '樓下麵店'
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60,
    merchant: '響食天堂'
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021-07-16',
    amount: 120,
    merchant: '板南線'
  },
  {
    name: '電影:鋼鐵擂台',
    category: '休閒娛樂',
    date: '2021-07-15',
    amount: 220,
    merchant: '大江電影院'
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021-06-01',
    amount: 25000,
    merchant: '臭房東'
  }
]
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      data.forEach(item => item['userId'] = userId)
      Record.create(data)
        .then(() => {
          console.log('Add Record Seeder done!')
          return db.close()
        })
    })
    .then(() => {
      console.log('databaes connectoin close...')
    })
})