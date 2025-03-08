import AbstractView from "./AbstractView.js"

export default class MainPage extends AbstractView{
    constructor(){
        super();
        this.setTitle("Strona główna");
        document.querySelector(".title h1").textContent = "Strona główna";
    }
    async getHTML(){
        return `
            <div id = "main-page-content">
                <div class = "plot">
                    <img src="https://www-users.york.ac.uk/~ss44/cyc/m/mandel/mandy2000.png" alt="Snow">
                    <button class="btn" onclick="navigateTo('/mandelbrotset')"> Stwórz wykres</button>
                </div>
                <div id = "text">
                <div id = "main-page-div">
                    <p>Zbiór Mandelbrota to podzbiór płaszczyzny zespolonej, którego brzeg uznawany jest za jeden z najbardziej znanych fraktali i „najsłynniejszy obiekt współczesnej matematyki”. </p>
                    <p> Nazwa tego obiektu została wprowadzona dla uhonorowania jego odkrywcy, matematyka Benoit Mandelbrota. </p>
                    <p> Zbiorem Mandelbrota nazywamy zbiór, który oparty jest o iterację liczb zespolonych według równania: </p>
                    <p>$$z_{n+1} = z_n^2 + p$$</p>

                    <p> gdzie $p$ to liczba zespolona należąca do zbioru, a wartość początkowa $z_{0} = 0$. </p>
                    <p> Do zbioru Mandelbrota należą liczby, dla których tak zdefiniowany ciąg nie dąży do nieskończoności. </p>
                    <p> Przybliżając zbiór Mandelbrota, możemy zaobserwować jego niezwykle złożoną strukturę fraktalną. Na różnych poziomach powiększenia odkrywamy coraz bardziej skomplikowane wzory, które wciąż przypominają charakterystyczny kształt zbioru. To zjawisko, zwane samopodobieństwem, jest jedną z fundamentalnych cech fraktali.</p>
                    <p> Zbiór Mandelbrota ujawnia nieskończone poziomy szczegółów, reprezentując coraz głębsze teorie matematyczne, jednocześnie będąc wyrażony za pomocą prostego wzoru. </p>
                    </div>
                </div>
            </div>
        `
    }
}