# 🎬 CineMind Backend - Setup Checklist

## ✅ Pre-Setup Requirements

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] npm or yarn available
- [ ] TMDB API key obtained (https://www.themoviedb.org/settings/api)
- [ ] Gemini API key obtained (https://makersuite.google.com/app/apikey)

---

## 📦 Installation Checklist

- [ ] Navigate to backend folder: `cd backend`
- [ ] Install dependencies: `npm install`
- [ ] Create `.env` file: `cp .env.example .env`
- [ ] Update `.env` with your API keys and MongoDB URI
- [ ] Start MongoDB service
- [ ] Run backend: `npm run dev`
- [ ] Verify server starts: Check for "✅ Server running on http://localhost:5000"

---

## 🔑 Environment Variables Checklist

- [ ] `PORT=5000` - Set correctly
- [ ] `NODE_ENV=development` - Set for development
- [ ] `MONGO_URI` - Valid MongoDB connection string
- [ ] `JWT_SECRET` - Random, strong secret key
- [ ] `JWT_EXPIRE=7d` - Token expiration time
- [ ] `TMDB_API_KEY` - Valid TMDB API key
- [ ] `TMDB_BASE_URL=https://api.themoviedb.org/3` - Correct URL
- [ ] `GEMINI_API_KEY` - Valid Gemini API key
- [ ] `CORS_ORIGIN=http://localhost:5173` - Frontend URL

---

## 🎯 File Structure Checklist

### Core Files
- [ ] `src/app.js` - Express setup
- [ ] `src/server.js` - Server entry point
- [ ] `src/config/db.js` - MongoDB connection
- [ ] `package.json` - Dependencies configured

### Middleware
- [ ] `src/middleware/authMiddleware.js` - JWT verification
- [ ] `src/middleware/errorHandler.js` - Error handling

### Utilities
- [ ] `src/utils/apiResponse.js` - Response helpers

### Auth Module
- [ ] `src/modules/auth/authController.js` - Register, Login
- [ ] `src/modules/auth/authRoutes.js` - Auth endpoints

### User Module
- [ ] `src/modules/user/userModel.js` - User schema
- [ ] `src/modules/user/userController.js` - User operations
- [ ] `src/modules/user/userRoutes.js` - User endpoints

### Movie Module
- [ ] `src/modules/movie/movieController.js` - TMDB integration
- [ ] `src/modules/movie/movieRoutes.js` - Movie endpoints

### Favorites Module
- [ ] `src/modules/favorites/favoritesController.js` - Favorites logic
- [ ] `src/modules/favorites/favoritesRoutes.js` - Favorites endpoints

### AI Module
- [ ] `src/modules/ai/aiController.js` - Gemini integration
- [ ] `src/modules/ai/aiRoutes.js` - AI endpoints

### Documentation
- [ ] `README.md` - Main documentation
- [ ] `API_DOCUMENTATION.md` - API reference
- [ ] `QUICKSTART.md` - Quick start guide
- [ ] `IMPLEMENTATION_SUMMARY.md` - Implementation summary

---

## 🧪 Basic Testing Checklist

### 1. Server Health
- [ ] Server starts without errors
- [ ] `http://localhost:5000/health` returns status

### 2. Authentication
- [ ] Register endpoint works: `POST /api/auth/register`
- [ ] Login endpoint works: `POST /api/auth/login`
- [ ] JWT token is returned on successful login
- [ ] Invalid credentials return 401 error

### 3. User Module
- [ ] Get profile works with valid token: `GET /api/users/profile`
- [ ] Get profile fails without token: 401 error
- [ ] Update preferences works: `PUT /api/users/preferences`
- [ ] Add watch history works: `POST /api/users/watch-history`
- [ ] Get watch history works: `GET /api/users/watch-history`

### 4. Movie Module (TMDB)
- [ ] Get trending movies: `GET /api/movies/trending`
- [ ] Get popular movies: `GET /api/movies/popular`
- [ ] Get top-rated movies: `GET /api/movies/top-rated`
- [ ] Search movies: `GET /api/movies/search?q=inception`
- [ ] Get movie details: `GET /api/movies/550`
- [ ] Get movie trailer: `GET /api/movies/550/trailer`

### 5. Favorites Module
- [ ] Add to favorites works: `POST /api/favorites`
- [ ] Get favorites works: `GET /api/favorites`
- [ ] Check if favorite works: `GET /api/favorites/550/check`
- [ ] Remove from favorites works: `DELETE /api/favorites/550`

### 6. AI Module
- [ ] AI chat endpoint works: `POST /api/ai/chat`
- [ ] Receives AI recommendations
- [ ] Response contains movie suggestions

---

## 📊 Database Checklist

- [ ] MongoDB is running
- [ ] Can connect to MONGO_URI
- [ ] Users collection created
- [ ] User can be registered and retrieved
- [ ] Password is hashed in database
- [ ] Favorites are stored per user
- [ ] Watch history is persisted

---

## 🔐 Security Checklist

- [ ] Passwords are hashed (bcryptjs)
- [ ] JWT tokens are generated for auth
- [ ] Protected routes require token
- [ ] CORS is enabled for frontend
- [ ] Sensitive data not in error messages
- [ ] .env file is in .gitignore
- [ ] JWT_SECRET is strong and random
- [ ] Production JWT_SECRET is different from development

---

## 🚀 Ready for Frontend Integration?

Before connecting frontend, verify:

- [ ] Backend server is running on port 5000
- [ ] CORS_ORIGIN in .env matches frontend URL
- [ ] All API endpoints tested and working
- [ ] JWT authentication working correctly
- [ ] TMDB API key is valid
- [ ] Gemini API key is valid
- [ ] MongoDB is connected
- [ ] Error handling is working

---

## 🔧 Troubleshooting Checklist

### If server won't start:
- [ ] Check port 5000 is free
- [ ] MongoDB is running
- [ ] .env file exists and is valid
- [ ] No syntax errors in code
- [ ] Dependencies are installed

### If database connection fails:
- [ ] MongoDB service is running
- [ ] MONGO_URI is correct
- [ ] Network connectivity is good
- [ ] MongoDB credentials are correct

### If API keys return 401:
- [ ] API keys are correct and not expired
- [ ] Keys are properly added to .env
- [ ] Environment is reloaded after .env change

### If CORS errors:
- [ ] CORS_ORIGIN matches frontend URL exactly
- [ ] Server is restarted after .env change
- [ ] Frontend is using correct backend URL

### If JWT errors:
- [ ] Token is in Authorization header
- [ ] Token format is: `Bearer <token>`
- [ ] Token hasn't expired
- [ ] JWT_SECRET is consistent

---

## 📝 Performance Checklist

- [ ] Response times are acceptable (<500ms)
- [ ] No memory leaks observed
- [ ] Database queries are efficient
- [ ] API endpoints don't timeout

---

## 🎉 Final Verification

- [ ] All files are created ✅
- [ ] All dependencies installed ✅
- [ ] .env configured ✅
- [ ] MongoDB running ✅
- [ ] Server starting successfully ✅
- [ ] All endpoints tested ✅
- [ ] Authentication working ✅
- [ ] External APIs integrated ✅
- [ ] Error handling in place ✅
- [ ] Ready for frontend integration ✅

---

## 📚 Quick Reference

### Start Server
```bash
npm run dev        # Development with auto-reload
npm start          # Production
```

### Test API
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get Movies
curl http://localhost:5000/api/movies/trending

# Get Profile (with token)
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Common Commands
```bash
cd backend              # Enter backend folder
npm install             # Install dependencies
npm run dev             # Start development server
npm start               # Start production server
cp .env.example .env    # Create .env file
```

---

## ✨ You're Ready!

Once all checkboxes are ticked, your CineMind backend is:
- ✅ Fully functional
- ✅ Production-ready
- ✅ Properly documented
- ✅ Ready to integrate with frontend

**Happy coding! 🚀** 🎬

For issues, check the documentation files or troubleshooting section above.
