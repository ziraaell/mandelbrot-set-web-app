# Mandelbrot Set - Web App 
Mandelbrot Set is a web application designed for interactive fractal visualization. It allows users to generate and explore the Mandelbrot set with adjustable parameters such as range and iteration count. The system includes user authentication, enabling registration, login, and saving/loading custom parameters for a personalized experience.

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Project Structure](#project-structure)
* [Setup](#setup)
* [Screenshots](#screenshots)

## Technologies Used
- Node.js – JavaScript runtime environment used to run the backend of the application.
- HTML – Used for structuring web pages.
- CSS – For styling and layout design.
- JavaScript – The main language used for both frontend interactivity and backend logic.
- Express.js – A web framework for Node.js, used to handle routing and server-side logic.
- MongoDB & Mongoose – A NoSQL database and its ODM (Object Data Modeling) library for managing application data.
- JSON Web Token (JWT) – Used for user authentication and session management.
- Bcrypt – A library for hashing and securely storing user passwords.
- Cookie-Parser – Middleware for handling cookies in Express.js.
- Dotenv – For managing environment variables securely.


## Features
- Mandelbrot Set Generation – Dynamically generates the Mandelbrot Set based on user-defined parameters.
- Interactive Zooming – Allows users to zoom into specific regions of the fractal by selecting an area with the mouse.
- Customizable Parameters – Users can adjust the coordinate range (x1, x2, y1, y2) and the number of iterations to control the level of detail.
- User Authentication – Enables registration and login using JWT and bcrypt for secure authentication.
- Saving and Loading Parameters – Logged-in users can save custom parameter settings and reload them later.
- REST API – The backend exposes RESTful endpoints for managing user authentication, saving/loading parameters, and handling session data.
- Dynamically Rendered UI – The frontend updates dynamically using JavaScript, without requiring full page reloads.
- Secure Session Management – Utilizes cookies and tokens for secure authentication and authorization.
- Sidebar Navigation – Provides easy access to different sections of the application.

## Project structure
```
Mandelbrot-Web-App/
├── config/                  
├── models/                  # Database models for user authentication and history
│   ├── User.js              # User model (authentication, account details)
│   ├── UserHistory.js       # Model for storing user parameter history
├── public/                  # Static files for frontend
│   ├── css/                 # Stylesheets
│   │   ├── style.css        # Main stylesheet for the application
│   ├── js/                  # JavaScript logic for the frontend
│   │   ├── views/           # Frontend views for different pages (SPA architecture)
│   │   │   ├── AbstractView.js  # Base class for views
│   │   │   ├── Account.js       # User account page logic
│   │   │   ├── Info.js          # Information page
│   │   │   ├── Login.js         # Login page logic
│   │   │   ├── MainPage.js      # Main page logic
│   │   │   ├── Mandelbrot.js    # Mandelbrot visualization page
│   │   │   ├── Register.js      # Registration page logic
│   │   ├── script.js         # Main JavaScript file
├── index.html               # Main HTML file (entry point)
├── .gitignore              
├── README.md                
├── package-lock.json        
├── package.json             
├── server.js                # Main server file (Express backend)
```

## Setup

1. Clone repository
 ```bash 
   git clone https://github.com/ziraaell/mandelbrot-set-web-app.git
```

2. Navigate to the project directiory:
 ```bash 
  cd mandelbrot-set-web-app
```

3. Install dependencies
   - Make sure you have Node.js installed. Then run:
```bash 
  npm install
```

4. Set up environment variables:
   - Create a .env file in the config directory and add:
```bash 
  dbname = [your_database_name]
  dbURL = [your_mongodb_connection_string]
  ACCESS_TOKEN_SECRET = [your_secret_key]
```

5. Run the server
   
     ```bash 
     node server.js
     ```
The application will be available at [http://localhost:3000](http://localhost:3000)

## Screenshots
### Home page
The home page of the Mandelbrot Set web application features a theoretical description, mathematical definition, and an interactive plot. A side navigation bar on the left provides access to other sections of the app.

<img width="1264" alt="image" src="https://github.com/user-attachments/assets/2bbb85d9-a340-4ca7-8608-c4ccf106d89d" />
<img width="1264" alt="image" src="https://github.com/user-attachments/assets/479a704c-199c-4389-a8ee-65a610f63cfb" />

### Mandelbrot Set page
This page allows users to generate and explore the Mandelbrot Set by adjusting parameters such as coordinate range (x1, x2, y1, y2) and iteration count. The "Draw" button renders the fractal based on the selected values. Logged-in users can save their parameters using the "Save" button, while for non-logged-in users, this option remains disabled. The fractal is interactive, allowing zooming by dragging the mouse over the plot.

<img width="1264" alt="image" src="https://github.com/user-attachments/assets/177ff88e-3cf2-4352-93d7-54ccf671e056" />

In addition to the existing features, after logging in, the "Load Data" button appears, allowing users to retrieve previously saved parameters for generating the Mandelbrot Set.
<br></br>
![image](https://github.com/user-attachments/assets/78edf6c4-ce56-423a-8747-d1e41517d081)

<p align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/4127dd33-e33a-45a6-871d-5926bbed9f2f" />
</p>


### Login page

![image](https://github.com/user-attachments/assets/420904b3-9f86-48e4-946a-bb5f5649b49c)

Additionally, after logging in, the sidebar displays a logout icon and a user information icon, allowing users to view account details.
<p align="center">
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/093578e9-f1e2-490f-9a09-d7eedfc47570" />
</p>


### Registration page

![image](https://github.com/user-attachments/assets/cb22c3f3-fc17-40ec-a3db-a5ce98e2b179)

