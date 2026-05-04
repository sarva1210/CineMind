# CineMind Frontend

A modern, AI-powered movie discovery platform built with React, Vite, and Tailwind CSS. Features a beautiful glassmorphism UI with Framer Motion animations.

## 🚀 Features

- **Modern Dark Theme** - Anti-gravity UI with glassmorphism effects
- **AI-Powered Recommendations** - Chat with AI assistant for personalized suggestions
- **User Authentication** - Secure login/register with JWT tokens
- **Movie Discovery** - Browse trending, recommended, and search for movies
- **Favorites Management** - Save and manage your favorite movies
- **Watch History** - Track movies you've watched
- **Responsive Design** - Mobile-first, works on all devices
- **Smooth Animations** - Framer Motion animations throughout

## 📋 Tech Stack

- **React 19** - Latest React with latest features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Beautiful icon library

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar with auth state
│   │   ├── MovieCard.jsx           # Reusable movie card component
│   │   ├── TrailerModal.jsx        # Modal for video trailers
│   │   ├── ChatBox.jsx             # AI chat interface
│   │   └── Loader.jsx              # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx                # Trending & recommended movies
│   │   ├── MovieDetails.jsx        # Full movie details with cast
│   │   ├── Search.jsx              # Movie search functionality
│   │   ├── Favorites.jsx           # Saved favorite movies
│   │   ├── Assistant.jsx           # AI chat page
│   │   ├── Login.jsx               # Login form
│   │   ├── Register.jsx            # Registration form
│   │   └── Profile.jsx             # User profile & settings
│   ├── services/
│   │   └── api/
│   │       ├── axios.js            # Axios instance with interceptors
│   │       ├── authApi.js          # Authentication endpoints
│   │       ├── movieApi.js         # Movie endpoints
│   │       ├── aiApi.js            # AI chat endpoints
│   │       └── favoritesApi.js     # Favorites & history endpoints
│   ├── context/
│   │   └── AuthContext.jsx         # Global auth state management
│   ├── hooks/
│   │   └── useAuth.js              # Custom auth hook
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles & Tailwind directives
├── public/
├── package.json
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.js                  # Vite configuration
└── .env.local                      # Environment variables
```

## 🔧 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env.local`
   - Update `VITE_API_URL` if your backend is on a different URL
   ```bash
   cp .env.example .env.local
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📡 API Integration

All API calls use Axios with automatic JWT token injection. The backend should provide these endpoints:

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get current user
- `PUT /profile` - Update user profile

### Movies (`/api/movies`)
- `GET /trending` - Get trending movies
- `GET /recommended` - Get recommended movies
- `GET /top-rated` - Get top-rated movies
- `GET /search?q=query` - Search movies
- `GET /:id` - Get movie details
- `GET /:id/cast` - Get movie cast
- `GET /:id/trailer` - Get trailer info
- `GET /:id/reviews` - Get movie reviews

### Favorites & History (`/api`)
- `GET /favorites` - Get user's favorite movies
- `POST /favorites` - Add to favorites
- `DELETE /favorites/:id` - Remove from favorites
- `GET /watch-history` - Get watch history
- `POST /watch-history` - Add to watch history

### AI Chat (`/api/ai`)
- `POST /chat` - Send message to AI
- `GET /conversations` - Get chat history
- `GET /conversations/:id` - Get specific conversation
- `POST /recommendations` - Get AI recommendations
- `POST /analyze-movie` - Analyze movie by preferences
- `GET /personalized-suggestions` - Get personalized suggestions

## 🔐 Authentication Flow

1. **User Registration**
   - Fills form with username, email, password
   - Calls `/api/auth/register`
   - Auto-login on success
   - Redirects to home

2. **User Login**
   - Fills form with email, password
   - Calls `/api/auth/login`
   - JWT token stored in localStorage
   - Axios interceptor adds token to all requests

3. **Token Persistence**
   - AuthContext checks localStorage on mount
   - Restores session automatically
   - 401 responses trigger logout & redirect to login

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#a855f7) & Blue (#3b82f6)
- **Background**: Black (#000000)
- **Text**: White with gray gradients
- **Accents**: Neon purple/blue glow effects

### Animations
- **Hover Effects**: Scale and glow on card hover
- **Float Animation**: Smooth floating for backgrounds
- **Transitions**: Smooth color and property transitions
- **Modals**: Fade and scale animations

### Components
- **Glassmorphism**: Transparent cards with blur effect
- **Gradients**: Linear gradients for depth
- **Shadows**: Subtle box shadows with color glow
- **Borders**: Colored borders with transparency

## 🔌 Using Components

### MovieCard
```jsx
<MovieCard 
  movie={movieData} 
  onFavoriteChange={handleFavoriteUpdate}
/>
```

### TrailerModal
```jsx
<TrailerModal
  isOpen={showTrailer}
  trailer={trailerData}
  movieTitle="Movie Name"
  onClose={() => setShowTrailer(false)}
/>
```

### ChatBox
```jsx
<ChatBox />
```

### useAuth Hook
```jsx
import { useAuth } from './hooks/useAuth';

function Component() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
}
```

## 🚀 Performance Optimization

- **Code Splitting**: Routes are lazy-loaded
- **Image Optimization**: Images use object-cover for consistent sizing
- **Animation Optimization**: Uses Framer Motion for GPU acceleration
- **Bundle Size**: ~150KB gzipped

## 🐛 Error Handling

All API calls include error boundaries:
- API errors show user-friendly messages
- Loading states prevent duplicate requests
- 401 errors automatically logout user
- Network errors are caught and displayed

## 📱 Responsive Design

- **Mobile**: Single column, full-width
- **Tablet**: 2-3 column grid
- **Desktop**: 4+ column grid
- **Large**: Max-width container with padding

## 🔄 State Management

- **Auth State**: Context API with localStorage persistence
- **Page State**: useState for local component state
- **API Cache**: Consider Redux for advanced caching

## 📝 Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and sorting
- [ ] User reviews and ratings
- [ ] Watch list and ratings sync
- [ ] Social sharing features
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Advanced caching strategy

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React & Tailwind CSS**
