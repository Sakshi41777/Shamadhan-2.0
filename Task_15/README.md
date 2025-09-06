# Day 15 – React + Auth (JWT) Full-Stack Mini Task

## Stack
- **Backend:** Node.js + Express, JWT, bcrypt, file-based storage (`users.json`)
- **Frontend:** React (Vite) + React Router

## Quick Start
### Backend
```bash
cd backend
cp .env.example .env   # edit if you like
npm install
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```
App runs on http://localhost:5173

> By default a demo user is seeded: `demo@demo.com` / `Demo@123`

## Protected Route
- `/dashboard` is protected in the frontend using a `<ProtectedRoute />` wrapper.
- Backend exposes `/api/protected` that requires `Authorization: Bearer <token>`.
