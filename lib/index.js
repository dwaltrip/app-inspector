import m from 'mithril';

import { getStyles, addStylesheetRules } from 'styles';

var AppInspector = {
  _count: 0,
  _data: {},
  _keyOrder: {},

  set: function(key, val) {
    if (!key in this._data) {
      this._count++;
      this._keyOrder[key] = this._count;
    } 
    this._data[key] = val;
  },

  delete: function(key) {
    delete this._data[key];
    delete this._keyOrder[key];
  },

  allData: function() {
    var dataKeys = Object.keys(this._data);
    dataKeys.sort((k1,k2) => this._keyOrder[k1] - this._keyOrder[k2]);
    return dataKeys.map(key => ({ key, value: this._data[key] }));
  },

  clear: function() {
    this._count = 0;
    this._data = {};
    this._keyOrder = {};
  },

  mount: function(opts) {
    var opts = opts || {};
    var rootNode = this.rootNode = document.createElement('div');

    rootNode.classList.add('ai--app-inspector');
    rootNode.classList.add('ai--font-smoothing');

    if (!(opts.topLeft || opts.topRight || opts.bottomLeft || opts.bottomRight)) {
      opts.topRight = true;
    }
    var classes = [
      (opts.topLeft     || opts.topRight)     ? 'is-top' : null,
      (opts.topLeft     || opts.bottomLeft)   ? 'is-left' : null,
      (opts.topRight    || opts.bottomRight)  ? 'is-right' : null,
      (opts.bottomLeft  || opts.bottomRight)  ? 'is-bottom' : null
    ].filter(cls => !!cls);
    classes.forEach(cls => rootNode.classList.add(cls));

    document.body.appendChild(rootNode);
    addStylesheetRules(getStyles());
    m.mount(rootNode, this.component);
  }
};

AppInspector.component = {
  controller: function() {
    this.isVisible = m.prop(false);
  },

  view: function(ctrl ) {
    var data = AppInspector.allData();
    var isVisible = ctrl.isVisible();

    return m('.ai--debug-display', [
      m('.ai--header-row', [
        m('.ai--header-text.ai--no-font-smoothing', 'App Inspector'),
        m('span.ai--show-hide-btn', {
          onclick: ()=> ctrl.isVisible(!isVisible)
        }, isVisible ? 'hide' : 'show')
      ]),
      isVisible ? m('.ai--data-table', data.map(datum => tableRow([
        tableCell(datum.key),
        tableCell(datum.value)
      ]))) : null
    ]);
  }
};

export default AppInspector;

function tableRow(content)  { return m('.ai--trow', content); }
function tableCell(content) { return m('.ai--tcell', content); }
