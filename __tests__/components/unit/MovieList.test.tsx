import React from 'react';
import { render } from '@testing-library/react-native';
import MovieList from '@/components/movies/MovieList';
import { Movie } from '@/types/movieInterfaces';
import { useDispatch, useSelector } from 'react-redux';

const mockDispatch = useDispatch as unknown as jest.Mock;

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
  }));

  jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
  jest.mock('@/components/movies/skeleton/MovieList.skeleton', () => "MovieListSkeleton");

  jest.mock('react-redux', () => ({
      useDispatch: jest.fn(),
      useSelector: jest.fn(),
    }));
  
    beforeEach(() => {
      (useDispatch as unknown as  jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
        selector({ favourites: { ids: [] } }) 
      );
    });
    

const mockMovies: Movie[] = [
  {
      id: "1", title: 'Movie One', poster_path: '/path1.jpg', vote_average: 8, release_date: '2022-01-01',
      overview: '',
      runtime: 0,
      status: '',
      genres: []
  },
  {
      id: "2", title: 'Movie Two', poster_path: '/path2.jpg', vote_average: 7.5, release_date: '2023-03-15',
      overview: '',
      runtime: 0,
      status: '',
      genres: []
  },
];

describe('MovieList Component', () => {
    it('should display MovieListSkeleton when loading', () => {
        const { getAllByTestId } = render(<MovieList movies={mockMovies} loading={true} title="Now Playing" />)
      
        expect(getAllByTestId('movie-list-skeleton')).toBeTruthy(); 
      });
      
      

  it('should render the correct number of MovieCard components', () => {
    const { getAllByTestId } = render(<MovieList movies={mockMovies} loading={false} title="Now Playing" />);
    
    expect(getAllByTestId('movie-card').length).toBe(mockMovies.length);
  });
});
