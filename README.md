# Digital Platform For Centralized Alumni Management And Engagement

A lightweight alumni management platform with a React + Vite frontend and an Express + Mongoose backend.

Overview
- Frontend: React + Vite app (UI, routes, API client)
- Backend: Express server with Mongoose for MongoDB access

Technologies used (brief)
- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Framer Motion, Lottie, React Icons
- Backend: Node.js, Express, Mongoose (MongoDB), bcryptjs, CORS
- Dev / tooling: Vite, ESLint, (optional) nodemon, dotenv

Quick Start (local)
1. Clone and open repository

   git clone <repo-url>
   cd "Digital-Platform-For-Centralized-ALumni-Management-And-Engagement"

2. Backend

   cd Backend_Server
   npm install

   Create `Backend_Server/.env` (recommended) with:

   MONGO_URI=mongodb://localhost:27017/AlumniPortal
   PORT=5000

   (Optional) Install nodemon for development:

   npm install -D nodemon

   Add to `package.json` scripts if desired:

   {
     "scripts": {
       "dev": "nodemon server.js",
       "start": "node server.js"
     }
   }

   Start the backend:

   npm start

   The server will run on `http://localhost:5000` by default.

3. Frontend

   cd ../Frontend
   npm install
   npm run dev

   The Vite dev server typically runs at `http://localhost:5173`.

API
- Backend routes are mounted at `http://localhost:5000/api/alumni` (default).

MongoDB — local or Atlas (brief)
- Local: install MongoDB Community Server and use `mongodb://localhost:27017/AlumniPortal`.
- Atlas: create a cluster, whitelist IP, create a DB user, then set `MONGO_URI` to the provided connection string.

How to use environment variables
- Install `dotenv` in the backend: `npm install dotenv`
- In `Backend_Server/server.js` add at the top:

  import dotenv from 'dotenv'
  dotenv.config()

- Update `Backend_Server/config/db.js` to use `process.env.MONGO_URI` (example):

  import mongoose from 'mongoose'

  const connectDB = async () => {
    try {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/AlumniPortal'
      await mongoose.connect(uri)
      console.log('MongoDB Connected')
    } catch (error) {
      console.error('DB Error:', error.message)
    }
  }

  export default connectDB

Common commands
- Backend: `cd Backend_Server` → `npm install` → `npm start` (or `npm run dev` with nodemon)
- Frontend: `cd Frontend` → `npm install` → `npm run dev`

Troubleshooting (quick)
- DB connection error: verify `MONGO_URI`, MongoDB service is running (local) or Atlas IP whitelist and credentials (cloud).
- Frontend API calls failing: ensure backend is running and CORS is enabled (server already uses `cors()`).

Want me to update the backend to use `dotenv` and add a `dev` script with `nodemon`? I can apply those changes now.

---
For frontend-specific notes, see `Frontend/README.md`.
