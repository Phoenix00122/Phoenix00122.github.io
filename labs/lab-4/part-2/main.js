/*
Name: Jay Lauzon
File: main.js
Date: July 12, 2026
Description: Lab 4 Part 2 Image Gallery logic using an array of objects, keyboard access, and overlay toggle.
*/

const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// 1. Declare an array of objects for the images and their alt text (matching MDN spec strings)
const images = [
  { filename: "pic1.jpg", alt: "Closeup of a human eye" },
  { filename: "pic2.jpg", alt: "Rock that looks like a wave" },
  { filename: "pic3.jpg", alt: "Purple and white pansies" },
  { filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb" },
  { filename: "pic5.jpg", alt: "Large moth on a leaf" }
];


const baseURL = "images/";

// 2. Define the standalone updateDisplayedImage function
function updateDisplayedImage(e) {
  displayedImage.src = e.target.src;
  displayedImage.alt = e.target.alt;
}

// 3. Loop through the images array to generate thumbnails
for (const image of images) {
  const newImage = document.createElement("img");
  newImage.src = `${baseURL}${image.filename}`;
  newImage.alt = image.alt;


  newImage.tabIndex = 0;

  thumbBar.appendChild(newImage);

  // Click event listener
  newImage.addEventListener("click", updateDisplayedImage);

  // Keyboard event listener (Enter key stretch goal)
  newImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateDisplayedImage(e);
    }
  });
}

// 4. Wire up the Darken/Lighten button using classList and toggle
btn.addEventListener("click", () => {
  if (btn.classList.contains("dark")) {
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else {
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }

  btn.classList.toggle("dark");
});