📄 MY API Playground

My API PLAYGROUND is a full-stack MERN-based application that provides a platform for managing profiles, resumes, and projects.
It includes authentication, profile creation, skill tracking, resume upload, and project showcase.

This project is designed as a learning playground for APIs while still being production-ready.

🚀 Features

🔑 User Authentication (JWT-based login & signup)

👤 Profile Management (name, email, education, skills)

📂 Resume Upload (PDF supported with Multer)

💼 Projects Showcase (title, description, links)

🎨 Responsive UI with light/dark mode

⚡ Optimized API with Express & MongoDB Atlas

🌐 Deployed Full-Stack (Render + Vercel)

🛠️ Tech Stack
Frontend (Client)

⚛️ React.js (CRA)

🎨 TailwindCSS

✨ Framer Motion (smooth animations)

🔗 Axios (API integration)

Backend (Server)

🟢 Node.js + Express

🗄️ MongoDB Atlas + Mongoose

📂 Multer (file uploads)

🔐 JWT Authentication

⚙️ RESTful APIs

📂 Project Structure
track-a/
├── backend/                  # Express backend
│   ├── src/
│   │   ├── config/           # MongoDB connection
│   │   ├── controllers/      # Auth, Profile, Projects
│   │   ├── middlewares/      # Auth, Upload, Error handling
│   │   ├── models/           # User, Profile schemas
│   │   ├── routes/           # API routes
│   │   ├── seed/             # Seed script
│   │   └── server.js         # Entry point
│   ├── uploads/              # Uploaded resumes (PDFs)
│   ├── package.json
│   └── .env
│
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # UI Components
│   │   ├── pages/            # ProfilePage, AuthPage
│   │   ├── context/          # AuthContext
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/AnkitLuhar512117/api-playground
cd api-playground

2️⃣ Setup Backend (Server)
cd backend
npm install


Create a .env file inside backend/

PORT=8080
MONGO_URI=your_mongo_atlas_connection
JWT_SECRET=your_jwt_secret


Run the backend:

npm start

3️⃣ Setup Frontend (Client)
cd ../frontend
npm install


Create .env inside frontend/

REACT_APP_API_URL=https://my-api-playground.onrender.com/


Run the frontend:

npm start

🌐 API Endpoints

🔹 Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login user

🔹 Profile

GET /api/profile/me → Get current user profile

POST /api/profile → Create/Update profile

POST /api/profile/upload → Upload resume

🔹 Projects

GET /api/projects → Fetch all projects

POST /api/projects → Add new project

🎨 Frontend Flow

AuthPage → Register/Login

ProfilePage → View profile, resume & skills

ProjectsPage → Paginated list of projects with animations

Resume Upload → Upload PDF and view link

🏗️ System Architecture & Workflow

Workflow

User registers or logs in (JWT auth)

User creates profile → Adds skills, education, work

User uploads resume (stored via Multer in backend)

User adds projects → Displayed dynamically in frontend

React frontend fetches data from Express backend using Axios

Architecture Diagram

graph TD;
  A[React Frontend (Vercel)] -->|REST API| B[Express Backend (Render)]
  B --> C[MongoDB Atlas Database]
  B --> D[Uploads: Multer + Resume PDFs]

🔮 Future Scope

📑 Multi-profile & multi-resume support

🔒 Role-based authentication (Admin/Users)

📊 Analytics dashboard for users/projects

🤖 AI-powered resume scoring & suggestions

📱 React Native mobile app

🌍 Deployment

Backend (Render) → https://my-api-playground.onrender.com/

Frontend (Vercel) → https://my-api-playground-ezn8.vercel.app/


📑 Resume & Author

👨‍💻 Author: Ankit Luhar
📄 Resume: https://drive.google.com/file/d/1hrU9kB73nAcDDxEdne6gnx0RT3J_6-h3/view?usp=drive_link
💼 LinkedIn: https://www.linkedin.com/in/ankitluhar/
📧 Email: ankitluhar5121@gmail.com


📜 License

MIT License – Free to use and modify.
