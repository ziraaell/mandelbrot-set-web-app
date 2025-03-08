import AbstractView from "./AbstractView.js";

export default class Register extends AbstractView{
    constructor(){
        super();
        this.setTitle("Rejestracja");
        document.querySelector(".title h1").textContent = "Rejestracja";     
    }

    async getHTML(){
        return `
            <div class = "panel">
            <form id="register-form">
            <div>
                <label for="username-input">
                <i class="bi bi-person-circle"></i>
                </label>
                <input type="text" name="username" id="username-input" placeholder="Nazwa użytkownika" required />
            </div>
            <div>
                <label for="email-input">
                    <i class="bi bi-envelope"></i>
                </label>
                <input type="email" name="email" id="email-input" placeholder="Email" required />
            </div>
            <div>
                <label for="password-input">
                    <i class="bi bi-lock-fill"></i>
                </label>
                <input type="password" name="password" id="password-input" placeholder="Hasło" required />
            </div>
            <div>
                <label for="repeated-password-input">
                    <i class="bi bi-lock-fill"></i>
                </label>
                <input type="password" name="password" id="repeated-password-input" placeholder="Powtórz hasło" required />
            </div>
                <button type="submit" id = "register-btn">Zarejestruj się</button> 
            </form>
            </div>
        `;
    }
}