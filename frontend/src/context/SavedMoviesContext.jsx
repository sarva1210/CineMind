import { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const SavedMoviesContext = createContext();

export const SavedMoviesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinemind_favorites') || '[]');
    } catch { return []; }
  });

  const [watchLater, setWatchLater] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cinemind_watchlater') || '[]');
    } catch { return []; }
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cinemind_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cinemind_watchlater', JSON.stringify(watchLater));
  }, [watchLater]);

  // --- Favorites ---
  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }, []);

  const isFavorite = useCallback((movieId) => {
    return favorites.some((m) => m.id === movieId);
  }, [favorites]);

  // --- Watch Later ---
  const addWatchLater = useCallback((movie) => {
    setWatchLater((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeWatchLater = useCallback((movieId) => {
    setWatchLater((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const toggleWatchLater = useCallback((movie) => {
    setWatchLater((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }, []);

  const isInWatchLater = useCallback((movieId) => {
    return watchLater.some((m) => m.id === movieId);
  }, [watchLater]);

  return (
    <SavedMoviesContext.Provider
      value={{
        favorites,
        watchLater,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        addWatchLater,
        removeWatchLater,
        toggleWatchLater,
        isInWatchLater,
      }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const ctx = useContext(SavedMoviesContext);
  if (!ctx) throw new Error('useSavedMovies must be used within SavedMoviesProvider');
  return ctx;
};
