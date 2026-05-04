# 🚀 CineMind Frontend - Quick Start Guide

Get your CineMind frontend up and running in 3 minutes!

## ⚡ Quick Setup

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Configure Environment
Make sure `.env.local` has the correct backend URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser! 🎉

---

## 📁 What You Get

### Pages
- **Home** (`/`) - Trending & recommended movies
- **Search** (`/search`) - Search movies by query
- **MovieDetails** (`/movie/:id`) - Full movie info with cast & trailer
- **Favorites** (`/favorites`) - Your saved movies (requires login)
- **Assistant** (`/assistant`) - AI chat for recommendations (requires login)
- **Profile** (`/profile`) - Your profile & watch history (requires login)
- **Login** (`/login`) - User login
- **Register** (`/register`) - New user registration

### Components
- **Navbar** - Navigation & auth state
- **MovieCard** - Movie display with favorites
- **TrailerModal** - Embedded video player
- **ChatBox** - AI chat interface
- **Loader** - Loading spinner

### Features
✅ User Authentication (Login/Register)
✅ Movie Discovery (Browse & Search)
✅ Favorites Management
✅ AI Chat Assistant
✅ Watch History
✅ Beautiful Glassmorphism UI
✅ Smooth Animations
✅ Responsive Design
✅ Error Handling

---

## 🔧 Development Commands

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📚 File Structure

```
src/
├── pages/              # 8 page components
├── components/         # 5 reusable components
├── services/api/       # 4 API service files
├── context/            # AuthContext for global state
├── hooks/              # useAuth custom hook
├── utils/              # Helper functions & constants
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## 🌐 API Endpoints Used

Backend should provide these endpoints:

```
POST   /api/auth/register           # Register user
POST   /api/auth/login              # Login user
GET    /api/auth/profile            # Get user profile
PUT    /api/auth/profile            # Update profile

GET    /api/movies/trending         # Trending movies
GET    /api/movies/recommended      # Recommended movies
GET    /api/movies/search?q=query   # Search movies
GET    /api/movies/:id              # Movie details
GET    /api/movies/:id/cast         # Movie cast
GET    /api/movies/:id/trailer      # Trailer info

GET    /api/favorites               # User's favorites
POST   /api/favorites               # Add to favorites
DELETE /api/favorites/:id           # Remove from favorites

GET    /api/watch-history           # Watch history
POST   /api/watch-history           # Add to history

POST   /api/ai/chat                 # Send message to AI
GET    /api/ai/conversations        # Chat history
POST   /api/ai/recommendations      # AI recommendations
```

---

## 🎯 Key Features Walkthrough

### 1. User Authentication
```javascript
// Automatically handled by AuthContext
// Login -> Token stored -> Auto-injected in requests
// Logout -> Token cleared -> Redirected to login
```

### 2. Movie Discovery
```javascript
// Browse trending & recommended movies
// Search by query
// View full details with cast & trailer
```

### 3. Favorites System
```javascript
// Add/remove movies from favorites
// View all saved movies
// Heart icon toggles favorite status
```

### 4. AI Chat
```javascript
// Real-time chat with AI assistant
// Get movie recommendations
// See suggested movies in chat
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      purple: '#a855f7',
      blue: '#3b82f6',
    }
  }
}
```

### Change Backend URL
Edit `.env.local`:
```env
VITE_API_URL=your-backend-url
```

### Modify Animations
Edit `src/index.css`:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(20px); }
}
```

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check backend is running on port 5000
- Verify `VITE_API_URL` in `.env.local`
- Check CORS headers in backend

### "Styles not loading"
- Ensure Tailwind CSS is installed
- Check `npm install` completed successfully
- Restart dev server

### "Authentication not working"
- Check localStorage in DevTools
- Verify JWT token format
- Check Axios interceptor in `services/api/axios.js`

### "Blank page on load"
- Open browser console (F12)
- Check for JavaScript errors
- Try clearing browser cache (Ctrl+Shift+Delete)

---

## 📖 Full Documentation

For detailed information, see:
- **SETUP.md** - Complete setup & features
- **INTEGRATION.md** - Architecture & integration guide
- **IMPLEMENTATION_SUMMARY.md** - What's implemented

---

## 🎉 You're Ready!

Your CineMind frontend is ready to connect with your backend API.

**Next Steps:**
1. ✅ Start dev server (`npm run dev`)
2. ✅ Open http://localhost:5173
3. ✅ Test registration & login
4. ✅ Browse movies
5. ✅ Connect with your backend

---

## 📊 Tech Stack Summary

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI Framework | 19.2.5 |
| Vite | Build Tool | 8.0.10 |
| Tailwind CSS | Styling | 3.4.0 |
| React Router | Routing | 6.20.0 |
| Axios | HTTP Requests | 1.6.0 |
| Framer Motion | Animations | 10.16.4 |
| React Icons | Icons | 4.12.0 |

---

## 💡 Pro Tips

1. **Use DevTools** - React DevTools for component inspection
2. **Check Console** - Errors and logs visible in browser console
3. **Throttle Network** - Test slow connections (Chrome DevTools)
4. **Mobile View** - Test responsive design (F12 > Device Toolbar)
5. **localStorage** - Check auth state in Application tab

---

## 🚀 Production Deployment

When ready to deploy:

```bash
# Build optimized bundle
npm run build

# Creates 'dist' folder with optimized files
# Deploy 'dist' folder to your hosting

# Popular hosting options:
# - Vercel (automatic deployments from GitHub)
# - Netlify (drag & drop or GitHub integration)
# - AWS S3 + CloudFront
# - GitHub Pages
```

---

**Happy coding! 🎬✨**

Questions? Check the docs or open an issue!
