import { tools } from "./tools.js";

const results = document.querySelector(".results");
const filterButtons = document.querySelectorAll(".filter button");
const filterSelect = document.querySelector("select");

renderCards();
addEventListeners();

filterSelect.addEventListener("click", (e) => {
  const filter = e.target.value;
  if (filter !== "") {
    if (filter === "all") {
      renderCards(tools);
    } else {
      const cards = tools.filter(
        (tool) => filter === tool.category.toLowerCase()
      );
      renderCards(cards);
    }
  }
});

function addEventListeners() {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", filterResults);
    btn.addEventListener("click", toggleActiveClass);
  });
}

function toggleActiveClass(e) {
  filterButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
}

function filterResults(e) {
  const filter = e.target.textContent.toLowerCase();
  if (filter !== "") {
    if (filter === "all") {
      renderCards(tools);
    } else {
      const cards = tools.filter(
        (tool) => filter === tool.category.toLowerCase()
      );
      renderCards(cards);
    }
  }
}

function renderCards(cards = tools) {
  let markup = "";
  for (let i = 0; i < cards.length; i++) {
    const { name, description, category, image, url } = cards[i];
    markup += `
      <div class="card">
      <div class="card-header">
        <img class="card-image" src="./images/${image}" alt="${name}" />
      </div>
      <div class="card-body">
        <h2 class="card-title">${name}</h2>
        <p class="card-text">${description}
        </p>
      </div>
      <div class="card-footer">
        <span class="category">${category}</span>
        <a href="${url}" target="_blank"
          ><img src="./images/icon-arrow.png" alt="Link"
        /></a>
      </div>
    </div>
      `;
  }

  results.innerHTML = "";
  results.insertAdjacentHTML("beforeend", markup);
}
