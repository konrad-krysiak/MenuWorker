import * as VF from "/helpers/viewFunctions.js";
console.log(VF);

document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);
    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show-nav");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  // const linkColor = document.querySelectorAll(".nav_link");

  // function colorLink() {
  //   if (linkColor) {
  //     linkColor.forEach((l) => l.classList.remove("active"));
  //     this.classList.add("active");
  //   }
  // }
  // linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready

  // MENU EDITOR MODAL HANDLERS
  const categoryModal = document.getElementById("categoryModal");
  categoryModal.addEventListener("show.bs.modal", function (event) {
    const { button, role } = VF.getTriggerData(event);
    if (role === "edit-category") {
      const { categoryId, categoryName } = VF.getCategoryItemData(button);
      VF.writeToCategoryModal("Edit Category", categoryName, "/dashboard/categories/" + categoryId);
      VF.removeMethodOverride(this);
      VF.addMethodOverride(this, "PUT");
    } else if (role === "add-category") {
      VF.writeToCategoryModal("New Category", "", "/dashboard/categories/new");
      VF.removeMethodOverride(this);
    }
  });

  categoryModal.addEventListener("hidden.bs.modal", function (event) {
    const modalAlert = categoryModal.querySelector("#modal-alert");
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
  });

  const productModal = document.getElementById("productModal");
  productModal.addEventListener("show.bs.modal", function (event) {
    const { button, role } = VF.getTriggerData(event);

    if (role === "edit-product") {
      const { productName, productPrice, productDescription, productId, categoryId } = VF.getProductItemData(button);
      VF.writeToProductModal(
        "Edit Product",
        productName,
        productPrice,
        productDescription,
        "/dashboard/products/" + productId,
        categoryId
      );
      VF.removeMethodOverride(this);
      VF.addMethodOverride(this, "PUT");
    } else if (role === "add-product") {
      const categoryId = VF.getProductCategoryId(button);
      VF.writeToProductModal("New Product", "", "", "", "/dashboard/products/new", categoryId);
      VF.removeMethodOverride(this);
    }
  });

  productModal.addEventListener("hidden.bs.modal", function (event) {
    const modalAlert = productModal.querySelector("#modal-alert");
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
  });

  const deleteModal = document.getElementById("deleteModal");
  deleteModal.addEventListener("show.bs.modal", function (event) {
    const { button, role } = VF.getTriggerData(event);

    if (role === "delete-product") {
      const { productName, productId } = VF.getProductItemData(button);
      VF.writeToDeleteModal(
        "Delete Product",
        "Are you sure you want to delete " + productName + "?",
        "/dashboard/products/" + productId
      );
    } else if (role === "delete-category") {
      const { categoryName, categoryId } = VF.getCategoryItemData(button);
      VF.writeToDeleteModal(
        "Delete Category",
        "Are you sure you want to delete " + categoryName + "?<br />All products will be lost.",
        "/dashboard/categories/" + categoryId
      );
    }
  });
  // MENU EDITOR MODAL HANDLERS END
});
