# 🎬 CineMind - AI-Powered Movie Discovery Platform

A full-stack MERN application for intelligent movie discovery with AI-powered recommendations.

## 🚀 Quick Start

**Setup (Windows):**
```bash
setup.bat
```

**Setup (macOS/Linux):**
```bash
chmod +x setup.sh
./setup.sh
```

## ⚙️ Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Access: http://localhost:5173

## 📋 What You Get

- 10 Backend Modules (Auth, Movie, Favorites, AI, Rating, etc.)
- 10 Frontend Pages (Home, Search, MovieDetails, Profile, etc.)
- 20+ Reusable Components
- AI-Powered Recommendations
- Full User Authentication
- Movie Search & Discovery
- Favorites & Watchlist
- Ratings & Reviews

## 🔧 Configuration

**backend/.env:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cinemind
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key
CORS_ORIGIN=http://localhost:5173
```

**frontend/.env.local:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_AI_CHAT=true
```

## 🛠️ Tech Stack

**Frontend:** React 18 + Vite + Tailwind + Framer Motion
**Backend:** Node + Express + MongoDB + Mongoose
**Auth:** JWT + bcryptjs
**APIs:** TMDB, Google Gemini

## 📁 Structure

```
CineMind/
├── backend/           # Express API server
├── frontend/          # React application
├── setup.bat/setup.sh # Automated setup
└── README.md         # This file
```

## API Endpoints

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/search?q=query` - Search
- `GET /api/movies/:id` - Movie details
- `GET /api/favorites` - Get favorites
- `POST /api/ai/chat` - AI chat

## ✨ Features

✅ User Authentication
✅ Movie Discovery
✅ AI Recommendations
✅ Favorites/Watchlist
✅ Ratings & Reviews
✅ User Profiles
✅ Watch History
✅ Responsive Design

## 🐛 Troubleshooting

**Port in use:**
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**MongoDB not running:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**API Key errors:**
- Get TMDB key: https://www.themoviedb.org/settings/api
- Get Gemini key: https://ai.google.dev/

## License

MIT License - See LICENSE file for details

---

**Happy Movie Discovering! 🍿**
