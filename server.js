const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const User = require("./models/User");
const History = require("./models/UserHistory");
const PORT = process.env.PORT || 3013;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config({path: 'config/.env'});
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
    .connect(process.env.dbURL)
    .then(async() => {
        console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log('Server started on port 3013');
    });
})
.catch((err) => { 
console.error('Could not connect to MongoDB:', err);
});

app.post('/register', async (req, res) => {
let user = await User.findOne({email: req.body.email});
if(user)
{
    return res.status(400).json( {title: "Niepowodzenie", error: "Użytkownik o podanym adresie e-mail już istnieje."});
}
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        return res.status(200).json({title: "Sukces!", message: 'Użytkownik zarejestrowany pomyślnie' });
    } catch (error) {
        return res.status(500).json({title: "Niepowodzenie",  error: "Wystąpił nieoczekiwany błąd serwera" });
    }
});

app.post('/login', async (req, res) => {
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(400).json({title: "Niepowodzenie", error: "Użytkownik o podanym mailu nie istnieje. Zarejestruj się."});
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch)
            return res.status(400).json({title: "Niepowodzenie", error: "Podałeś niepoprawne hasło"});

        const accessToken = jwt.sign(
        {id: user._id, email: user.email}, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'});

        res.cookie('jwt', accessToken, {httpOnly: true, maxAge: 3600 * 1000});   
        return res.status(200).json({
            title: "Sukces!",
            message: "Zalogowano pomyślnie"
        });
    }
    catch(err)
    {
        return res.status(500).json({title: "Niepowodzenie", error: "Wystąpił błąd serwera"});
    }
});

app.get('/validate-token', authenticateToken, (req,res) => {
    return res.status(200).json({title: "Sukces!", message: "Token jest poprawny, użytkownik zalogowany"});
})

app.get('/logout', authenticateToken, (req, res) => {
    try{
        res.cookie('jwt', '', {httpOnly: true, maxAge: 1});
        return res.status(200).json({title: "Sukces!", message: "Wylogowano pomyślnie!"});
    }
    catch(err)
    {
        return res.status(500).json({title: "Niepowodzenie", error: "Wystąpił błąd serwera"});
    }
});

app.get('/account', authenticateToken, async (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        try {
            const user = await User.findOne({ email: req.user.email });
            if (!user) {
                console.log("Uzytkownik nie znaleziony?")
                return res.status(404).json({ error: "Użytkownik nie znaleziony" });
            }
            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
            });
        } 
        catch (error) 
        {
            return res.status(500).json({ error: "Wystąpił błąd serwera" });
        }
    } 
    else {
        next();
    }

});

app.post('/history', authenticateToken, async(req, res) => {
    try{
            const history = await History.create({
            user_id : req.user.id,
            x_right : req.body.x_right,
            x_left: req.body.x_left,
            y_bottom: req.body.y_bottom,
            y_top: req.body.y_top,
            iterations: req.body.iterations
        })
        return res.status(200).json({title: "Sukces!", message: "Zapisano parametry"})
    }
    catch(error)
    {
        return res.status(500).json({title: "Niepowodzenie", error: "Wystąpił błąd serwera"})
    }
})

app.get("/history", authenticateToken, async(req, res, next) => {
    if (req.headers.accept && req.headers.accept.includes('application/json'))
    {
        try{
            const user = await User.find({_id: req.user.id})
            const userHistory = await History.find({user_id: req.user.id})
            if(!user) return res.status(404).json({title: "Niepowodzenie", error: "Użytkownik nie znaleziony" });
            if(!userHistory || userHistory.length === 0) return res.status(404).json({title: "Niepowodzenie", error: "Brak zapisanych parametrów" });
            return res.status(200).json(userHistory);
        }
        catch(error)
        {
            return res.status(500).json({title: "Niepowodzenie", error: "Wystąpił błąd serwera"})
        }
    }
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function authenticateToken(req, res, next){
    const token = req.cookies.jwt;
    if(!token)
        return res.status(401).json({title: "Niepowodzenie", error: "Użytkownik niezalogowany, dostęp zabroniony"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) 
            return res.status(403).json({title: "Niepowodzenie", error: "Token jest nieprawidłowy lub wygasł"});
        req.user = user
        next()
    })
}