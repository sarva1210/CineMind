# CineMind Backend 🎬

A powerful, production-ready backend for the CineMind movie recommendation application built with Express.js, MongoDB, and AI integration.

## 🎯 Features

### 🔐 Authentication
- User registration with email validation
- JWT-based login
- Password hashing with bcrypt
- Protected routes with middleware
- Token expiration handling

### 👤 User Management
- User profiles with preferences
- Genre and language preferences
- Watch history tracking
- User data persistence

### 🍿 Movie Database
- Integration with TMDB API
- Search movies by title
- Browse trending, popular, and top-rated movies
- Detailed movie information with cast and crew
- YouTube trailer extraction

### ❤️ Favorites System
- Add/remove movies from favorites
- View all favorited movies
- Check favorite status
- Persistent storage per user

### 🤖 AI Recommendations
- Gemini API integration
- Personalized movie suggestions
- Natural language processing
- Context-aware recommendations

### ⚙️ Best Practices
- Clean modular architecture
- Comprehensive error handling
- API response standardization
- CORS enabled
- Environment variable configuration
- MongoDB Mongoose schemas
- Request validation

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- API Keys:
  - TMDB API Key ([Get here](https://www.themoviedb.org/settings/api))
  - Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))

---

## 🚀 Installation

### 1. Clone and Install
```bash
cd backend
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Configure `.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cinemind
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGIN=http://localhost:5173
```

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 5. Run Server
```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

Server will be available at: **http://localhost:5000**

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── authController.js    # Register, Login logic
│   │   └── authRoutes.js         # Auth endpoints
│   ├── user/
│   │   ├── userModel.js          # User schema
│   │   ├── userController.js     # User operations
│   │   └── userRoutes.js         # User endpoints
│   ├── movie/
│   │   ├── movieController.js    # TMDB API calls
│   │   └── movieRoutes.js        # Movie endpoints
│   ├── favorites/
│   │   ├── favoritesController.js # Favorites logic
│   │   └── favoritesRoutes.js    # Favorites endpoints
│   └── ai/
│       ├── aiController.js       # Gemini API integration
│       └── aiRoutes.js           # AI endpoints
├── config/
│   └── db.js                     # MongoDB connection
├── middleware/
│   ├── authMiddleware.js         # JWT verification
│   └── errorHandler.js           # Global error handler
├── utils/
│   └── apiResponse.js            # Response formatting helpers
├── app.js                        # Express app setup
└── server.js                     # Server entry point
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/preferences` - Update preferences
- `POST /api/users/watch-history` - Add to watch history
- `GET /api/users/watch-history` - Get watch history

### Movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top-rated movies
- `GET /api/movies/search?q=` - Search movies
- `GET /api/movies/:id` - Movie details
- `GET /api/movies/:id/trailer` - Movie trailer

### Favorites
- `GET /api/favorites` - Get all favorites
- `POST /api/favorites` - Add to favorites
- `GET /api/favorites/:movieId/check` - Check if favorited
- `DELETE /api/favorites/:movieId` - Remove from favorites

### AI
- `POST /api/ai/chat` - Get AI recommendations

---

## 🔑 Authentication

All protected routes require JWT token in header:

```
Authorization: Bearer <jwt_token>
```

**Example:**
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## 💾 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  preferences: {
    genres: [String],
    languages: [String],
    ratings: String
  },
  watchHistory: [{
    movieId: Number,
    title: String,
    posterPath: String,
    watchedAt: Date
  }],
  favorites: [{
    movieId: Number,
    title: String,
    posterPath: String,
    addedAt: Date
  }],
  timestamps: true
}
```

---

## 🧪 Testing

### Quick Test with cURL

```bash
# 1. Register
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }' | jq -r '.data.token')

echo "Token: $TOKEN"

# 2. Get Profile
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# 3. Get Trending Movies
curl http://localhost:5000/api/movies/trending

# 4. Search Movies
curl "http://localhost:5000/api/movies/search?q=inception"
```

---

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGO_URI` | MongoDB URI | mongodb://localhost:27017/cinemind |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | Token expiration | 7d |
| `TMDB_API_KEY` | TMDB API key | - |
| `TMDB_BASE_URL` | TMDB base URL | https://api.themoviedb.org/3 |
| `GEMINI_API_KEY` | Gemini API key | - |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:5173 |

---

## 🛠️ Scripts

```bash
# Development with auto-reload
npm run dev

# Production mode
npm start

# Install dependencies
npm install

# View logs
npm run dev  # Shows live logs
```

---

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **axios** - HTTP client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **google-generative-ai** - Gemini AI integration

---

## 🚨 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ Environment variable protection
- ✅ Error handling (no sensitive data exposed)
- ✅ MongoDB injection protection (Mongoose)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection refused | Ensure MongoDB is running |
| TMDB 401 error | Invalid API key - get from https://www.themoviedb.org/settings/api |
| Gemini 401 error | Invalid API key - get from https://makersuite.google.com/app/apikey |
| Port already in use | Change PORT in .env or kill process: `lsof -ti:5000` |
| Token errors | Ensure token in `Authorization: Bearer <token>` format |
| CORS errors | Update CORS_ORIGIN in .env to match frontend URL |

---

## 📈 Performance Considerations

- Database indexing on frequently queried fields
- Pagination support for large result sets
- Request validation to prevent invalid data
- Error boundaries to prevent crashes
- Caching of movie details (optional enhancement)

---

## 🚀 Deployment

### Environment Setup for Production

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cinemind
JWT_SECRET=<strong-random-string>
TMDB_API_KEY=<your-key>
GEMINI_API_KEY=<your-key>
CORS_ORIGIN=https://yourdomain.com
```

### Recommended Hosting
- **Backend:** Heroku, Render, Railway, DigitalOcean
- **Database:** MongoDB Atlas
- **Environment:** Node.js 16+

---

## 📝 License

ISC

---

## 🤝 Support

For issues or questions, check:
1. API_DOCUMENTATION.md
2. QUICKSTART.md
3. Check server logs

---

**Happy Coding! 🚀**

Build something amazing with CineMind! 🎬✨
