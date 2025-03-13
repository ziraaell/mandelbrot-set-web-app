# Mandelbrot Set - web app 🚗
Mandelbrot Set is a web application designed for interactive fractal visualization. It allows users to generate and explore the Mandelbrot set with adjustable parameters such as range and iteration count. The system includes user authentication, enabling registration, login, and saving/loading custom parameters for a personalized experience.

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Project Structure](#project-structure)
* [Setup](#setup)
* [Screenshots](#screenshots)

## Technologies Used
- Python: Main programming language used for backend development. 
- Flask: A lightweight web framework for building the application's backend. 
- Conda: Used for managing packages and virtual environments. 
- PostgreSQL: Relational database system used for storing and managing data.
- PL/pgSQL: Used for stored procedures, functions, and triggers in PostgreSQL.
- Psycopg2: A PostgreSQL adapter for Python to handle database interactions. 
- Jinja: Template engine for rendering HTML pages dynamically. 
- Tembo: Cloud-based PostgreSQL hosting platform. 
- SQL: For creating and managing the database schema and executing queries.
- JavaScript: Used for displaying dynamic fields when adding new records.
- HTML: For structuring the web pages.
- CSS: For styling and layout of the web pages.


## Features
- Brand and Model Management: Allows storing and managing information about car brands and models, including names and associations between them. 
- Car Inventory: Manages detailed information about each car, such as registration numbers, production years, and availability. 
- Customer Management: Stores customer information, including names, contact details, and unique phone numbers. 
- Employee Roles: Manages employee roles with specific permissions and salary information, ensuring proper access control. 
- Rental Management: Supports adding new rentals, linking customers with cars and employees, and validating rental dates. 
- Order Management: Allows customers to place orders for specific car models with start and end dates, and tracks the status of orders (successful, failed, or pending).
- Pricing System: Manages rental pricing based on car classes, ensuring accurate cost calculations for different vehicle categories. 
- Payment Processing: Records payments for rentals and links them to corresponding transactions, ensuring all payments are properly tracked. 
- Reporting and Analysis: Enables generating reports on car availability, popular models, and financial performance.
- Data Validation and Integrity: Ensures data accuracy through constraints such as unique keys, foreign keys, and checks on data formats and logical date orders. 

## Project structure
```
Car-Rental-Databases-Project/
├── static/                  # Static files (images, CSS, JS)
├── templates/               # HTML templates for the frontend
├── .gitignore               
├── BD_Dokumentacja.pdf      # Project documentation (in Polish)
├── README.md                
├── app.py                   # Main backend logic (Flask)
├── baza.sql                 # SQL schema with triggers, functions, views, and initial data
├── requirements.txt         # Python dependencies
```

## Setup
The project requirements and dependencies are listed in the requirements.txt file, which is located in the root directory of the project.

1. Clone repository
 ```bash 
   git clone https://github.com/ziraaell/Car-Rental-Databases-Project.git
```

2. Navigate to the project directiory:
 ```bash 
  cd Car-Rental-Databases-Project
```

3. Create and activate a virtual environment using Anaconda (optional but recommended):
```bash 
  conda create -n rental_env
  conda activate rental_env
```

4. Install the required libraries:
```bash 
  pip install -r requirements.txt
```

5. Create the database using the 'baza.sql' file:
   - Ensure you have an active PostgreSQL instance. This can be hosted locally, on Tembo, or any other PostgreSQL hosting service.
   - Run the following command to create the database structure and insert initial data:


     ```bash 
     psql -h [hostname] -U [username] -W -d [database_name] < baza.sql
     ```

6. Configure the .env file with database settings:
   - Create a .env file in the root directory and add:


     ```bash 
     DATABASE_URL=postgresql://[username]:[password]@[hostname]:[port]/[database_name]
     ```
        
7. Run the application locally:
   ```bash 
      flask run
    ```
   
  The application will be awailable at: http://127.0.0.1:5000

## Screenshots
### Home page
The home page of the Mandelbrot Set web application features a theoretical description, mathematical definition, and an interactive plot. A side navigation bar on the left provides access to other sections of the app.

<img width="1264" alt="image" src="https://github.com/user-attachments/assets/2bbb85d9-a340-4ca7-8608-c4ccf106d89d" />
<img width="1264" alt="image" src="https://github.com/user-attachments/assets/479a704c-199c-4389-a8ee-65a610f63cfb" />

### Mandelbrot Set page
This page allows users to generate and explore the Mandelbrot Set by adjusting parameters such as coordinate range (x1, x2, y1, y2) and iteration count. The "Draw" button renders the fractal based on the selected values. Logged-in users can save their parameters using the "Save" button, while for non-logged-in users, this option remains disabled. The fractal is interactive, allowing zooming by dragging the mouse over the plot.

<img width="1264" alt="image" src="https://github.com/user-attachments/assets/177ff88e-3cf2-4352-93d7-54ccf671e056" />

In addition to the existing features, after logging in, the "Load Data" button appears, allowing users to retrieve previously saved parameters for generating the Mandelbrot Set.

![image](https://github.com/user-attachments/assets/78edf6c4-ce56-423a-8747-d1e41517d081)
![image](https://github.com/user-attachments/assets/4127dd33-e33a-45a6-871d-5926bbed9f2f)


### Reports Display - Car Availability
Search for available cars by selecting a start and end date. 

<img width="1264" alt="image" src="https://github.com/user-attachments/assets/6fd06c54-de13-4e06-9e14-a1a506b888fe" />

## Available Cars Summary
Displays the total number of available cars and a breakdown by brand. 
