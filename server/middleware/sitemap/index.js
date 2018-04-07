const fs = require('fs')
const mysql = require('../../api/mysql')
const CONFIG_MYSQL = require('../../api/mysql/model')
const option = {
  encoding: 'utf8'
}

// Node.js는 기본적으로 파일을 저장할 때 BOM 정보를 저장하지 않기 때문에 \ufeff를 텍스트에 앞에 명시해줘야 한다.
const text = 'UTF-8로 저장될 텍스트'; 
fs.writeFileSync("sitemap.xml", '\ufeff' + text, option)
