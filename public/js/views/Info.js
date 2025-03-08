import AbstractView from "./AbstractView.js"

export default class Info extends AbstractView{
    constructor(){
        super();
        this.setTitle("Informacje");
        document.querySelector(".title h1").textContent = "Instrukcja obsługi";
    }
    async getHTML(){
        return `
            <div id = "main-page">
            <h2>Nawigacja</h2> <br>
            <p>Poprzez pasek boczny mamy dostęp do stron:</p>
            <br>
            <ul>
                <li><strong>Strona główna</strong></li>
                <li><strong>Rysuj wykres</strong> - tutaj odbywa się rysowanie zbioru Mandelbrota, gdzie podajemy zakres wartości, w których chcemy narysować fraktal. Wartości są ograniczone w odpowiednich przedziałach. Następnie mamy pole <em>iteracje</em>, które wpływa na dokładność generowanego fraktala. Po wciśnięciu przycisku <em>Rysuj</em> następuje generowanie wykresu. Dodatkowo fraktal można przybliżać poprzez przeciąganie myszką po wykresie. Ponadto mamy przycisk <em>Zapisz</em>, który udostępnia swoją funkcjonalność dopiero po zalogowaniu. Po zalogowaniu mamy również możliwość wczytania zapisanych parametrów i narysowania zbioru Mandelbrota na podstawie zapisanych danych.</li>
                <li><strong>Logowanie</strong> - strona logowania użytkownika.</li>
                <li><strong>Rejestracja</strong> - rejestrowanie użytkownika.</li>
                <li><strong>Konto użytkownika</strong> - dostępne po zalogowaniu, wyświetla informacje użytkownika.</li>
                <li><strong>Wyloguj</strong> - dostępny po zalogowaniu, wylogowuje użytkownika.</li>
            </ul>
            </div>
        `
    }
}