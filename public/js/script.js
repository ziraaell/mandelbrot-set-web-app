import Login from "./views/Login.js";
import MainPage from "./views/MainPage.js";
import Register from "./views/Register.js";
import Account from "./views/Account.js";
import MandelbrotSet from "./views/Mandelbrot.js";
import Info from "./views/Info.js"

let colorPalette = []
let WIDTH
let HEIGHT
var ctx
let REAL_SET = { start: -2, end: 1 }
let IMAGINARY_SET = { start: -1, end: 1 }
let MAX_ITERATION = 80
const root = document.documentElement;

document.addEventListener("DOMContentLoaded", checkAuthState);

window.navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () =>{
    if(location.pathname === '/logout'){
        await logout();
        navigateTo("/");
        return;
    }

    const routes = [
        {path: "/",  view: MainPage },
        {path: "/login",  view: Login },
        {path: "/register",  view: Register},
        {path: "/account",  view: Account},
        {path: "/mandelbrotset",  view: MandelbrotSet},
        {path: "/instruction", view: Info}
    ];

    const potentialMatches = routes.map(route =>{
        return{
            route: route,
            isMatch: location.pathname == route.path
        };
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);
    if(!match)
        match = { route: routes[0], isMatch: true };

    const view = new match.route.view();
    document.querySelector('#main-content').innerHTML = await view.getHTML();
    MathJax.typesetPromise();
    
    if (location.pathname === '/register') {
        document.getElementById("register-form").addEventListener("submit", (event) => {
            event.preventDefault();
            register()
        });
    }
    else if (location.pathname === '/login') {
        document.getElementById("login-form").addEventListener("submit", (event) => {
            event.preventDefault();
            login()
        });
    }
    else if(location.pathname == "/account")
        account()
    else if(location.pathname == "/mandelbrotset")
    {
        if(await checkAuthState())
        {
            document.getElementById('load').style.display = 'flex'
            const loadButton = document.getElementById('load');
            loadButton.addEventListener("click", (event) => {
                event.preventDefault();
                readData();
            })
        }
        else
            document.getElementById('load').style.display = 'none'

        document.querySelectorAll('input[type="number"]').forEach((input) => {
            input.addEventListener('input', () => {
                const min = parseFloat(input.min);
                const max = parseFloat(input.max);
                const value = parseFloat(input.value); 
        
                if (value < min) 
                    input.value = min;
            
                if (value > max) 
                    input.value = max;
                });
            });
                

        const saveButton = document.getElementById('save');
            saveButton.addEventListener("click", (event) => {
                event.preventDefault();
                saveData()
            })
        const drawButton = document.getElementById('draw');
        drawButton.addEventListener("click", (event) => {
            event.preventDefault();
            initializeMandelbrot();
            drawMandelbrotSet();
        });
    } 
}

function toggleSidebar(){
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('toggle-btn');
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    const currentWidth = getComputedStyle(root).getPropertyValue('--sidebar-width').trim();

    // if (currentWidth === '70px') 
    //     root.style.setProperty('--sidebar-width', '260px');
    // else 
    //     root.style.setProperty('--sidebar-width', '70px');
}

async function register(){
    var username = document.getElementById('username-input').value;
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    var repeated_password = document.getElementById('repeated-password-input').value;
    
    if(password !== repeated_password)
    {
        showDialog("Niepowodzenie", "Podane hasła są niezgodne");
        return;
    } 

    const response = await fetch("/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
    });

    const res = await response.json();
    if(response.ok)
        showDialog(res.title, res.message) 
    else 
        showDialog(res.title, res.error)  
}

async function login(){
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;

    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    const res = await response.json();
    if(response.ok)
    {
        showDialog("Sukces", res.message) 
        checkAuthState()
    }
    else
        showDialog(res.title, res.error)     
}

async function logout(){
    try{
        const response = await fetch("/logout", {
            method: "GET",
            credentials: "include",
        });
  
        const res = await response.json();
        if(response.ok)
        {
            showDialog(res.title, res.message) 
            checkAuthState();
        }
        else
            showDialog(res.title, res.error)  
    }
    catch(error)
    {
        showDialog(res.title, res.error)  
        showDialog("Niepowodzenie", "Wystąpił nieoczekiwany błąd");
    }
}

async function account(){
    try{
        console.log("HALO")
        const response = await fetch("/account", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept : "application/json", 
            }
        });
        const res = await response.json();
        if(response.ok)
        {
            document.getElementById('s_account-id').textContent = res.id;
            document.getElementById('s_account-username').textContent = res.username;
            document.getElementById('s_account-email').textContent = res.email;
        }
        else
            showDialog(res.title, res.error)      
    }
    catch(error)
    {
        showDialog("Niepowodzenie", error)
    }
}
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", checkAuthState);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link && link.href && link.tagName === "A") {
            e.preventDefault();
            navigateTo(link.href);
            return;
        }
    });   
    document.getElementById("toggle-btn").addEventListener("click", toggleSidebar);
    router();
});

export function showDialog(title, message){
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal').style.display = 'flex';
}

document.getElementsByClassName("close")[0].onclick =  function closeDialog(){
    document.getElementById('modal').style.display = 'none';
}

document.getElementsByClassName("close-history")[0].onclick =  function closeHistoryDialog(){
    document.getElementById('load-data-window').style.display = 'none';
}
document.getElementById("save-history").onclick =  function loadData()
{
    const selectedOption = document.querySelector('input[name="history-option"]:checked')
    if(!selectedOption) return

    const selectedIndex = selectedOption.value;
    document.getElementById("x_left").value = parseFloat(document.getElementById(`x_left_${selectedIndex}`).textContent);
    document.getElementById("x_right").value = parseFloat(document.getElementById(`x_right_${selectedIndex}`).textContent);
    document.getElementById("y_bottom").value = parseFloat(document.getElementById(`y_bottom_${selectedIndex}`).textContent);
    document.getElementById("y_top").value = parseFloat(document.getElementById(`y_top_${selectedIndex}`).textContent);
    document.getElementById("iterations").value = parseInt(document.getElementById(`iterations_${selectedIndex}`).textContent);
    document.getElementById('load-data-window').style.display = 'none';
}

async function checkAuthState(){
    const response = await fetch('/validate-token', {
        method: 'GET',
        credentials: 'include',
    });

    if(response.ok)
    {
        document.getElementById('logout').style.display = 'flex';
        document.getElementById('login').style.display = 'none';
        document.getElementById('account').style.display = 'flex';
        return true;
    }
    else
    {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('login').style.display = 'flex';
        document.getElementById('account').style.display = 'none';
        return false;
    }
}

async function saveData(){
    try{
        var x_left = parseFloat(document.getElementById("x_left").value);
        var x_right = parseFloat(document.getElementById("x_right").value)
        var y_bottom = parseFloat(document.getElementById("y_bottom").value)
        var y_top = parseFloat(document.getElementById("y_top").value)
        var iterations = parseFloat(document.getElementById("iterations").value)

        const response = await fetch("/history", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({x_left, x_right, y_bottom, y_top, iterations})
        });

        const res = await response.json();
        if(response.ok)
            showDialog(res.title, res.message)
        else
            showDialog(res.title, res.error)
    }
    catch(error)
    {
        showDialog("Niepowodzenie", "Wystąpił nieoczekiwany błąd")
    }
}

async function readData(){
    try{
        const response = await fetch ("/history", {
            method: "GET",
            credentials: "include",
            headers : {
                Accept : "application/json",
            }
        });
        const res = await response.json();
        if(response.ok)
        {
            document.getElementById("load-data-window").style.display = 'flex';
            const radioGroup = document.getElementById("radio-group");
            radioGroup.innerHTML = "";

            res.forEach((entry, index) => {
                const option = document.createElement("div");
                option.innerHTML = `
                  <input type="radio" id="option-${index}" name="history-option" value="${index}">
                    <label for="option-${index}">
                        <strong>Opcja ${index + 1}:</strong><br>
                        x1: <span id = "x_left_${index}"> ${entry.x_left}</span> <br> 
                        x2: <span id = "x_right_${index}"> ${entry.x_right} </span> <br>
                        y1: <span id = "y_bottom_${index}"> ${entry.y_bottom} </span> <br> 
                        y2: <span id = "y_top_${index}"> ${entry.y_top} </span> <br>
                        Iteracje: <span id = "iterations_${index}"> ${entry.iterations} </span>
                    </label>
                `;
                radioGroup.appendChild(option);
            })
        }
        else
            showDialog(res.title, res.error)
    }
    catch(error)
    {
        showDialog("Niepowodzenie", error)
    }
}

function mandelbrot(c) {
    let z = { x: 0, y: 0 }, n = 0, p, d;
    do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }
        z = {
            x: p.x + c.x,
            y: p.y + c.y
        }
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
        n += 1
    } while (d <= 2 && n < MAX_ITERATION)
    return [n, d <= 2]
}

const initializeMandelbrot = () => {
    var canvas = document.getElementById('graph-canvas')
    ctx = canvas.getContext('2d')
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight    
    colorPalette = palette()
};

function draw() {
    const canvas = document.getElementById('graph-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            const complex = {
                x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
                y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
            };

            const [m, isMandelbrotSet] = mandelbrot(complex);
            const color = isMandelbrotSet ? [0, 0, 0] : colorPalette[m % colorPalette.length];
            ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.fillRect(i, j, 1, 1);
        }
    }
}

const lagrange = ([X1, Y1], [X2, Y2], x) =>
    (((Y1 * (x - X2)) / (X1 - X2)) + ((Y2 * (x - X1)) / (X2 - X1)))
 
 const makeRGB = (r, g, b, k) => {
     const calculate = pair => parseInt(lagrange(pair[0], pair[1], k))
     if (isNaN(r)) r = calculate(r)
     if (isNaN(g)) g = calculate(g)
     if (isNaN(b)) b = calculate(b)
 
     return [r, g, b]
 }
 
 const palette = (size = 250) => {
     const range = parseInt(size / 6)
     const colors = []
     let c
     for (let k = 0; k < size; k++) {
         if (k <= range)
             c = makeRGB(255, [[0, 0], [range, 255]], 0, k)
         else if (k <= range * 2)
             c = makeRGB([[range + 1, 255], [range * 2, 0]], 255, 0, k)
         else if (k <= range * 3)
             c = makeRGB(0, 255, [[range * 2 + 1, 0], [range * 3, 255]], k)
         else if (k <= range * 4)
             c = makeRGB(0, [[range * 3 + 1, 255], [range * 4, 0]], 255, k)
         else if (k <= range * 5)
             c = makeRGB([[range * 4 + 1, 0], [range * 5, 255]], 0, 255, k)
         else
             c = makeRGB(255, 0, [[range * 5 + 1, 255], [size - 1, 0]], k)
 
         colors.push(c)
     }
     return colors
 }


const getRelativePoint = (pixel, length, set) =>{
    return set.start + (pixel / length) * (set.end - set.start)
}

function drawMandelbrotSet()
{
    var x_left = (document.getElementById("x_left").value) ? parseFloat(document.getElementById("x_left").value) : -2.0;
    var x_right = (document.getElementById("x_right").value) ? parseFloat(document.getElementById("x_right").value) : 1.0;
    var y_bottom = (document.getElementById("y_bottom").value) ? parseFloat(document.getElementById("y_bottom").value) : -1.0;
    var y_top = (document.getElementById("y_top").value) ? parseFloat(document.getElementById("y_top").value) : 1.0;
    var iterations = (document.getElementById("iterations").value) ? parseFloat(document.getElementById("iterations").value) : 80.0;

    REAL_SET = {start: x_left , end: x_right};
    IMAGINARY_SET = {start: y_bottom, end: y_top};

    if(x_left && x_right && x_left > x_right)
    {
        showDialog("Niepowodzenie", "Niepoprawne parametry")
        return
    }
    else if(y_bottom && y_top && y_bottom > y_top)
    {
        showDialog("Niepowodzenie", "Niepoprawne parametry")
        return
    }
            
    MAX_ITERATION = iterations;
    let overlay = document.getElementById('canvas-overlay');
    const overlayCtx = overlay.getContext('2d');
    let isDrawing = false;
    let startX, startY, endX, endY;
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;

    overlay.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = (e.clientX - rect.left) * scaleX;
        startY = (e.clientY - rect.top) * scaleY;
    });
            
    overlay.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;          
        const rect = overlay.getBoundingClientRect();
        endX = (e.clientX - rect.left) * scaleX;
        endY = (e.clientY - rect.top) * scaleY;
        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
                
        const drawRect = {
            x: Math.min(startX, endX),
            y: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY)
        };
                
        overlayCtx.strokeStyle = 'rgb(255, 255, 255, 1)';
        overlayCtx.lineWidth = 1;
        overlayCtx.setLineDash([]);
        overlayCtx.strokeRect(drawRect.x, drawRect.y, drawRect.width, drawRect.height);
    });
            
    overlay.addEventListener('mouseup', (e) => {
        if (!isDrawing) return;
        isDrawing = false;
                
        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
        const relativeStartX = Math.min(startX, endX);
        const relativeStartY = Math.min(startY, endY);
        const relativeEndX = Math.max(startX, endX);
        const relativeEndY = Math.max(startY, endY);
        const realStart = getRelativePoint(relativeStartX, (rect.right - rect.left) * scaleX, REAL_SET);
        const realEnd = getRelativePoint(relativeEndX, (rect.right - rect.left) * scaleX, REAL_SET);
        const imaginaryStart = getRelativePoint(relativeStartY, (rect.bottom - rect.top) * scaleY  , IMAGINARY_SET);
        const imaginaryEnd = getRelativePoint(relativeEndY , (rect.bottom - rect.top) * scaleY, IMAGINARY_SET);

        document.getElementById("x_left").value = realStart
        document.getElementById("x_right").value = realEnd
        document.getElementById("y_bottom").value = imaginaryStart
        document.getElementById("y_top").value = imaginaryEnd

        REAL_SET = { start: realStart, end: realEnd };
        IMAGINARY_SET = { start: imaginaryStart, end: imaginaryEnd };
        draw();
        return
    });
    draw();
}
