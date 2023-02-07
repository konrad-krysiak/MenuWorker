/* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */

// // All following functions will be loaded and available in html files

// // WRITERS
// const writeToCategoryModal = (name) => {
//   document.querySelector("#categoryModal #category-name").value = name;
// };

// const writeToProductModal = (modalTitle, name, price, description) => {
//   document.querySelector("#productModal .modal-title").innerHTML = modalTitle;
//   document.querySelector("#productModal #product-name").value = name;
//   document.querySelector("#productModal #product-price").value = price;
//   document.querySelector("#productModal #product-description").value = description;
// };

// // OPENERS
// const openCategoryModal = () => {
//   document.querySelector('[data-bs-target="#categoryModal"]').click();
// };

// const openProductModal = () => {
//   document.querySelector('[data-bs-target="#productModal"]').click();
// };

// const openDeleteModal = () => {
//   document.querySelector('[data-bs-target="#deleteModal"]').click();
// };

// // ACTION SETTERS
// const setCategoryModalFormAction = (action) => {
//   document.querySelector("#categoryModal form").action = action;
// };

// const setProductModalFormAction = (action) => {
//   document.querySelector("#productModal form").action = action;
// };

// const setDeleteModalFormAction = (action) => {
//   document.querySelector("#deleteModal form").action = action;
// };

// const test = () => {
//   alert(5);
// };
// const test2 = () => {
//   alert(1);
// };

// export { test, test2 };

export function getTriggerData(event) {
  const button = event.relatedTarget;
  const role = button.dataset.role;
  return { button, role };
}

export function getCategoryItemData(innerElement) {
  return {
    categoryId: innerElement.closest(".category-item").dataset.categoryid,
    categoryName: innerElement.closest(".category-item__header").querySelector("#category-name").textContent.trim(),
  };
}

export function writeToCategoryModal(modalTitle, categoryNameInput, categoryFormAction) {
  document.querySelector("#categoryModal .modal-title").innerHTML = modalTitle;
  document.querySelector("#categoryModal #category-name").value = categoryNameInput;
  document.querySelector("#categoryModal form").action = categoryFormAction;
}

export function getProductItemData(innerElement) {
  const cardBody = innerElement.closest(".card-body");
  return {
    productName: cardBody.querySelector(".card-title").textContent.trim(),
    productPrice: cardBody.querySelector(".card-subtitle").textContent.trim(),
    productDescription: cardBody.querySelector(".card-text").textContent.trim(),
    productId: cardBody.closest(".card").dataset.productid,
    categoryId: innerElement.closest(".category-item").dataset.categoryid,
  };
}

export function getProductCategoryId(innerElement) {
  return innerElement.closest(".category-item").dataset.categoryid;
}

export function writeToProductModal(
  modalTitle,
  productNameInput,
  productPriceInput,
  productDescriptionInput,
  productFormAction,
  categoryId
) {
  document.querySelector("#productModal .modal-title").innerHTML = modalTitle;
  document.querySelector("#productModal #product-name").value = productNameInput;
  document.querySelector("#productModal #product-price").value = productPriceInput;
  document.querySelector("#productModal #product-description").value = productDescriptionInput;
  document.querySelector("#productModal form").action = productFormAction;
  if (categoryId) {
    document.querySelector("#productModal form input[name=categoryId]").value = categoryId;
  }
}

export function addMethodOverride(element, method) {
  const methodOverrideInput = document.createElement("input");
  methodOverrideInput.type = "hidden";
  methodOverrideInput.name = "_method";
  methodOverrideInput.value = method;
  element.querySelector("form").appendChild(methodOverrideInput);
}

export function removeMethodOverride(element) {
  const methodOverrideInput = element.querySelector("form input[name=_method]");
  console.log(methodOverrideInput);
  if (methodOverrideInput) {
    methodOverrideInput.remove();
  }
}
export function addMethodOverrideToCategoryModal(method) {
  addMethodOverride(document.querySelector("#categoryModal"), method);
}

export function removeMethodOverrideFromCategoryModal() {
  removeMethodOverride(document.querySelector("#categoryModal"));
}

export function addMethodOverrideToProductModal(method) {
  addMethodOverride(document.querySelector("#productModal"), method);
}

export function removeMethodOverrideFromProductModal() {
  removeMethodOverride(document.querySelector("#productModal"));
}

export function toggleCategoryModal() {
  const myModal = new bootstrap.Modal(document.getElementById("categoryModal"), {});
  myModal.toggle();
}

export function toggleProductModal() {
  const myModal = new bootstrap.Modal(document.getElementById("productModal"), {});
  myModal.toggle();
}

export function writeToDeleteModal(modalTitle, modalBody, deleteFormAction) {
  document.querySelector("#deleteModal .modal-title").innerHTML = modalTitle;
  document.querySelector("#deleteModal .modal-body").innerHTML = modalBody;
  document.querySelector("#deleteModal form").action = deleteFormAction;
}
