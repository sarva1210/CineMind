# CineMind Frontend - Complete Integration Guide

## 🎯 Architecture Overview

The CineMind frontend follows a modern, scalable architecture with clear separation of concerns:

```
User Interface (Pages & Components)
         ↓
State Management (Context & Hooks)
         ↓
API Services (Axios Instances)
         ↓
Backend API
```

## 📊 Data Flow

### Authentication Flow

```
Login/Register Page
    ↓
User submits credentials
    ↓
AuthContext.login/register()
    ↓
authApi.login/register()
    ↓
Axios POST request
    ↓
Backend response (token + user)
    ↓
localStorage.setItem(token, user)
    ↓
Axios interceptor adds token to future requests
    ↓
Redirect to home
```

### Movie Data Flow

```
Home/Search/Favorites Page
    ↓
useEffect(() => fetchMovies())
    ↓
movieApi.getTrending/Search/Favorites()
    ↓
Axios GET request (with JWT token)
    ↓
Backend returns movies array
    ↓
setState(movies)
    ↓
Render MovieCard for each movie
```

### Favorites Management

```
MovieCard
    ↓
User clicks favorite button
    ↓
Check if user is authenticated
    ↓
favoritesApi.addFavorite/removeFavorite()
    ↓
Axios POST/DELETE request
    ↓
Update local state
    ↓
Visual feedback (heart icon)
    ↓
Optional: Refetch favorites list
```

## 🔑 Key Components & Their Roles

### Context & State Management

**AuthContext.jsx**
- Manages global authentication state
- Persists user data to localStorage
- Provides login, register, logout functions
- Handles profile updates
- Initial state restoration on app mount

```javascript
// Usage in any component
const { user, token, isAuthenticated, login, logout } = useAuth();
```

### Services & API

**axios.js**
- Base Axios instance with API_BASE_URL
- Request interceptor: adds JWT token to Authorization header
- Response interceptor: handles 401 errors, redirects to login
- Automatically parses JSON responses

**API Service Files** (authApi, movieApi, aiApi, favoritesApi)
- Encapsulates API endpoints
- Handles error responses
- Stores token/user in localStorage on successful auth
- Returns parsed response data

```javascript
// Example: Using movieApi
const movies = await movieApi.getTrending(page);
const movie = await movieApi.getMovieById(id);
const results = await movieApi.searchMovies(query);
```

### Components

**Navbar**
- Displays navigation links based on authentication state
- Shows user profile button when authenticated
- Mobile responsive with collapsible menu
- Uses React Router for navigation

**MovieCard**
- Displays movie poster, title, rating
- Favorite button with async operations
- Hover animations with Framer Motion
- Click to navigate to MovieDetails

**TrailerModal**
- Shows embedded YouTube player
- Supports both youtube URLs and video keys
- Smooth open/close animations
- Prevents body scroll when open

**ChatBox**
- Real-time message UI
- Scrolls to latest message
- Sends messages with loading state
- Displays suggested movies from AI

**Loader**
- Spinner animation with Framer Motion
- Full screen or embedded options
- Three rotating rings effect

## 🔄 Common Use Cases

### 1. User Login
```javascript
// In Login.jsx
const handleLogin = async (email, password) => {
  try {
    const result = await login(email, password);
    navigate('/'); // AuthContext updates, navbar reflects auth state
  } catch (error) {
    setError(error.message);
  }
};
```

### 2. Fetching Movies
```javascript
// In Home.jsx
useEffect(() => {
  const fetchMovies = async () => {
    try {
      const res = await movieApi.getTrending(1);
      setMovies(res.movies || res);
    } catch (err) {
      setError(err.message);
    }
  };
  fetchMovies();
}, []);
```

### 3. Adding to Favorites
```javascript
// In MovieCard.jsx
const handleFavourite = async () => {
  if (!user) {
    navigate('/login');
    return;
  }
  
  try {
    await favoritesApi.addFavorite(movie.id);
    setIsFavorite(true);
    onFavoriteChange?.(); // Refresh parent list if needed
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 4. Searching Movies
```javascript
// In Search.jsx
const performSearch = async (query) => {
  try {
    const res = await movieApi.searchMovies(query, 1);
    setResults(res.movies || res);
  } catch (err) {
    setError(err.message);
  }
};
```

### 5. AI Chat
```javascript
// In ChatBox.jsx
const handleSendMessage = async (message) => {
  try {
    const response = await aiApi.sendMessage(message, conversationId);
    setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
    if (response.conversationId) setConversationId(response.conversationId);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🛡️ Error Handling Strategy

### API Errors
```javascript
try {
  const data = await movieApi.getTrending();
} catch (error) {
  // error.response?.data - Backend error message
  // error.response?.status - HTTP status code
  // error.message - General error message
  setError(getErrorMessage(error));
}
```

### 401 Unauthorized
- Axios interceptor catches 401 responses
- Clears localStorage (token, user)
- Redirects to /login
- User must re-authenticate

### Network Errors
- No internet: error.message = "Network Error"
- Caught and displayed to user
- User can retry action

## 📦 State Management Patterns

### Local Component State (useState)
```javascript
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

### Global Auth State (Context)
```javascript
const { user, isAuthenticated, token } = useAuth();
```

### URL Parameters (useSearchParams)
```javascript
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q');
```

### Route Parameters (useParams)
```javascript
const { id } = useParams(); // From URL like /movie/:id
```

## 🔐 Security Features

### JWT Token Management
- Token stored in localStorage
- Automatically added to requests via interceptor
- Removed on logout or 401 response
- Sent only in Authorization header

### Protected Routes
- Favorites, Assistant, Profile pages check isAuthenticated
- Unauthenticated users redirected to /login
- Personal data only shown to logged-in users

### Input Validation
- Forms validate before submission
- Password strength checked
- Email format validated
- Required fields enforced

## 🎨 Styling Architecture

### Tailwind CSS
- Utility-first approach
- Custom colors for purple/blue theme
- Responsive classes for mobile/tablet/desktop
- Dark mode enabled by default

### Framer Motion
- Component animations on mount
- Hover effects on interactive elements
- Modal transitions
- Scroll-triggered animations

### Custom CSS (index.css)
- Global reset and font setup
- Custom scrollbar styling
- Animation keyframes
- Utility classes for common patterns

## 📱 Responsive Design

```
Mobile (< 640px)
- Single column grid
- Full width components
- Touch-friendly sizes

Tablet (640px - 1024px)
- 2-3 column grid
- Adjusted padding/margins
- Optimized touch targets

Desktop (> 1024px)
- 4+ column grid
- Max-width container
- Full feature set
```

## 🚀 Performance Optimization

### Code Splitting
- Routes lazy-loaded (automatic with React Router)
- Heavy components loaded on demand

### Image Optimization
- use object-cover for consistent sizing
- Placeholder images for loading state
- Cached by browser

### Network Requests
- Debounced search input
- Pagination for large lists
- Conditional API calls in useEffect

### Bundle Size
- Tree-shaking removes unused code
- Minified in production build
- Gzipped for transfer

## 🧪 Testing Checklist

### Authentication
- [ ] Register with new account
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout clears session
- [ ] Page refresh maintains auth
- [ ] 401 redirects to login

### Movies
- [ ] Home loads trending movies
- [ ] MovieCard hover animation works
- [ ] Click MovieCard navigates to details
- [ ] MovieDetails shows full info
- [ ] Trailer button opens modal
- [ ] Search returns results

### Favorites
- [ ] Add movie to favorites
- [ ] Remove movie from favorites
- [ ] Favorites page loads
- [ ] Favorite button toggles correctly
- [ ] Unauthenticated users redirected

### Chat
- [ ] Chat loads
- [ ] Send message works
- [ ] AI response appears
- [ ] Suggested movies show
- [ ] Messages auto-scroll

### Navigation
- [ ] Navbar links work
- [ ] Mobile menu opens/closes
- [ ] Auth buttons update
- [ ] Logo redirects to home

## 📚 Useful Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint

# Install dependencies
npm install

# Add new package
npm install package-name
```

## 🔗 API Contract Example

### Expected Response Format

```javascript
// Success Response
{
  success: true,
  data: { /* data */ },
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: "Error message",
  statusCode: 400
}

// Array Response (Movies)
{
  movies: [ /* array of movies */ ],
  total: 100,
  page: 1,
  totalPages: 5
}
```

## 💡 Best Practices

### Component Organization
- One responsibility per component
- Props for configuration
- Children for composition
- Hooks for logic

### State Management
- Keep state as local as possible
- Lift state only when necessary
- Use Context for global state
- Avoid prop drilling

### Error Handling
- Try-catch for async operations
- User-friendly error messages
- Fallback UI for failed states
- Log errors for debugging

### Performance
- Memoize expensive computations
- Lazy load images and routes
- Avoid unnecessary re-renders
- Optimize animations

### Code Quality
- Consistent naming conventions
- Meaningful variable names
- Comments for complex logic
- DRY principle (Don't Repeat Yourself)

---

## 📞 Troubleshooting

**Problem: "Cannot read property 'token' of undefined"**
- Solution: Ensure AuthProvider wraps the app in App.jsx

**Problem: API requests fail with 401**
- Solution: Check backend is running and JWT token is valid

**Problem: Styles not applying**
- Solution: Ensure Tailwind CSS is installed and configured

**Problem: Animations jerky**
- Solution: Check GPU acceleration, reduce animation complexity

**Problem: Blank page on load**
- Solution: Check browser console for errors, verify Vite config

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
