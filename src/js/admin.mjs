import { loginRequest } from "./externalServices.mjs";
import { alertMessage } from "./utils.mjs";
import { checkLogin, login } from "./auth.mjs";
import currentOrders from "./currentOrders.mjs"; // Import currentOrders

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
  }

  async init() {
    this.token = checkLogin();
    if (this.token) {
      this.showOrders();
    } else {
      this.showLogin();
    }
  }

  async login(creds, next) {
    await login(creds, window.location.pathname);
    this.token = checkLogin();
    next();
  }

  showLogin() {
    this.mainElement.innerHTML = loginFormTemplate();
    document.querySelector("#loginButton").addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      this.login({ email, password }, this.showOrders.bind(this));
    });
  }

  async showOrders() {
    try {
      this.mainElement.innerHTML = orderTemplate();
      await currentOrders("#orders", this.token); // Use currentOrders
    } catch (err) {
      console.error("Error showing orders:", err);
      if (err.message.includes("401")) {
        this.init(); // Re-check login status on 401
      }
    }
  }
}

function loginFormTemplate() {
  return `<fieldset class="login-form">
    <legend>Login</legend>
    <p>
      <label for="email">Email</label>
      <input type="text" placeholder="email" id="email" value="user1@email.com"/>
    </p>
    <p>
      <label for="password">Password</label>
      <input type="password" placeholder="password" id="password" />
    </p>
    <button type="button" id="loginButton">Login</button>
  </fieldset>`;
}

function orderTemplate() {
  return `<h2>Current Orders</h2>
    <table id="orders">
      <thead>
        <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th></tr>
      </thead>
      <tbody class="order-body"></tbody>
    </table>`;
}