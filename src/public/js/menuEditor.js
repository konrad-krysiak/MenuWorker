import * as VF from "../../helpers/viewFunctions.js";

document.addEventListener("DOMContentLoaded", function () {
  // Image Upload
  const imageInput = document.getElementById("productImageInput");
  const imageOutput = document.getElementById("productImageOutput");
  const imageOutputImgElement = imageOutput.querySelector("img");
  const imageOutputCloseSpan = imageOutput.querySelector("span");

  function removeImage() {
    imageOutputImgElement.src = "";
    imageOutput.style.display = "none";
    imageInput.value = imageInput.defaultValue;
  }

  imageInput.addEventListener("change", function () {
    imageOutput.style.display = "block";
    const file = this.files;
    imageOutputImgElement.src = URL.createObjectURL(file[0]);
  });

  imageOutputCloseSpan.addEventListener("click", removeImage);
  // Image Upload End

  const categoryModal = document.getElementById("categoryModal");
  categoryModal.addEventListener("show.bs.modal", function (event) {
    // If modal was toggled on page load(validation error case)
    // we are handling it manually
    if (!event.relatedTarget) return;
    const { button, role } = VF.getTriggerData(event);
    if (role === "edit-category") {
      const { categoryId, categoryName } = VF.getCategoryItemData(button);
      VF.writeToCategoryModal(
        "Edit Category",
        categoryName,
        "/dashboard/categories/" + categoryId
      );
      VF.removeMethodOverride(this);
      VF.addMethodOverride(this, "PUT");
    } else if (role === "add-category") {
      VF.writeToCategoryModal("New Category", "", "/dashboard/categories/new");
      VF.removeMethodOverride(this);
    }
  });

  categoryModal.addEventListener("hidden.bs.modal", function () {
    const modalAlert = categoryModal.querySelector("#modal-alert");
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
  });

  const productModal = document.getElementById("productModal");
  productModal.addEventListener("show.bs.modal", function (event) {
    // If modal was toggled on page load(validation error case)
    // we are handling it manually
    if (!event.relatedTarget) return;
    const { button, role } = VF.getTriggerData(event);

    if (role === "edit-product") {
      const {
        productName,
        productPrice,
        productDescription,
        productId,
        categoryId,
      } = VF.getProductItemData(button);
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
      VF.writeToProductModal(
        "New Product",
        "",
        "",
        "",
        "/dashboard/products/new",
        categoryId
      );
      VF.removeMethodOverride(this);
    }
  });

  productModal.addEventListener("hidden.bs.modal", function () {
    const modalAlert = productModal.querySelector("#modal-alert");
    if (modalAlert) {
      modalAlert.style.display = "none";
    }
    // Remove file attached in previous attempt and clear input file value
    removeImage();
  });

  const deleteModal = document.getElementById("deleteModal");
  deleteModal.addEventListener("show.bs.modal", function (event) {
    // If modal was toggled on page load(validation error case)
    // we are handling it manually
    if (!event.relatedTarget) return;
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
        "Are you sure you want to delete " +
          categoryName +
          "?<br />All products will be lost.",
        "/dashboard/categories/" + categoryId
      );
    }
  });
});
