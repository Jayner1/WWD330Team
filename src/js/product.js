import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  const existingCart = getLocalStorage("so-cart") || []; 

  if (Array.isArray(existingCart)) {
    existingCart.push(product);
    setLocalStorage("so-cart", existingCart); 
  } else {
    console.error("Cart data in localStorage is corrupted. Resetting the cart.");
    setLocalStorage("so-cart", [product]); 
  }
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
