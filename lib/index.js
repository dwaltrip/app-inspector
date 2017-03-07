var m = require('mithril');

var Inspector = {
  _count: 0,
  _data: {},
  _keyOrder: {},
  _customViews: {},

  set: function(key, val, viewFn) {
    m.startComputation();
    if (!key in this._data) {
      this._count++;
      this._keyOrder[key] = this._count;
    } 
    this._data[key] = val;
    if (viewFn) {
      assert(typeof viewFn === 'function', 'Inspector.set - The third argument should be a function');
      this._customViews[key] = viewFn;
    }
    m.endComputation();
  },

  delete: function(key) {
    m.startComputation();
    delete this._data[key];
    delete this._keyOrder[key];
    delete this._customViews[key];
    m.endComputation();
  },

  allData: function() {
    var self = this;
    var dataKeys = Object.keys(this._data);
    dataKeys.sort(function(k1,k2) {
      return self._keyOrder[k1] - self._keyOrder[k2]
    });
    return dataKeys.map(function(key) {
      return {
        key: key,
        value: self._data[key],
        view: self._customViews[key]
      };
    });
  },

  clear: function() {
    m.startComputation();
    this._count = 0;
    this._data = {};
    this._keyOrder = {};
    this._customViews = {};
    m.endComputation();
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
    ].filter(function(cls) { return !!cls; });

    classes.forEach(function(cls) {
      rootNode.classList.add(cls);
    });

    this.isCollapsedDefault = typeof opts.isCollapsed !== 'undefined' ?
      !!opts.isCollapsed :
      false;

    document.body.appendChild(rootNode);
    m.mount(rootNode, this.component);
  }
};

Inspector.component = {
  controller: function() {
    var self = this;
    this.isCollapsed = Inspector.isCollapsedDefault;

    this.toggleIsCollapsed = function() {
      self.isCollapsed = !self.isCollapsed;
    };
  },

  view: function(ctrl ) {
    var data = Inspector.allData();
    var isNotCollapsed = !ctrl.isCollapsed;
    var cssClass = isNotCollapsed ? '.is-not-collapsed' : '';

    return m('.ai--debug-display' + cssClass, [
      m('.ai--header-row', [
        m('.ai--header-text.ai--no-font-smoothing', 'App Inspector'),
        m('span.ai--show-hide-btn', {
          onclick: ctrl.toggleIsCollapsed
        }, isNotCollapsed ? 'hide' : 'show')
      ]),
      isNotCollapsed ? m('.ai--data-table', data.map(function(datum) {
        return tableRow([
          tableCell(datum.key),
          tableCell(datum.view ? datum.view(datum.value) : datum.value)
        ]);
      })) : null
    ]);
  }
};

module.exports = Inspector;

function tableRow(content)  { return m('.ai--trow', content); }
function tableCell(content) { return m('.ai--tcell', content); }

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
        throw new Error(message);
    }
    throw message; // Fallback
  }
}
