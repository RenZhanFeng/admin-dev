const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const jwtAuth = require('./jwt')
const Result = require('../model/Result')

// 注册路由
const router = express.Router()

router.use(jwtAuth)

router.get('/', function (req, res) {
  res.send('欢迎学习小慕读书管理后台')
})

router.use('/user', userRouter)

router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

router.use((err, req, res, next) => {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    new Result(null, 'Token验证失败', {
      error: err.status,
      errorMsg: err.message
    }).expired(res.status(err.status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})

module.exports = router