import AbstractView from "./AbstractView.js";

export default class Account extends AbstractView {
    constructor() {
        super();
        this.setTitle("Konto");
        document.querySelector(".title h1").textContent = "Konto użytkownika";
    }

    async getHTML() {
        return `<div class="account-div">
        <ul>
            <li>
                <label for="user-id">
                 <input type="text" id="user-id" style="display: none;">
                    <i class="bi bi-person-circle"></i>
                </label>
                <div id="account-id">
                    <span id="s_account-id">Ładowanie..</span>
                </div>
            </li>
            <li>
                <label for="user-name">
                <input type="text" id="user-name" style="display: none;">
                    <i class="bi bi-person-fill"></i>
                </label>
                <div id="account-username">
                    <span id="s_account-username">Ładowanie..</span>
                </div>
            </li>
            <li>
                <label for="user-email">
                <input type="text" id="user-email" style="display: none;">
                    <i class="bi bi-envelope"></i>
                </label>
                <div id="account-email">
                    <span id="s_account-email">Ładowanie..</span>
                </div>
            </li>
        </ul>
    </div>
    `;
    }
}
