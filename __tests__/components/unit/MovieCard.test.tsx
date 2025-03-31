import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Movie } from '@/types/movieInterfaces';
import { useRouter } from 'expo-router';
import MovieCard from '@/components/movies/MovieCard';
import { useDispatch, useSelector } from 'react-redux';


const mockDispatch = useDispatch as unknown as jest.Mock;

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');

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
  

describe('MovieCard', () => {
  const mockPush = jest.fn();
  
  const mockMovie: Movie = {
      id: '1',
      title: 'Test Movie',
      poster_path: '/path/to/poster.jpg',
      release_date: '2022-01-01',
      vote_average: 8.5,
      overview: '',
      runtime: 0,
      status: '',
      genres: []
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render movie card with details', () => {
    const { getByText, getByTestId } = render(<MovieCard item={mockMovie} />);

    expect(getByText('Test Movie')).toBeTruthy();

    expect(getByText('Release Date: 2022-01-01')).toBeTruthy();

    expect(getByText('8.5')).toBeTruthy();

    expect(getByText('View details')).toBeTruthy();

    const image = getByTestId('movie-image');
    expect(image.props.source.uri).toBe('https://image.tmdb.org/t/p/w200/path/to/poster.jpg');
  });

  it('should navigate to the details page when "View details" is pressed', () => {
    const { getByText } = render(<MovieCard item={mockMovie} />);

    fireEvent.press(getByText('View details'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/details/[id]',
      params: { id: mockMovie.id },
    });
  });

  it('should display a fallback image if poster_path is unavailable', () => {
    const movieWithoutPoster: Movie = { ...mockMovie, poster_path: '' };
    const { getByTestId } = render(<MovieCard item={movieWithoutPoster} />);

    const image = getByTestId('movie-image');
    expect(image.props.source.uri).toBe('https://i.ibb.co/HDq2F3vx/no-Poster-Available.webp');
  });
});
