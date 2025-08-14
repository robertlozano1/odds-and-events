// === State ===
// Arrays holding our numbers
let bank = [];
let odds = [];
let evens = [];

// === Root Container ===
// A single <div> where our entire app lives
const $root = document.createElement("div");
document.body.appendChild($root);

// === COMPONENT: Form to Add a Number ===
function NumberForm() {
  const $form = document.createElement("form");

  // Add accessible label + input + button
  $form.innerHTML = `
    <h1>Odds and Events</h1>  
    <label>
      Add a number to the bank:
      <input 
        name="newNumber" 
        type="number" 
        min="0"
        required 
      />
    </label>
  `;

  // Add number button
  const $addBtn = document.createElement("button");
  $addBtn.type = "submit";
  $addBtn.textContent = "Add number";

  // Create sort buttons
  const $sortOne = document.createElement("button");
  $sortOne.type = "button";
  $sortOne.textContent = "Sort 1";
  $sortOne.style.marginLeft = "0.5em";
  $sortOne.addEventListener("click", () => {
    if (bank.length === 0) return;
    const num = bank.shift();
    if (num % 2 === 0) evens.push(num);
    else odds.push(num);
    render();
  });

  const $sortAll = document.createElement("button");
  $sortAll.type = "button";
  $sortAll.textContent = "Sort All";
  $sortAll.style.marginLeft = "0.5em";
  $sortAll.addEventListener("click", () => {
    while (bank.length > 0) {
      const num = bank.shift();
      if (num % 2 === 0) evens.push(num);
      else odds.push(num);
    }
    render();
  });

  // Button container
  const $btnRow = document.createElement("span");
  $btnRow.style.display = "inline-flex";
  $btnRow.style.gap = "0.5em";
  $btnRow.append($addBtn, $sortOne, $sortAll);

  $form.appendChild($btnRow);

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Number($form.elements.newNumber.value);
    if (!isNaN(value)) {
      bank.push(value);
      $form.reset();
      render();
    }
  });

  return $form;
}

// === COMPONENT: List Display ===
function NumberList(title, list) {
  const $section = document.createElement("section");

  // Section heading (e.g., "Bank", "Odds", "Evens")
  const $heading = document.createElement("h2");
  $heading.textContent = title;
  $section.appendChild($heading);

  // Read-only input showing numbers
  const $input = document.createElement("input");
  $input.type = "text";
  $input.readOnly = true;
  $input.style.width = "98%";
  $input.style.fontSize = "1.2em";
  $input.style.marginBottom = "1em";
  $input.value = list.join(" ");
  $section.appendChild($input);

  return $section;
}

// === COMPONENT: Sort Buttons ===
function SortButtons() {
  const $wrapper = document.createElement("div");
  $wrapper.style.margin = "1em 0";

  // Button to move one number
  const $sortOne = document.createElement("button");
  $sortOne.textContent = "Sort 1";
  $sortOne.addEventListener("click", () => {
    if (bank.length === 0) return; // nothing to sort
    const num = bank.shift(); // remove first item
    if (num % 2 === 0) evens.push(num);
    else odds.push(num);
    render(); // update the UI
  });

  // Button to move all numbers
  const $sortAll = document.createElement("button");
  $sortAll.textContent = "Sort All";
  $sortAll.style.marginLeft = "0.5em";
  $sortAll.addEventListener("click", () => {
    while (bank.length > 0) {
      const num = bank.shift();
      if (num % 2 === 0) evens.push(num);
      else odds.push(num);
    }
    render();
  });

  $wrapper.append($sortOne, $sortAll);
  return $wrapper;
}

// === RENDER FUNCTION ===
function render() {
  // 1. Clear previous content
  $root.textContent = "";

  // 2. Append fresh components
  $root.append(
    NumberForm(),
    NumberList("Bank", bank),
    NumberList("Odds", odds),
    NumberList("Evens", evens)
  );
}

// === INITIALIZE APP ===
// Wait for the HTML to load, then render our app
document.addEventListener("DOMContentLoaded", render);
