"use strict"

const Express = require('express')
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')

const app = Express()
const port = 3030

app.use(cookieParser())
app.use(bodyParse.urlencoded({extended: false}))
app.use(Express.static('public'))

app.all('*', (req = {}, res = {}) => {
  const mock = (req.query && req.query.mock) || 0;
  const url = req.url && req.url.indexOf("?") > -1 ? req.url.split("?")[0] : req.url;
  let filePath = path.resolve(__dirname, `data/${url}_${mock}.json`)

  if(!fs.existsSync(filePath)) {
    filePath = path.resolve(__dirname, `data${url}.json`)
  }
  if (!fs.existsSync(filePath)) { 
    filePath = path.resolve(__dirname, `data/default.json`)
  }
  console.log(`mock:${mock}, 请求URL:${url}, 返回文件位置:${filePath}`)


  responseData(res, filePath);
})

function responseData(res, file) {
  
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Athorizaton, Accept, X-Requested-With, yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.send(fs.readFileSync(file).toString())
  res.end()
}

app.listen(port, () => {
  console.log(`listening at ==> http://127.0.0.1:${port}`)
})