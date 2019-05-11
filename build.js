#!/usr/bin/env node

var StringDecoder = require('string_decoder').StringDecoder
var hyperstream = require('hyperstream')
var mkdirp = require('mkdirp')
var app = require('./')

mkdirp.sync('dist/')
process.stdout.write('[build.js] Writing HTML to static file…')

var route = '/'
var html = app.toString(route)
hyperstream({ body: { _html: html } })
