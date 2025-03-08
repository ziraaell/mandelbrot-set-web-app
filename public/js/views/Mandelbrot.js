import AbstractView from "./AbstractView.js";

export default class MandelbrotSet extends AbstractView {
    constructor() {
        super();
        this.setTitle("Zbiór Mandelbrota");
        document.querySelector(".title h1").textContent = "Zbiór Mandelbrota";
    }

    async getHTML() {
        return `
        <div id = "MandelbrotSet">
        <div class="graph"> 
            <canvas id="graph-canvas"></canvas>
            <canvas id="canvas-overlay"></canvas>
        </div>
            <div class="input">
                <form id="register-form">
                    <ul class="grid">
                        <li><label for = "x_left"> x1 </label><input type="number" id="x_left" value = "-2" min="-2" max="2" step = "0.01" required></li>
                        <li><label for = "x_right"> x2 </label><input type="number" id="x_right" value = "1" min="-2" max="2" step = "0.01" required></li>
                        <li><label for = "y_bottom">y1 </label><input type="number" id="y_bottom" value = "-1" min="-1" max="1" step = "0.01" required></li>
                        <li><label for = "y_top">y2 </label><input type="number" id="y_top" value = "1" min = "-1" max = "1" step = "0.01" required></li>
                    </ul>
                    <div>
                        <label for = "iterations"> Iteracje </label> <input type="number" id="iterations" value = "250" min="50" step = "50" max="2000">
                    </div>
                    <button type="submit" id="draw">Rysuj</button>
                    <button type="submit" id="save">Zapisz</button>
                    <button type="submit" id="load">Wczytaj dane</button> 
                </form>
                <p class="zoom-info">Przeciągnij myszką po wykresie, aby powiększyć.</p>
            </div>
        </div>
        `;
    }
}
