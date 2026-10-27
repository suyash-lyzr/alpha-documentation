// The top-right corner: a Changelog link and an "Ask AI" pill that opens
// Mintlify's assistant by clicking the theme's own assistant button
// (#assistant-entry, the sparkle beside search), so the panel and its state
// stay Mintlify's. Both hide while the panel is open, so they never cover its
// close button. Mintlify loads every .js file in the repo on every page;
// style.css styles them.
(function () {
  var SPARKLE =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
    '<path fill="currentColor" d="M8 0.8c.35 2.9 1.5 4.6 3.4 5.6 1 .5 2.1.8 3.4.9-1.3.1-2.4.4-3.4.9C9.5 9.2 8.4 10.9 8 13.8 7.6 10.9 6.5 9.2 4.6 8.2 3.6 7.7 2.5 7.4 1.2 7.3c1.3-.1 2.4-.4 3.4-.9C6.5 5.4 7.6 3.7 8 .8z"/>' +
    '<path fill="currentColor" opacity=".7" d="M13 10.6c.15 1.1.6 1.8 1.8 2.1-1.2.3-1.65 1-1.8 2.1-.15-1.1-.6-1.8-1.8-2.1 1.2-.3 1.65-1 1.8-2.1z"/>' +
    "</svg>";

  var watched = null;

  function sync(bar) {
    var sheet = document.getElementById("chat-assistant-sheet");
    var open = !!sheet && sheet.getBoundingClientRect().width > 0;
    bar.hidden = open;
    var ask = document.getElementById("alpha-ask-ai");
    if (ask) ask.hidden = !document.getElementById("assistant-entry");
    if (sheet && sheet !== watched && window.ResizeObserver) {
      watched = sheet;
      new ResizeObserver(function () {
        sync(bar);
      }).observe(sheet);
    }
  }

  function mount() {
    var bar = document.getElementById("alpha-top-actions");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "alpha-top-actions";

      var changelog = document.createElement("a");
      changelog.id = "alpha-changelog-link";
      changelog.href = "/changelog";
      changelog.textContent = "Changelog";

      var button = document.createElement("button");
      button.id = "alpha-ask-ai";
      button.type = "button";
      button.setAttribute("aria-label", "Ask AI about the Alpha docs");
      button.innerHTML = SPARKLE + "<span>Ask AI</span><kbd>⌘I</kbd>";
      button.addEventListener("click", function () {
        var entry = document.getElementById("assistant-entry");
        if (entry) entry.click();
      });

      bar.appendChild(changelog);
      bar.appendChild(button);
      document.body.appendChild(bar);
    }
    sync(bar);
  }

  function start() {
    mount();
    new MutationObserver(function () {
      if (!document.getElementById("alpha-top-actions") || !watched) mount();
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
