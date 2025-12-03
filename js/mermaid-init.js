// mermaid.initialize({ startOnLoad: true });

// window.addEventListener("DOMContentLoaded", () => {
// mermaid.initialize({ startOnLoad: true });
// });

document.addEventListener("DOMContentLoaded", function () {
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: true });
    mermaid.run();
  }
});