
function addStylesheetRules(rules) {
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  rules.forEach(rule => styleSheet.insertRule(rule, styleSheet.cssRules.length));
}

function getStyles() {
  var styles = `
    .ai--app-inspector {
      color: white;
      background-color: #444;
      border: 2px solid #222;
      opacity: .93;
      position: absolute;
    }
    .ai--app-inspector.is-top    { top: 0;     border-top: none; }
    .ai--app-inspector.is-bottom { bottom: 0;  border-bottom: none; }
    .ai--app-inspector.is-right  { right: 0;   border-right: none; }
    .ai--app-inspector.is-left   { left: 0;    border-left: none; }
    .ai--app-inspector .ai--debug-display .ai--header-row {
      font-size: 15px;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ai--app-inspector .ai--header-text {
      color: #eee;
      -webkit-font-smoothing: auto;
      -moz-font-smoothing: auto;
      -o-font-smoothing: auto;
    }
    .ai--app-inspector .ai--show-hide-btn {
      border: 1px solid #222;
      border-radius: 4px;
      padding: 2px;
      text-align: center;
      min-width: 38px;
      background-color: #555;
      margin-left: 10px;
      user-select: none;
    }
    .ai--app-inspector .ai--show-hide-btn:hover {
      cursor: hand;
      background-color: #666;
    }
    .ai--app-inspector .ai--data-table {
      display: table;
      border-collapse: collapse;
      font-size: 14px;
    }
    .ai--app-inspector .ai--trow { display: table-row }
    .ai--app-inspector .ai--tcell {
      display: table-cell;
      padding: 5px 7px;
    }    
    .ai--app-inspector .ai--trow              { border-top:   1px solid #999; }
    .ai--app-inspector .ai--tcell:first-child { border-right: 1px solid #999; }

    .ai--no-font-smoothing {
      -webkit-font-smoothing: auto;
      -moz-font-smoothing: auto;
      -o-font-smoothing: auto;
    }
    .ai--font-smoothing {
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -o-font-smoothing: antialiased;
    }
  `;
  return styles.split('}').filter(rule => !!rule.trim()).map(rule => `${rule}}`.trim());
}

export { getStyles, addStylesheetRules };
