# ISP Site Survey Tool

A full-stack web application for managing ISP site surveys, property/building/floor data, checklist templates, and survey execution workflows.

## Overview
This project combines:
- Backend: Java 17 + Spring Boot 3 + Spring Security + JWT + JPA/Hibernate + MySQL
- Frontend: React + Vite + Axios + React Router
- Database: MySQL

It is designed for ISP teams to manage site survey tasks and record results in a structured way.

## Key Features
- User authentication and authorization with JWT
- Role-based access control
- Property, building, and floor management
- Survey execution workflow
- Checklist and template support
- File upload support
- REST API-based backend with frontend integration

## Tech Stack
- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL Connector/J
- JWT (jjwt)
- React 19
- Vite
- Axios
- React Router

## Project Structure
```text
SITE_SERVER_PROJECT-main/
├── README.md
├── .gitignore
├── backend/
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── target/
│   └── uploads/
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── public/
    └── src/
```

## Prerequisites
Before running the application, make sure you have:
1. Java JDK 17+
2. Maven
3. Node.js and npm
4. MySQL installed and running

## Database Setup
Create the database in MySQL:
```sql
CREATE DATABASE sitesurvey;
```

Then verify the database settings in:
- `backend/src/main/resources/application.properties`

Default config uses:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sitesurvey?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root@123
```

If your local MySQL username/password are different, update them before starting the backend.

## Run the Application

### 1. Start the backend
Open PowerShell in the backend folder:
```powershell
cd "C:\Users\harsh\OneDrive\Desktop\final year projects\project final\site server final project\SITE_SERVER_PROJECT-main\SITE_SERVER_PROJECT-main\backend"
& "C:\Users\harsh\Downloads\apache-maven-3.10.0-bin\apache-maven-3.10.0\bin\mvn.cmd" spring-boot:run
```

The backend runs at:
```text
http://localhost:8080
```

### 2. Start the frontend
Open a second terminal in the frontend folder:
```powershell
cd "C:\Users\harsh\OneDrive\Desktop\final year projects\project final\site server final project\SITE_SERVER_PROJECT-main\SITE_SERVER_PROJECT-main\frontend"
npm install
npm run dev -- --host 0.0.0.0
```

The frontend runs at:
```text
http://localhost:5173
```

If port 5173 is already occupied, Vite may switch to 5174.

## API Base URL
```text
http://localhost:8080/api
```

Main authentication endpoints:
- `POST /api/auth/signup`
- `POST /api/auth/signin`

## Default Roles
- User
- Moderator
- Admin

## Typical User Flow
1. Register a new account
2. Log in with username and password
3. View dashboard
4. Add properties, buildings, and floors
5. Create or use checklist templates
6. Execute surveys and store results

## Troubleshooting
### Port 8080 is already in use
Check which process is using the port:
```powershell
netstat -ano | findstr :8080
```
Then stop it if needed:
```powershell
taskkill /PID <PID> /F
```

### PowerShell cannot find Maven
Use the full Maven path as shown above:
```powershell
& "C:\Users\harsh\Downloads\apache-maven-3.10.0-bin\apache-maven-3.10.0\bin\mvn.cmd" spring-boot:run
```

### Backend root URL shows 401/blank page
This is normal because the API is protected by Spring Security. Use the frontend UI or call the actual auth endpoints instead of opening the base API root directly.

## GitHub Setup
If you want to push this project to GitHub, run the following commands from the project root:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace the GitHub URL with your repository link.

## Notes
- The project already contains a `.gitignore` to ignore build artifacts and dependency folders.
- Do not commit `node_modules`, `target`, or upload/generated directories unless you explicitly want them in Git history.

## License
This project is currently prepared for local development and GitHub hosting. Add a LICENSE file if you want to publish it publicly.
