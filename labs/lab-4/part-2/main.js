/*
Name: Jay Lauzon
File: main.js
Date: July 8, 2026
Description: Lab 4 Part 2 Image Gallery logic for thumbnail generation and overlay toggle.
*/

const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// Solution to Part 2
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];

// Declare the alt text for each image
const altText = {
    "pic1.jpg": "Closeup of a human eye",
    "pic2.jpg": "Rock that looks like a wave",
    "pic3.jpg": "Purple and white pansies",
    "pic4.jpg": "Section of wall from an Ancient Egyptian tomb",
    "pic5.jpg": "Large moth on a leaf"
};

// Looping through images
for (const image of images) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", `images/${image}`);
    newImage.setAttribute("alt", altText[image]);
    thumbBar.appendChild(newImage);

    // Add a click listener to each thumbnail image
    newImage.addEventListener("click", (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
} // <--- THIS BRACKET WAS MISSING! Closing the for...of loop here.

// Wiring up the Darken/Lighten button
btn.addEventListener("click", () => {
    const btnClass = btn.getAttribute("class");

    if (btnClass === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
});