import rawMovies from "./movies/movies-2026.json";
import type { BaseMovie } from "../utils/types";

// Cast the imported JSON to BaseMovie[] since we know it matches the structure
export const movies = rawMovies as BaseMovie[];

export const getMovieById = (id: string): BaseMovie | undefined =>
  movies.find((m) => m.id === id);
