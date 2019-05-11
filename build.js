#!/usr/bin/env node

const hyperstream = require('hyperstream')
const mkdirp = require('mkdirp')
const app = require('./')

mkdirp.sync('dist/')
process.stdout.write('[build.js] Writing HTML to static file…')

const route = '/'
const html = app.toString(route)
hyperstream({ body: { _html: html } })
