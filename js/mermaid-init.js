document.addEventListener("DOMContentLoaded", function() {
    if (typeof mermaid !== "undefined") {
        mermaid.initialize({
            startOnLoad: true,
            theme: "default"     // możesz zmienić na "forest", "dark", etc.
        });
    }
});




// mermaid.initialize({ startOnLoad: true });



// window.addEventListener("DOMContentLoaded", () => {
// mermaid.initialize({ startOnLoad: true });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   if (window.mermaid) {
//     mermaid.initialize({ startOnLoad: true });
//     mermaid.run();
//   }
// });
