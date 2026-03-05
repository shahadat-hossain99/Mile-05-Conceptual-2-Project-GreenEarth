console.log("Hi from shahadat");

const loadingSpinner = document.getElementById("loadingSpinner");

const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  treesContainer.innerHTML = "";
};
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");

  //   treesContainer.innerHTML = "";
};

const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  //   console.log(res);
  //   console.log(data);
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoriesContainers = document.getElementById("categoriesContainer");
  categoriesContainers.innerHTML = "";

  categories.forEach((category) => {
    // console.log(category);
    const cateBtn = document.createElement("button");
    cateBtn.className = "btn btn-soft btn-success w-full";
    cateBtn.textContent = category.category_name;
    cateBtn.onclick = () => {
      selectCategory(category.id, cateBtn);
    };
    // cateBtn.innerHTML = `

    // <button id="cateTreesBtn" class="btn btn-soft btn-success w-full">
    //           ${category.category_name}
    // </button>

    // `;
    categoriesContainers.appendChild(cateBtn);
  });
};

const selectCategory = async (categoryId, btn) => {
  console.log(categoryId, btn);
  showLoading();

  const allButtons = document.querySelectorAll(
    "#categoriesContainer button,#allTreesBtn",
  );

  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-soft");
  });

  btn.classList.add("btn-success");
  btn.classList.remove("btn-soft");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json();
  console.log(data);
  displayTrees(data.plants);

  hideLoading();
};

const loadTrees = async () => {
  showLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideLoading();
  displayTrees(data.plants);

  //   displayTrees(data);
};

const displayTrees = (trees) => {
  const treesContainer = document.getElementById("treesContainer");
  //   treesContainer.innerHTML = "";

  console.log(trees);

  trees.forEach((tree) => {
    console.log(tree);
    const treeCard = document.createElement("div");
    treeCard.innerHTML = `
    
    <div class="card bg-white shadow-sm">
              <figure>
                <img
                  src="${tree.image}"
                  alt="${tree.name}"
                  title="${tree.name}"
                  class="h-48 w-full object-cover"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title text-success">${tree.name}</h2>
                <p class="line-clamp-2">
                  ${tree.description}
                </p>
                <div class="badge badge-outline badge-success">${tree.category}</div>

                <div class="card-actions justify-between items-center">
                  <h2 class="font-bold text-xl text-success">$ ${tree.price}</h2>
                  <button class="btn btn-success">Buy Now</button>
                </div>
              </div>

            </div>
    `;

    treesContainer.appendChild(treeCard);
  });
};

// displayCategories();
loadTrees();
loadCategories();
