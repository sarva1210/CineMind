# 🚀 CineMind Backend - Installation & First Run Guide

## Step-by-Step Setup Instructions

### 🎯 Goal
Get your CineMind backend running in under 10 minutes.

---

## Step 1: Prepare Environment Variables

### Get Your API Keys

1. **TMDB API Key** ✅
   - Go to: https://www.themoviedb.org/settings/api
   - Click "Create" to generate new API key
   - Copy the API key

2. **Gemini API Key** ✅
   - Go to: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy the API key

3. **MongoDB URI** ✅
   - **Option A: Local MongoDB**
     ```
     mongodb://localhost:27017/cinemind
     ```
   
   - **Option B: MongoDB Atlas (Cloud)**
     - Go to: https://www.mongodb.com/cloud/atlas
     - Create free cluster
     - Copy connection string
     - Replace `<password>` with your password

4. **JWT Secret** ✅
   - Generate random string (example): `your_super_secret_key_12345_change_in_production`

---

## Step 2: Create Environment File

```bash
# Navigate to backend folder
cd backend

# Copy example file to .env
cp .env.example .env
```

**On Windows (if cp command doesn't work):**
```powershell
Copy-Item .env.example .env
```

---

## Step 3: Configure .env File

Open `backend/.env` in your editor and fill in:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB URI (from Step 1)
MONGO_URI=mongodb://localhost:27017/cinemind

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# TMDB API (from Step 1)
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Gemini API (from Step 1)
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**⚠️ Important:**
- Replace `your_tmdb_api_key_here` with your actual TMDB key
- Replace `your_gemini_api_key_here` with your actual Gemini key
- Replace `your_super_secret_key...` with a random string
- Keep `.env` file private (it's in .gitignore)

---

## Step 4: Install Dependencies

```bash
# From backend folder
npm install
```

This will install all packages listed in package.json:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- axios
- cors
- dotenv
- google-generative-ai

**Expected time:** 2-5 minutes depending on internet speed

---

## Step 5: Start MongoDB

### Option A: Local MongoDB

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB

# Verify it's running
# MongoDB should output on default port 27017
```

**Mac:**
```bash
# Start MongoDB
brew services start mongodb-community

# Verify
brew services list
```

**Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod

# Verify
sudo systemctl status mongod
```

### Option B: MongoDB Atlas (Cloud)

If using cloud MongoDB:
1. Connection string is already in `.env`
2. Just make sure network access is allowed
3. No need to start local service

---

## Step 6: Start the Backend Server

```bash
# Make sure you're in the backend folder
cd backend

# Start development server (with auto-reload)
npm run dev
```

### Expected Output

```
✅ Server running on http://localhost:5000
📝 Environment: development
MongoDB Connected: localhost
```

If you see this, **your backend is running!** 🎉

### Keep Server Running

Keep this terminal open. The server needs to be running for your frontend to connect.

---

## Step 7: Test the Backend (Optional)

### Test 1: Health Check
Open a new terminal and run:

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test 2: Get Trending Movies (No Auth Required)

```bash
curl http://localhost:5000/api/movies/trending
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Trending movies fetched successfully",
  "data": {
    "results": [
      {
        "id": 550,
        "title": "Fight Club",
        "vote_average": 8.8,
        ...
      }
    ]
  }
}
```

### Test 3: Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@test.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Save this token! You'll use it for next tests.**

### Test 4: Get User Profile (Requires Token)

```bash
# Replace TOKEN with token from previous response
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@test.com",
    "preferences": {...},
    "favorites": [],
    "watchHistory": []
  }
}
```

### Test 5: Get AI Recommendations (Requires Token)

```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "message": "I want an action movie"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "AI recommendations generated",
  "data": {
    "message": "I want an action movie",
    "aiResponse": {
      "explanation": "Based on your preference...",
      "movies": [
        {
          "title": "John Wick",
          "year": 2014,
          "reason": "..."
        }
      ]
    }
  }
}
```

---

## ✅ Verification Checklist

After following these steps, verify:

- [ ] Backend folder has `.env` file
- [ ] `.env` file has all required keys
- [ ] MongoDB is running
- [ ] `npm install` completed successfully
- [ ] `npm run dev` started the server
- [ ] Server shows: "✅ Server running on http://localhost:5000"
- [ ] Health check (`/health`) works
- [ ] Can register a user
- [ ] Can get trending movies
- [ ] Can get user profile with token
- [ ] AI chat works

---

## 🎯 Next: Connect Your Frontend

Once backend is running, update your frontend:

1. **Update Frontend API Base URL**
   ```javascript
   // In your frontend config/API file
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

2. **Make API Calls**
   ```javascript
   // Register
   const response = await fetch(`${API_BASE_URL}/auth/register`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'John',
       email: 'john@test.com',
       password: 'pass123'
     })
   });
   ```

3. **Use Token for Protected Routes**
   ```javascript
   // Get profile
   const response = await fetch(`${API_BASE_URL}/users/profile`, {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });
   ```

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if port 5000 is in use
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000

# Kill process using port (if needed)
# Windows:
taskkill /PID <PID> /F

# Mac/Linux:
kill -9 <PID>
```

### MongoDB connection failed
```bash
# Check MongoDB is running
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### API key errors
- Verify `.env` file has correct keys
- Restart server after updating `.env`
- Check API keys aren't expired

### Token errors
- Ensure token is in header as: `Authorization: Bearer <token>`
- Check token hasn't expired
- Get new token by logging in

### CORS errors from frontend
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Default: `http://localhost:5173` (Vite frontend)
- Restart server after change

---

## 📁 Files Created

Your backend now has:

```
backend/
├── src/
│   ├── modules/         # Business logic
│   ├── config/          # Database config
│   ├── middleware/      # Auth & error handling
│   ├── utils/           # Helpers
│   ├── app.js           # Express setup
│   └── server.js        # Server entry
├── .env                 # Environment variables (YOU CREATED)
├── .env.example         # Template
├── .gitignore           # Git ignore
├── package.json         # Dependencies
├── README.md            # Documentation
├── API_DOCUMENTATION.md # API reference
├── QUICKSTART.md        # Quick start
└── SETUP_CHECKLIST.md   # Checklist
```

---

## 🚀 You're All Set!

Your CineMind backend is now:
✅ Installed
✅ Configured
✅ Running
✅ Tested
✅ Ready for frontend integration

### Summary of What You Have:
- Full authentication system
- User profiles & preferences
- TMDB movie integration
- Favorites management
- AI-powered recommendations
- Proper error handling
- Complete documentation

### What's Running:
- Express.js server on `http://localhost:5000`
- MongoDB database connection
- All 12+ API endpoints ready
- Authentication middleware
- Error handling

---

## 📚 Learn More

- **Complete API Reference:** See `API_DOCUMENTATION.md`
- **Endpoints Summary:** See `QUICKSTART.md`
- **Setup Issues:** See `SETUP_CHECKLIST.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

---

## 💡 Pro Tips

1. **Keep server running** while developing frontend
2. **Check server logs** if something fails
3. **Use Postman** for testing API endpoints
4. **Restart server** after updating `.env`
5. **Keep `.env` private** - never commit to git
6. **Regular backups** of your MongoDB
7. **Test endpoints** before connecting frontend

---

## 🎉 Happy Coding!

Your backend is ready to power an amazing movie recommendation app! 🎬✨

**Questions?** Check the documentation files or review the code comments.

**Ready to connect frontend?** Update your frontend's API base URL and start making requests!

---

**Last Updated:** January 2024
**Backend Status:** ✅ Production Ready
