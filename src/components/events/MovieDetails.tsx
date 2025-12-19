import React, { useMemo } from 'react';
import type { MovieCredits, MovieAnniversary } from '../../types/movie';

interface MovieDetailsProps {
  credits: MovieCredits;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ credits }) => {
  const currentYear = new Date().getFullYear();

  // Get anniversaries (movies released 5, 10, 15, etc. years ago)
  const anniversaries = useMemo<MovieAnniversary[]>(() => {
    const result: MovieAnniversary[] = [];
    
    // Process cast movies
    credits.cast.forEach(movie => {
      if (!movie.release_date) return;
      
      const releaseYear = new Date(movie.release_date).getFullYear();
      const yearsAgo = currentYear - releaseYear;
      
      // Check for anniversaries (5, 10, 15, etc. years)
      if (yearsAgo > 0 && yearsAgo % 5 === 0) {
        result.push({
          movie,
          years: yearsAgo,
          type: 'anniversary'
        });
      }
      
      // Add release year info
      result.push({
        movie,
        years: releaseYear,
        type: 'release'
      });
    });
    
    return result.sort((a, b) => {
      // Sort by years (newest first)
      return b.years - a.years;
    });
  }, [credits, currentYear]);

  // Group movies by year
  const moviesByYear = useMemo(() => {
    const years: Record<number, MovieAnniversary[]> = {};
    
    anniversaries.forEach(item => {
      const year = item.type === 'release' 
        ? new Date(item.movie.release_date).getFullYear()
        : currentYear - item.years;
      
      if (!years[year]) {
        years[year] = [];
      }
      
      years[year].push(item);
    });
    
    return years;
  }, [anniversaries, currentYear]);

  // Get top 5 most popular movies
  const topMovies = useMemo(() => {
    return [...credits.cast]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
  }, [credits.cast]);

  return (
    <div className="space-y-8 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">🎬 Movie Details</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">🎂 Anniversaries This Year</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anniversaries
              .filter(item => item.type === 'anniversary')
              .slice(0, 6)
              .map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="font-semibold">{item.movie.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.years} Year{item.years > 1 ? 's' : ''} Anniversary
                  </div>
                  <div className="text-xs text-gray-500">
                    Released: {new Date(item.movie.release_date).getFullYear()}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">🌟 Top Movies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topMovies.map((movie) => (
              <div key={movie.id} className="border rounded-lg overflow-hidden">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No poster</span>
                  </div>
                )}
                <div className="p-3">
                  <div className="font-semibold truncate">{movie.title}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(movie.release_date).getFullYear()}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm">
                      {movie.vote_average.toFixed(1)} ({movie.vote_count})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">📅 Movies by Year</h3>
          {Object.entries(moviesByYear)
            .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
            .map(([year, movies]) => (
              <div key={year} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">{year}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {movies.map((item, index) => (
                    <div key={index} className="border rounded p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{item.movie.title}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {item.type === 'anniversary' 
                            ? `${item.years} Year${item.years > 1 ? 's' : ''}`
                            : 'Released'}
                        </span>
                      </div>
                      {'character' in item.movie && item.movie.character && (
                        <div className="text-sm text-gray-600">as {item.movie.character}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        {item.movie.overview.length > 100
                          ? `${item.movie.overview.substring(0, 100)}...`
                          : item.movie.overview}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
