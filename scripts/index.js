"use strict";

let shareButton = document.getElementById("share-button")
shareButton.addEventListener("click", function() {
    let articleInteractive = document.getElementById("article-interactive");
    articleInteractive.toggleAttribute("data-sharing");
});