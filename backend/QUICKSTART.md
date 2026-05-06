# CineMind Backend - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create `.env` File
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add:
```
MONGO_URI=mongodb://localhost:27017/cinemind
JWT_SECRET=your_secret_key_here_change_in_production
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
```

**Get API Keys:**
- TMDB: https://www.themoviedb.org/settings/api
- Gemini: https://makersuite.google.com/app/apikey

### Step 3: Start MongoDB
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 4: Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on: **http://localhost:5000**

---

## 📝 Test the API

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

**Save the token from response!**

### 2. Get Trending Movies (No Login Needed)
```bash
curl http://localhost:5000/api/movies/trending
```

### 3. Get Your Profile (Replace TOKEN)
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

### 4. Search Movies
```bash
curl "http://localhost:5000/api/movies/search?q=inception"
```

### 5. Add to Favorites (Replace TOKEN & movieId)
```bash
curl -X POST http://localhost:5000/api/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "movieId": 27205,
    "title": "Inception",
    "posterPath": "/path/to/poster.jpg"
  }'
```

### 6. Get AI Recommendations (Replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "message": "I want an action movie with great fight scenes"
  }'
```

---

## 📂 Folder Structure

```
src/
├── modules/
│   ├── auth/         ← Login & Registration
│   ├── user/         ← User Profile & History
│   ├── movie/        ← TMDB API Integration
│   ├── favorites/    ← Save Favorites
│   └── ai/           ← Gemini Recommendations
├── config/
│   └── db.js         ← MongoDB Connection
├── middleware/
│   ├── authMiddleware.js   ← JWT Verification
│   └── errorHandler.js     ← Error Handling
├── utils/
│   └── apiResponse.js      ← Response Formatting
├── app.js            ← Express Setup
└── server.js         ← Server Entry
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection | mongodb://localhost:27017/cinemind |
| JWT_SECRET | JWT signing key | your_secret_key_here |
| TMDB_API_KEY | TMDB API key | your_tmdb_key_here |
| GEMINI_API_KEY | Gemini API key | your_gemini_key_here |
| CORS_ORIGIN | Frontend URL | http://localhost:5173 |

---

## 🎯 Key Features Implemented

✅ **Authentication**
- Register, Login with JWT
- Password hashing with bcrypt
- Protected routes with middleware

✅ **User Features**
- Get profile
- Set movie preferences
- Track watch history
- Add/remove favorites

✅ **Movie API**
- Trending, Popular, Top Rated movies
- Search movies
- Get movie details with cast
- Extract YouTube trailers

✅ **AI Integration**
- Chat with Gemini
- Get personalized recommendations
- Consider user preferences

✅ **Error Handling**
- Validation errors
- Authentication errors
- Global error handler

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection failed | Start MongoDB service / Check MONGO_URI |
| TMDB error | Get API key from https://www.themoviedb.org/settings/api |
| Gemini error | Get API key from https://makersuite.google.com/app/apikey |
| Port already in use | Change PORT in .env or kill process on port 5000 |
| Token errors | Ensure token in header as `Authorization: Bearer TOKEN` |

---

## 📚 Full API Documentation

See **API_DOCUMENTATION.md** for complete endpoint reference.

---

## Next Steps

1. ✅ Backend is ready!
2. 🎨 Connect frontend to these APIs
3. 🔐 Update JWT_SECRET in production
4. 🗄️ Deploy MongoDB (MongoDB Atlas recommended)
5. ☁️ Deploy backend (Heroku, Render, etc.)

---

**Happy Coding! 🚀**
