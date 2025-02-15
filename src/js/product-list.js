import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const category = getParam("category");

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  document.title = `Top Products: ${categoryTitle}`;

  const titleElement = document.querySelector(".title");
  if (titleElement) {
    titleElement.textContent = categoryTitle;
  }

  const productListElement = document.querySelector(".product-list");
  if (productListElement) {
    productList(".product-list", category);
  } else {
    console.error("Error: .product-list element not found in the DOM.");
  }
});
