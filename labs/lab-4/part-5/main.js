/*
=========================================
DEVELOPER IDENTITY COMMENT BLOCK
=========================================
Project:      Lab 4 - Part 5 Forms Challenge
File:         lab-4/part-5/index.js
Developer:    Jay Lauzon
Date Created: July 25, 2026
Description:  Client-side form validation & submission handler
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");

  form.addEventListener("submit", (event) => {
    // 1. Prevent default page reload on submit
    event.preventDefault();

    // 2. Validate email format if provided
    if (emailInput.value.trim() !== "" && !emailInput.checkValidity()) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    // 3. User feedback confirmation
    const userName = nameInput.value.trim();
    alert(`Thank you for your feedback${userName ? ", " + userName : ""}! Your response has been recorded.`);

    // 4. Reset form fields
    form.reset();
  });
});