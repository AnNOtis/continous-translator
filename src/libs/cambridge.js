// import axios from 'axios'
const axios = require('axios')
const $ = require('cheerio')

async function search (word) {
  const resp = await axios.get('https://dictionary.cambridge.org/dictionary/english-chinese-traditional/apple')

  return { definitions: definitions($.load(resp.data, { ignoreWhitespace: true })) }
}

function definitions ($) {
  return $('.entry-body__el').map((_, elem) => definition($(elem)))
}

function definition (elem) {
  return {
    pos: pos(elem),
    pron: pronounciation(elem),
    content: content(elem),
    translation: translation(elem),
    examples: examples(elem),
    moreExamples: moreExamples(elem)
  }
}

function pos (elem) {
  return $(elem).find('.pos-header .pos').text()
}

function pronounciation (elem) {
  const $$ = $(elem)

  return {
    us: {
      audioSrc: $$.find('.pron-info[pron-region=US] .us.sound').attr('data-src-mp3'),
      ipa: $$.find('.pron-info[pron-region=US] .ipa').text()
    }
  }
}

function content (elem) {
  return $(elem).find('.def').text()
}

function translation (elem) {
  return $(elem).find('.def-body .trans').first().text().trim()
}

function examples (elem) {
  return $(elem).find('.examp').map((_, elem) => example(elem))
}

function example (elem) {
  return {
    content: $(elem).find('.eg').text().trim(),
    translation: $(elem).find('.trans').text().trim()
  }
}

function moreExamples (elem) {
  return $(elem).find('.extraexamps .eg').map((_, elem) => $(elem).text().trim()).toArray()
}

export default {
  search
}
