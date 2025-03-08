import AbstactView from "./AbstractView.js";

export default class Login extends AbstactView{
    constructor(){
        super();
        this.setTitle("Logowanie");
        document.querySelector(".title h1").textContent = "Logowanie";
    }
    async getHTML(){
        return `
            <div class = "panel">
                <form id = "login-form">
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
                    <button type ="submit" id= "login-btn"> Zaloguj się </button>
                </form>
            </div>
        `;
    }
}