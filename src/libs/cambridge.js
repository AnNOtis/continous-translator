// import axios from 'axios'
const axios = require('axios')
const cheerio = require('cheerio')

async function search (word) {
  const resp = await axios.get('https://dictionary.cambridge.org/dictionary/english-chinese-traditional/apple')
  // const $ = cheerio.load(resp.data)
  // const result = $('.def-body').text()
  // console.log(result)
  return resp
}

export default {
  search
}
