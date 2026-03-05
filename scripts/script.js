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
    // cateBtn.innerHTML = `

    // <button id="cateTreesBtn" class="btn btn-soft btn-success w-full">
    //           ${category.category_name}
    // </button>

    // `;
    categoriesContainers.appendChild(cateBtn);
  });
};

const loadTrees = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
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
                  <h2 class="font-bold text-xl text-success">${tree.price}</h2>
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
