export interface Movie {
  id: string;
  name: string;
  releaseDate: string;
  genre: string;
  rating?: number;
  posterUrl?: string;
}

export const movies: Movie[] = [
  {
    id: 'm1',
    name: 'Avatar 3',
    releaseDate: '2025-12-15',
    genre: 'Sci-Fi/Action',
    rating: 4.8,
    posterUrl: 'https://example.com/avatar3.jpg'
  },
  {
    id: 'm2',
    name: 'The Marvels',
    releaseDate: '2025-12-22',
    genre: 'Action/Adventure',
    rating: 4.5,
    posterUrl: 'https://example.com/marvels.jpg'
  },
  {
    id: 'm3',
    name: 'Wonka',
    releaseDate: '2025-12-08',
    genre: 'Fantasy/Musical',
    rating: 4.2,
    posterUrl: 'https://example.com/wonka.jpg'
  },
  {
    id: 'm4',
    name: 'Aquaman and the Lost Kingdom',
    releaseDate: '2025-12-20',
    genre: 'Action/Adventure',
    rating: 4.3,
    posterUrl: 'https://example.com/aquaman2.jpg'
  },
  {
    id: 'm5',
    name: 'The Color Purple',
    releaseDate: '2025-12-25',
    genre: 'Drama/Musical',
    rating: 4.7,
    posterUrl: 'https://example.com/colorpurple.jpg'
  }
];
