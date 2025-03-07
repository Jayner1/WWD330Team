import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    if (!token) {
      throw new Error("No authentication token provided");
    }

    const orders = await getOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    
    if (!parent) {
      throw new Error(`Element with selector "${selector} tbody" not found`);
    }

    parent.innerHTML = orders.map(orderTemplate).join("");
    return orders; // Return orders for potential further use
  } catch (err) {
    console.error("Error in currentOrders:", err);
    throw err; // Re-throw to allow caller to handle (e.g., redirect to login)
  }
}

function orderTemplate(order) {
  return `<tr>
    <td>${order.id}</td>
    <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
    <td>${order.items.length}</td>
    <td>${order.orderTotal}</td>
  </tr>`;
}