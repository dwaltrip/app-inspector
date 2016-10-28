var m = require('mithril');
var Inspector = require('../app-state-inspector');

var App = {
  controller: function() {
    var self = this;
    this.num = 1;
    this.increment = function() { self.num++; }
    this.decrement = function() { self.num--; }
  },
  view: function(ctrl) {
    Inspector.set('number', ctrl.num);
    Inspector.set('fizz', ctrl.num % 3 === 0);
    Inspector.set('buzz', ctrl.num % 5 === 0);
    Inspector.set('fizz-buzz', ctrl.num % 15 === 0);

    return m('.demo-app', [
      m('h1', 'Fizz Buzz'),
      m('.button-row', [
        m('.btn', { onclick: ctrl.increment }, 'plus 1'),
        m('.btn', { onclick: ctrl.decrement }, 'minus 1')
      ])
    ]);
  }
};

m.mount(document.body, App);
Inspector.mount();
