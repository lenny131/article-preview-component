"use strict";

let isSharing = false; // This is for the window resizing event performance.
const shareButton = document.getElementById("share-button")
const articleInteractive = document.getElementById("article-interactive");

shareButton.addEventListener("click", function() {
    // Mobile layout replaces author details with sharing controls.
    // Other layouts display popup with sharing controls.
    if (window.matchMedia("(min-width: 48em)").matches) {
        // Tablet and Desktop layouts
        const popup = document.getElementById("share-popup");
        if (popup === null) {
            // Popup is not currently open, so open new one.
            const newPopup = document.createElement("div");
            newPopup.id = "share-popup";
            newPopup.classList.add("article-share-popup");
            newPopup.innerHTML =
                `<div class="article-share">
                    <p>SHARE</p>
                    <ul>
                        <li><a href="#"><img src="images/icon-facebook.svg" alt="Facebook" width="20" height="20" /></a></li>
                        <li><a href="#"><img src="images/icon-twitter.svg" alt="Twitter" width="20" height="17" /></a></li>
                        <li><a href="#"><img src="images/icon-pinterest.svg" alt="Pinterest" width="20" height="20" /></a></li>
                    </ul>
                </div>
                <div class="article-share-tail"></div>`;
            document.body.appendChild(newPopup);

            // Get the current position of the share button.
            // The sharing popup will be displayed above the share button.
            const shareButtonBounds = shareButton.getBoundingClientRect();
            const newPopupBounds = newPopup.getBoundingClientRect();
            newPopup.style.top = (window.scrollY + shareButtonBounds.top - newPopupBounds.height - 20) + "px";
            newPopup.style.left = (shareButtonBounds.left + (shareButtonBounds.width / 2) - (newPopupBounds.width / 2)) + "px";
            articleInteractive.setAttribute("data-sharing-popup", "");
            isSharing = true;
        }
        else {
            // Popup is already open, so close it.
            popup.remove();
            articleInteractive.removeAttribute("data-sharing-popup");
            isSharing = false;
        }
    }
    else {
        // Mobile Layout
        articleInteractive.toggleAttribute("data-sharing");
        isSharing = articleInteractive.hasAttribute("data-sharing");
    }
});

window.addEventListener("resize", function() {
    // This event will be called for each increment of window resizing.
    // For better performance, if sharing controls are not currently visible, then don't do anything.
    // Easier to check boolean value than to search dom.
    if (isSharing) { 
        articleInteractive.removeAttribute("data-sharing");
        articleInteractive.removeAttribute("data-sharing-popup");
        const popup = document.getElementById("share-popup");
        if (popup !== null) {
            popup.remove();
        }
        isSharing = false;
    }
});