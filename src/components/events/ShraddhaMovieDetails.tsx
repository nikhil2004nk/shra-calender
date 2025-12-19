// src/components/events/ShraddhaMovieDetails.tsx
import React from 'react';

export interface ShraddhaMovie {
  id: string;
  title: string;
  date: string;
  type: string;
  original_language: string;
  description: string;
  imageUrl: string;
  director: string;
  cast: string[];
  character_name: string;
  box_office: string;
  duration: number;
  isMovie: boolean;
}

interface ShraddhaMovieDetailsProps {
  movie: ShraddhaMovie;
}

const ShraddhaMovieDetails: React.FC<ShraddhaMovieDetailsProps> = ({ movie }) => {
  const releaseYear = new Date(movie.date).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsSinceRelease = currentYear - releaseYear;
  const isUpcoming = new Date(movie.date) > new Date();

  return (
    <div className="bg-slate-50 rounded-lg shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-sm border border-slate-200">
            <img
              src={movie.imageUrl || '/images/movie-poster-placeholder.jpg'}
              alt={`${movie.title} poster`}
              className="w-full h-auto object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/movie-poster-placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">{movie.title}</h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <span>{releaseYear}</span>
              <span>•</span>
              <span>{movie.original_language.toUpperCase()}</span>
              {movie.duration > 0 && (
                <>
                  <span>•</span>
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                </>
              )}
              {!isUpcoming && (
                <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-100">
                  {yearsSinceRelease} {yearsSinceRelease === 1 ? 'Year' : 'Years'} Since Release
                </span>
              )}
              {isUpcoming && (
                <span className="ml-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs border border-emerald-100">
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Box Office */}
          {movie.box_office && movie.box_office !== 'TBA' && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="text-xs font-medium text-blue-600">Box Office</div>
              <div className="text-lg font-semibold text-blue-800">{movie.box_office}</div>
            </div>
          )}

          {/* Synopsis */}
          <div className="pt-2">
            <h3 className="text-base font-medium text-slate-800 mb-1">Synopsis</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{movie.description}</p>
          </div>

          {/* Director and Character */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {movie.director && (
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Director</h4>
                <p className="text-slate-800 mt-1">{movie.director}</p>
              </div>
            )}
            {movie.character_name && (
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Character</h4>
                <p className="text-slate-800 mt-1">{movie.character_name}</p>
              </div>
            )}
          </div>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Cast</h4>
              <div className="flex flex-wrap gap-2">
                {movie.cast.slice(0, 5).map((actor, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full border border-slate-200"
                  >
                    {actor}
                  </span>
                ))}
                {movie.cast.length > 5 && (
                  <span className="inline-flex items-center text-xs text-slate-400">
                    +{movie.cast.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Release Date</h4>
                <p className="text-slate-800 mt-1">
                  {new Date(movie.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {movie.type && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Type</h4>
                  <p className="text-slate-800 mt-1 capitalize">{movie.type}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShraddhaMovieDetails;