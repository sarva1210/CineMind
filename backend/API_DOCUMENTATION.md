# CineMind Backend API Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` File
Copy `.env.example` to `.env` and fill in your API keys:
```bash
cp .env.example .env
```

Update these values:
- `MONGO_URI` - MongoDB connection string
- `TMDB_API_KEY` - Get from https://www.themoviedb.org/settings/api
- `GEMINI_API_KEY` - Get from https://makersuite.google.com/app/apikey
- `JWT_SECRET` - Any strong random string

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run the Server
**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### 🔐 Authentication Module (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 👤 User Module (`/api/users`)

**Note:** All user endpoints require authentication. Include header:
```
Authorization: Bearer <jwt_token>
```

#### Get User Profile
```
GET /api/users/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "genres": ["Action", "Thriller"],
      "languages": ["English"],
      "ratings": "PG-13"
    },
    "favorites": [],
    "watchHistory": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update Preferences
```
PUT /api/users/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "genres": ["Action", "Comedy", "Drama"],
  "languages": ["English", "Hindi"],
  "ratings": "PG-13"
}

Response: Updated user object
```

#### Add to Watch History
```
POST /api/users/watch-history
Authorization: Bearer <token>
Content-Type: application/json

{
  "movieId": 550,
  "title": "Fight Club",
  "posterPath": "/path/to/poster.jpg"
}

Response: Updated user object
```

#### Get Watch History
```
GET /api/users/watch-history
Authorization: Bearer <token>

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Watch history retrieved successfully",
  "data": [
    {
      "movieId": 550,
      "title": "Fight Club",
      "posterPath": "/path/to/poster.jpg",
      "watchedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 🎬 Movie Module (`/api/movies`)

#### Get Trending Movies
```
GET /api/movies/trending?page=1&timeWindow=week
Parameters:
  - page (optional): Page number (default: 1)
  - timeWindow (optional): 'day' or 'week' (default: 'week')

Response: TMDB response with trending movies
```

#### Get Popular Movies
```
GET /api/movies/popular?page=1

Response: TMDB response with popular movies
```

#### Get Top Rated Movies
```
GET /api/movies/top-rated?page=1

Response: TMDB response with top-rated movies
```

#### Search Movies
```
GET /api/movies/search?q=inception&page=1
Parameters:
  - q (required): Search query
  - page (optional): Page number (default: 1)

Response: TMDB search results
```

#### Get Movie Details
```
GET /api/movies/550

Response: Detailed movie information including credits and videos
{
  "id": 550,
  "title": "Fight Club",
  "overview": "...",
  "poster_path": "/path/to/poster.jpg",
  "backdrop_path": "/path/to/backdrop.jpg",
  "release_date": "1999-10-15",
  "vote_average": 8.8,
  "runtime": 139,
  "genres": [
    { "id": 18, "name": "Drama" }
  ],
  "credits": {
    "cast": [...],
    "crew": [...]
  },
  "videos": {
    "results": [...]
  }
}
```

#### Get Movie Trailer
```
GET /api/movies/550/trailer

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Trailer fetched successfully",
  "data": {
    "id": "trailer_id",
    "key": "youtube_video_id",
    "name": "Fight Club Official Trailer",
    "type": "Trailer",
    "site": "YouTube",
    "url": "https://www.youtube.com/watch?v=youtube_video_id"
  }
}
```

---

### ❤️ Favorites Module (`/api/favorites`)

**Note:** All endpoints require authentication.

#### Get All Favorites
```
GET /api/favorites
Authorization: Bearer <token>

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Favorites retrieved successfully",
  "data": [
    {
      "movieId": 550,
      "title": "Fight Club",
      "posterPath": "/path/to/poster.jpg",
      "addedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Add to Favorites
```
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "movieId": 550,
  "title": "Fight Club",
  "posterPath": "/path/to/poster.jpg"
}

Response: Updated favorites array
```

#### Check if Movie is Favorite
```
GET /api/favorites/550/check
Authorization: Bearer <token>

Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "isFavorite": true
  }
}
```

#### Remove from Favorites
```
DELETE /api/favorites/550
Authorization: Bearer <token>

Response: Updated favorites array
```

---

### 🤖 AI Module (`/api/ai`)

**Note:** Requires authentication.

#### Get AI Movie Recommendations
```
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "I want a thriller movie with good plot twists"
}

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "AI recommendations generated",
  "data": {
    "message": "I want a thriller movie with good plot twists",
    "aiResponse": {
      "explanation": "Based on your preference for thrillers with plot twists...",
      "movies": [
        {
          "title": "The Usual Suspects",
          "year": 1995,
          "reason": "Iconic twist ending with masterful storytelling"
        },
        {
          "title": "Inception",
          "year": 2010,
          "reason": "Mind-bending plot with multiple layers and surprises"
        }
      ]
    }
  }
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (Invalid/Missing token)
- `404` - Not Found
- `500` - Server Error

---

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  preferences: {
    genres: [String],
    languages: [String],
    ratings: String (enum: G, PG, PG-13, R, NC-17)
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
  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables Reference

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/cinemind

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# TMDB API
TMDB_API_KEY=your_tmdb_key
TMDB_BASE_URL=https://api.themoviedb.org/3

# AI API
GEMINI_API_KEY=your_gemini_key

# CORS
CORS_ORIGIN=http://localhost:5173
```

---

## Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/          # Authentication (register, login)
│   │   ├── user/          # User profile & preferences
│   │   ├── movie/         # Movie data from TMDB
│   │   ├── favorites/     # Favorite movies management
│   │   └── ai/            # AI recommendations
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorHandler.js     # Global error handling
│   ├── utils/
│   │   └── apiResponse.js      # Response formatting
│   ├── app.js             # Express app setup
│   └── server.js          # Server entry point
├── .env.example
├── package.json
└── .gitignore
```

---

## Key Features

✅ **User Authentication**
- Register with email and password
- Login and JWT token generation
- Password hashing with bcrypt

✅ **User Management**
- Get profile information
- Store genre and language preferences
- Track watch history

✅ **Movie Data**
- Fetch from TMDB API
- Search movies
- Get trending, popular, and top-rated movies
- Retrieve detailed movie information
- Extract YouTube trailer links

✅ **Favorites Management**
- Add/remove favorite movies
- View all favorites
- Check if movie is favorited

✅ **AI Integration**
- Chat endpoint with Gemini API
- Get personalized movie recommendations
- Consider user preferences in recommendations

---

## Testing API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Trending Movies (no auth needed)
curl http://localhost:5000/api/movies/trending

# Search Movies
curl "http://localhost:5000/api/movies/search?q=inception"

# Get Profile (replace TOKEN with your JWT)
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"

# Get AI Recommendations
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "message": "I want an action movie"
  }'
```

---

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Default: `mongodb://localhost:27017/cinemind`

### TMDB API Error
- Get API key from https://www.themoviedb.org/settings/api
- Add to `.env` as `TMDB_API_KEY`

### Gemini API Error
- Get API key from https://makersuite.google.com/app/apikey
- Add to `.env` as `GEMINI_API_KEY`

### JWT Errors
- Ensure token is passed in `Authorization: Bearer <token>` header
- Check token hasn't expired
- Update `JWT_SECRET` if needed

---

## License
ISC

---

**Happy Coding! 🚀**
