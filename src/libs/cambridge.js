// import axios from 'axios'
const axios = require('axios')
const $ = require('cheerio')

async function search (word) {
  if (!word) return null

  const resp = await axios.get('https://dictionary.cambridge.org/dictionary/english-chinese-traditional/' + word)

  const defElem = $.load(resp.data)('#entryContent')

  return defElem.length > 0 ? { collections: collections(defElem) } : null
}

function collections (elem) {
  return $(elem).find('.entry-body__el.clrd')
    .map((_, elem) => ({
      pos: pos($(elem)),
      pron: pronounciation($(elem)),
      definitions: definitions($(elem))
    }))
    .toArray()
}

function pos (elem) {
  return $(elem).find('.di-title .pos').text()
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

function definitions (elem) {
  return $(elem).find('.sense-block')
    .map((_, el) => definition($(el)))
    .toArray()
    .filter(definition => !!definition)
}

function definition (elem) {
  /**
   * One definition may contain multiple contents and translations, only one will be picked.
   */
  const el = $(elem).find('.def-block').first()
  const phraseBlocks = $(elem).find('.phrase-block .def-block')
  const phraseBlockIds = phraseBlocks.map((_, el) => $(el).attr('data-wl-senseid')).toArray()

  // if this definition only has phrase definition, ignore it
  if (phraseBlockIds.indexOf(el.attr('data-wl-senseid')) >= 0) {
    return null
  }

  return {
    content: content(el),
    translation: translation(el),
    examples: examples(el) || [],
    moreExamples: moreExamples(elem) || []
  }
}

function content (elem) {
  return $(elem).find('.def').text()
}

function translation (elem) {
  return $(elem).find('.def-body .trans').first().text().trim()
}

function examples (elem) {
  return $(elem).find('.examp').map((_, elem) => example(elem)).toArray()
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
