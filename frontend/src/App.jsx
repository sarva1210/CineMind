import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SavedMoviesProvider } from './context/SavedMoviesContext';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import WatchLater from './pages/WatchLater';
import Assistant from './pages/Assistant';
import PersonPage from './pages/PersonPage';

function App() {
  return (
    <SavedMoviesProvider>
      <Router>
        <div className="bg-black text-white min-h-screen transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/person/:id" element={<PersonPage />} />
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </SavedMoviesProvider>
  );
}

export default App;