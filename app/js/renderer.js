let httpCodes = {};

const container = document.getElementById("result");
const grid = document.createElement("div");
grid.classList.add("grid");
container.appendChild(grid);

// Fetch data
fetch("statusCodes.json")
  .then((res) => res.json())
  .then((data) => {
    httpCodes = data;
    displayCodes(Object.values(httpCodes));
  });

// Search bar filtering (with includes)
const input = document.getElementById("codeInput");
input.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const filtered = value
    ? Object.values(httpCodes).filter((item) =>
        String(item.code).includes(value)
      )
    : Object.values(httpCodes);
  displayCodes(filtered);
});

// Display cards
function displayCodes(codes) {
  grid.innerHTML = "";

  if (codes.length === 0) {
    grid.innerHTML =
      '<p style="grid-column: 1 / -1; text-align:center; color:#6b7280;">No status codes found.</p>';
    return;
  }

  codes.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Category
    const category = document.createElement("span");
    category.classList.add("category");
    category.textContent = item.category;

    // Apply color class based on category group
    const group = item.category.toLowerCase();
    if (group.includes("informational"))
      category.classList.add("informational");
    else if (group.includes("success")) category.classList.add("success");
    else if (group.includes("redirection"))
      category.classList.add("redirection");
    else if (group.includes("client")) category.classList.add("client-error");
    else if (group.includes("server")) category.classList.add("server-error");
    else category.classList.add("unknown");

    // Name
    const name = document.createElement("h2");
    name.textContent = `${item.code} - ${item.name}`;

    // Description
    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = item.description;

    // Methods
    const methodsDiv = document.createElement("div");
    methodsDiv.classList.add("methods");
    item.methods.forEach((method) => {
      const badge = document.createElement("span");
      badge.classList.add(method);
      badge.textContent = method;
      methodsDiv.appendChild(badge);
    });

    // Example
    const example = document.createElement("p");
    example.classList.add("example");
    example.textContent = item.example;

    // Append
    card.appendChild(category);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(methodsDiv);
    card.appendChild(example);
    grid.appendChild(card);
  });

  container.classList.remove("hidden");
}

// Add enter key filter functionality
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = e.target.value.trim();
    const filtered = value
      ? Object.values(httpCodes).filter((item) =>
          String(item.code).includes(value)
        )
      : Object.values(httpCodes);
    displayCodes(filtered);
  }
});
