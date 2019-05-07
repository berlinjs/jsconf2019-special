var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')

var speakerData = require('./speakers.json')
var date = {
  dayOfWeek: 'Thursday',
  time: '7pm',
  date: 'May 30th'
}

css('tachyons')

css`
  .js-yellow { color: #f7df1e }
  .bg-js-yellow { background-color: #f7df1e }
`

var logo = css`
  :host {
    font-size: 4rem;
    text-shadow:
      -1px 1px black,
      -2px 2px black,
      -3px 3px black,
      -4px 4px black;
  }

  @media screen and (min-width: 60em) {
    :host {
      font-size: 12rem;
      text-shadow:
        -3px 3px black,
        -6px 6px black,
        -9px 9px black,
        -12px 12px black;
    }
  }
`

var app = choo()
app.route('/', mainView)
if (module.parent) module.exports = app
else app.mount('body')

function mainView () {
  return html`
    <body class="sans-serif bg-js-yellow">
      ${nav()}
      <main class="ph4">
        ${intro()}
        ${howToProposeATalk()}
        ${speakers()}
        ${codeOfConduct()}
        ${sponsor()}
      </main>
      ${footer()}
    </body>
  `
}

function nav () {
  return html`
    <nav class="pa4 flex flex-column">
      <h1 class="ttu mv0 pl2">
        <span class=${logo}>
          berlin.js
        </span>
      </h1>
      <h2>JSConf EU 2019 special</h2>
      <h3 class="f2 f1-ns b ttu mt0 pt5">
        ${date.dayOfWeek} ${date.date}
        <br class="dn db-l"/>
        ${date.time} at
        <a href="https://goo.gl/maps/u6k4zWKcw5y" class="black link underline">
          co.up
        </a>
      </h3>
    </nav>
  `
}

function speakers () {
  return html`
    <section class="pt4 pt5-ns">
      <div class="mw9 center">
        <h2 class="f3 f2-ns ttu b ma0 bb bw2">
          Featuring amazing speakers
        </h2>
        <section class="lh-copy">
          <div class="cf">
            ${speakerData.map(speaker)}
          </div>
        </section>
      </div>
    </section>
  `
  function speaker (data) {
    return html`
      <article class="pv2 fl w-100 w-third-l pr4-l">
        <h2 class="f4 f3-ns fw6 mb0">
          ${data.name}
        </h2>
        <h3 class="f4 f3-ns fw6 mb0">
          ${data.title}
        </h3>
        <p class="f5 f4-ns measure lh-copy mt0">
          ${data.description}
        </p>
      </article>
    `
  }
}

function intro () {
  return html`
    <section class="mt4 mt5-ns">
      <div class="mw9 center cf">
        <section class="fn fl-l w-100 w-40-l pr4-l">
          <h2 class="f3 f1-ns lh-title fw9 mb3 mt0 pt3 bw2">
            Wait, what's this?
          </h2>
        </section>
        <section class="lh-copy f5 f4-ns fl mt0-l measure">
          Welcome to our <a href="http://2019.jsconf.eu">JSConf EU</a> special, a
          special occasion for the Berlin JavaScript community to mix and mingle
          with people coming to JSConf EU 2019 from all over the world.

          We will have talks and plenty of space to meet new people. See you there?
        </section>
      </div>
    </section>
  `
}

function howToProposeATalk () {
  return html`
    <section class="mt4 mt5-ns">
      <div class="mw9 center cf">
        <section class="fn fl-l w-100 w-40-l pr4-l">
          <h2 class="f3 f1-ns lh-title fw9 mb3 mt0 pt3 bw2">
            How to propose a talk?
          </h2>
        </section>
        <section class="lh-copy f5 f4-ns fl mt0-l measure">
          Glad that you're thinking about giving a talk. To propose a talk, please get in touch with us:
          Open up an issue on <a href="https://github.com/berlinjs/jsconf2019-special" class="black link underline">
          our repo</a>, send us <a href="mailto:submit@berlinjs.org" class="black link underline">an email</a>,
          <a href="https://twitter.com/berlinjs" class="black link underline">tweet at us @berlinjs</a> or find us
          <a href="https://berlinjs-slack.herokuapp.com/" class="black link underline">in our Slack</a>. Anything
          works. We're happy to have you!
        </section>
      </div>
    </section>
  `
}

function codeOfConduct () {
  return html`
    <section class="mt4 mt5-ns">
      <div class="mw9 center cf">
        <section class="fn fl-l w-100 w-40-l pr4-l">
          <h2 class="f3 f1-ns lh-title fw9 mb3 mt0 pt3 bt bw2">
            We care about human beings
          </h2>
        </section>
        <section class="lh-copy f5 f4-ns fl mt0-l measure">
          Our goal is to have an awesome, inclusive and safe community meetup
          where people meet, hang out together, chat, listen to talks, exchange
          ideas and make new friends.

          <strong>
            Any harmful or discriminating behaviour
            will not be tolerated and results in the offending person being
            expelled from the meetup.
          </strong>

          For details on what kinds of behaviour are not tolerated and
          consequences for violating these rules, we refer to the
          <a href="http://rubyberlin.github.io/code-of-conduct" class="black link underline">
            Berlin Code of Conduct.
          </a>
        </section>
      </div>
    </section>
  `
}

function sponsor () {
  return html`
    <section class="mt4 mt5-ns">
      <div class="mw9 center">
        <h2 class="f3 f1-ns lh-title fw9 mb3 mt0 pv3 bt bb bw2">
          Kindly sponsored by
          <a href="http://co-up.de/" class="black link underline">
            co.up community space
          </a>
        </h2>
      </div>
    </section>
  `
}

function footer () {
  return html`
    <footer class="pa4 pv5-l cf">
      <div class="f5 lh-copy fl w-100">
        <div class="fl-ns w-100 w-20-l pr3-m pr4-l underline">
        <a href="http://twitter.com/berlinjs" class="black link dim b">
          We're on Twitter
        </a>
      </div>
      <div class="fl-ns w-100 w-20-l pr3-m pr4-l underline">
        <a href="http://www.meetup.com/Berlin-JS/" class="black link dim b">
          And on Meetup
        </a>
      </div>
      <div class="fl-ns w-100 w-20-l pr3-m pr4-l underline">
        <a href="https://berlinjs-slack.herokuapp.com/" class="black link dim b">
          We also have a Slack
        </a>
      </div>
    </footer>
  `
}
