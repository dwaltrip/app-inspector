## App Inspector

A simple overlay panel that gives a live view into the application state. The goal is to make it quicker easier to find the problematic logic when your app isn't behaving as you expected.

App Inspector was designed to work well with mithril.js apps.

## Usage

#### Install

    > npm install --save-dev app-inspector

Include the file `app-inspector.css` when developing.

#### Configure

```javascript
// init.js
import m from 'mithril';
import App from 'app';

m.mount(document.body, App);

import AppInspector from 'app-inspector'
AppInspector.mount();
```

#### Usage

```javascript
// app.js
import m from 'mithril';
import AppInspector from 'app-inspector'

export default {
  controller: function() {
    this.num = 1;
    var self = this;
    this.increment = function() { this.num++; }
    this.decrement = function() { this.num--; }
  },
  view: function(ctrl) {
    AppInspector.set('number', ctrl.num);
    AppInspector.set('fizz',      ctrl.num % 3 === 0);
    AppInspector.set('buzz',      ctrl.num % 5 === 0);
    AppInspector.set('fizz-buzz', ctrl.num % 15 === 0);

    return m('div', [
      m('h1', 'Fizz Buzz'),
      m('.button-row', [
        m('button', { onclick: ctrl.increment }, 'plus 1'),
        m('button', { onclick: ctrl.decrement }, 'minus 1')
      ])
    ]);
  }
};
```

## Documentation

### AppInspector.set(key, value)

Add (or replace) a row in the overlay panel. `key` must be a unique string. This method will overwrite any previous value stored at the same `key`.

### AppInspector.delete(key)

Remove a row from the overlay panel.

### AppInspector.clear()

Clear all rows.

### AppInspector.mount([opts])

Mount the overlay panel onto the DOM. This should be called only once, when the application loads.

*__opts__* (not required)

```
topRight: Bool | topLeft: Bool | bottomLeft: Bool | bottomRight: Bool
  Specifies the placement of the overlay panel in the viewport. topRight is the default.
  These are mutually exclusive. The panel can only be in one corner at a time.
```

## Run the demo

    > cd node_modules/app-inspector
    > npm install
    > npm run build:demo

Then you can open _demo/index.html_ in your browser. You should see something similar to the screenshot below

![App Inspector demo](docs/demo-screenshot.png)
