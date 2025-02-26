import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  console.log("Cart Items:", cartItems); 

  if (!cartItems || cartItems.length === 0) {
    console.warn("No items found in cart.");
    return;
  }

  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function displayCartTotal(total) {
  const formattedTotal = total.toFixed(2); 

  if (total > 0) {
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText = `Total: $${formattedTotal}`; 
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  console.log("Cart Item:", item); 

  const imageSrc = item.Images?.PrimaryMedium || "default-image.jpg";
  const color = item.Colors?.[0]?.ColorName || "Unknown Color";
  const price = item.FinalPrice ?? "0.00";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name || "Product"}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name || "Unnamed Product"}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${price}</p>
  </li>`;
}


function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}