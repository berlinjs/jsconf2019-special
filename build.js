#!/usr/bin/env node

var StringDecoder = require('string_decoder').StringDecoder
var minhtml = require('html-minifier').minify
var hyperstream = require('hyperstream')
var purify = require('purify-css')
var through = require('through2')
var mkdirp = require('mkdirp')
var path = require('path')
var pump = require('pump')
var fs = require('fs')

var app = require('./')

mkdirp.sync('dist/')
process.stdout.write('[build.js] Writing HTML to static file…')

var route = '/'
var tmpfile = path.join(process.cwd(), 'dist/_index.html')
var outfile = path.join(process.cwd(), 'dist/index.html')

var html = app.toString(route)
var hs = hyperstream({ body: { _html: html } })
var index = fs.createReadStream(path.join(process.cwd(), 'dist', 'index.html'))
var out = fs.createWriteStream(tmpfile)

var css = fs.readFileSync(path.join(process.cwd(), 'dist/bundle.css'), 'utf8')
var js = fs.readFileSync(path.join(process.cwd(), 'dist/bundle.js'), 'utf8')
var newCss = purify(js, css, { minify: true })
fs.writeFileSync(path.join(process.cwd(), 'dist/bundle.css'), newCss)

pump(index, hs, out, function (err) {
  if (err) throw err
  var minify = htmlMinifyStream()
  var outstream = fs.createWriteStream(outfile)
  pump(fs.createReadStream(tmpfile), minify, outstream, function (err) {
    if (err) throw err
    fs.unlinkSync(tmpfile)
    process.stdout.write(' done!\n')
  })
})

function htmlMinifyStream () {
  var opts = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    quoteCharacter: '"',
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true
  }
  var decoder = new StringDecoder('utf8')
  var src = ''

  return through(write, flush)

  function write (chunk, _, cb) {
    src += decoder.write(chunk)
    cb()
  }

  function flush (cb) {
    src += decoder.end()
    var res = minhtml(src, opts)
    this.push(res)
    cb()
  }
}
