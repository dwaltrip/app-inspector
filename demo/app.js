var m = require('mithril');
var AppInspector = require('../app-inspector');

var App = {
  controller: function() {
    var self = this;
    this.num = 1;
    this.increment = function() { self.num++; }
    this.decrement = function() { self.num--; }
  },
  view: function(ctrl) {
    AppInspector.set('number', ctrl.num);
    AppInspector.set('fizz', ctrl.num % 3 === 0);
    AppInspector.set('buzz', ctrl.num % 5 === 0);
    AppInspector.set('fizz-buzz', ctrl.num % 15 === 0);

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
AppInspector.mount();
