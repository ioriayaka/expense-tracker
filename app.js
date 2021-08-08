// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')
app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
  helpers: {
    toDate: function (date) {
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        .toISOString()
        .split("T")[0]
    }
  }
}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`The Express server is running on http://localhost:${PORT}`)
})