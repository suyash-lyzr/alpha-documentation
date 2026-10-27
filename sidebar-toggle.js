// A button at the left end of the top bar that hides the sidebar, so the page
// gets the width. It toggles the alpha-sidebar-collapsed class on <html>;
// style.css zeroes the theme's --sidebar-width and widens --content-width
// under it. The choice is remembered in this browser.
// Mintlify loads every .js file in the repo on every page.
(function () {
  var KEY = "alpha-docs-sidebar";
  var CLASS = "alpha-sidebar-collapsed";
  var ICON =
    '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">' +
    '<rect x="1.75" y="2.25" width="12.5" height="11.5" rx="2"/><path d="M6 2.5v11"/></svg>';

  function read() {
    try {
      return localStorage.getItem(KEY) === "collapsed";
    } catch (e) {
      return false;
    }
  }

  function write(collapsed) {
    try {
      localStorage.setItem(KEY, collapsed ? "collapsed" : "open");
    } catch (e) {}
  }

  function label(button, collapsed) {
    var text = collapsed ? "Show sidebar" : "Hide sidebar";
    button.setAttribute("aria-label", text);
    button.setAttribute("title", text);
    button.setAttribute("aria-pressed", collapsed ? "true" : "false");
  }

  function apply(collapsed) {
    document.documentElement.classList.toggle(CLASS, collapsed);
    var button = document.getElementById("alpha-sidebar-toggle");
    if (button) label(button, collapsed);
  }

  function mount() {
    if (document.getElementById("alpha-sidebar-toggle")) return;
    var button = document.createElement("button");
    button.id = "alpha-sidebar-toggle";
    button.type = "button";
    button.innerHTML = ICON;
    button.addEventListener("click", function () {
      var collapsed = !document.documentElement.classList.contains(CLASS);
      write(collapsed);
      apply(collapsed);
    });
    document.body.appendChild(button);
    label(button, document.documentElement.classList.contains(CLASS));
  }

  apply(read());

  function start() {
    mount();
    new MutationObserver(function () {
      if (!document.getElementById("alpha-sidebar-toggle")) mount();
    }).observe(document.body, { childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
