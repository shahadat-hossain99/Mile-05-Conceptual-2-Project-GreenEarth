// console.log("Hi from shahadat");

let cart = [];

const loadingSpinner = document.getElementById("loadingSpinner");
const treeDetailModal = document.getElementById("tree-detail-modal");

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
const allTreesBtn = document.getElementById("allTreesBtn");

allTreesBtn.addEventListener("click", () => {
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button,#allTreesBtn",
  );

  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-soft");
  });

  allTreesBtn.classList.add("btn-success");
  allTreesBtn.classList.remove("btn-soft");

  loadTrees();
});

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
  treesContainer.innerHTML = "";

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
                  class="h-48 cursor-pointer w-full object-cover"
                  onclick="displayTreeModal(${tree.id})"
                   
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title hover:text-blue-500 cursor-pointer text-success" onclick="displayTreeModal(${tree.id})">${tree.name}</h2>
                <p class="line-clamp-2">
                  ${tree.description}
                </p>
                <div class="badge badge-outline badge-success">${tree.category}</div>

                <div class="card-actions justify-between items-center">
                  <h2 class="font-bold text-xl text-success">$ ${tree.price}</h2>
                  <button onclick="addToCart(${tree.id},'${tree.name}',${tree.price})" class="btn btn-success" >Buy</button>
                </div>
              </div>

            </div>
    `;

    treesContainer.appendChild(treeCard);
  });
};

const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

const displayTreeModal = async (treeId) => {
  console.log(treeId, "treeId");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  console.log(data, "data");
  const plantDetails = data.plants;
  console.log(plantDetails, "data");

  modalTitle.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategory.textContent = plantDetails.category;
  modalDescription.textContent = plantDetails.description;
  modalPrice.textContent = plantDetails.price;

  treeDetailModal.showModal();
};

const addToCart = (Id, Name, Price) => {
  console.log(Id, Name, Price, "Add to Cart");

  const existingItem = cart.find((item) => item.Id === Id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      Id,
      Name,
      Price,
      quantity: 1,
    });
  }
  updateCart();
};
const cartContainer = document.getElementById("cartContainer");
let totalPrice = document.getElementById("totalPrice");

const updateCart = () => {
  cartContainer.innerHTML = "";

  let total = 0;
  console.log(cart);
  cart.forEach((item) => {
    total += item.Price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "card card-body bg-gray-100 shadow-xl";
    cartItem.innerHTML = `
    
     
                <div class="flex justify-between items-center">
                  <div>
                    <h2>${item.Name}</h2>
                    <p>$ ${item.Price} X ${item.quantity}</p>
                  </div>
                  <button onclick="removeFromCart(${item.Id})" class="btn btn-ghost">x</button>
                </div>
                <p class="text-right font-semibold text-xl">$ ${item.Price * item.quantity}</p>
    
    
    `;

    cartContainer.appendChild(cartItem);
  });

  totalPrice.innerText = `$ ${total}`;
};

const removeFromCart = (treeId) => {
  console.log(treeId);
  const updatedCartElements = cart.filter((item) => item.Id != treeId);
  cart = updatedCartElements;
  updateCart();
};

// displayCategories();
loadTrees();
loadCategories();
