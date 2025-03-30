import React from 'react';
import { render } from '@testing-library/react-native';
import { RecommendedMovie } from '@/types/movieInterfaces';
import RecommendedMovies from '@/components/movies/RecommendedMovies';

describe('RecommendedMovies', () => {

  it('should render a message when there are no recommendations', () => {
    const { getByText } = render(<RecommendedMovies recommendations={[]} />);
    expect(getByText('No recommendations available.')).toBeTruthy();
  });

  it('should render recommendations when data is available', () => {
    const mockRecommendations: RecommendedMovie[] = [
      {
        title: 'Movie 1',
        poster_path: '/path/to/image1.jpg',
      },
      {
        title: 'Movie 2',
        poster_path: '/path/to/image2.jpg',
      },
    ];

    const { getByText, getAllByTestId } = render(
      <RecommendedMovies recommendations={mockRecommendations} />
    );

    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();

    const images = getAllByTestId('recommendation-image');
    expect(images.length).toBe(mockRecommendations.length);
    expect(images[0].props.source.uri).toBe('https://image.tmdb.org/t/p/w200/path/to/image1.jpg');
    expect(images[1].props.source.uri).toBe('https://image.tmdb.org/t/p/w200/path/to/image2.jpg');
  });

  it('should display truncated title if title length exceeds 20 characters', () => {
    const longTitle = 'A very long movie title that exceeds 20 characters';
    const mockRecommendations: RecommendedMovie[] = [
      {
        title: longTitle,
        poster_path: '/path/to/image.jpg',
      },
    ];

    const { getByText } = render(
      <RecommendedMovies recommendations={mockRecommendations} />
    );

    const titleText = getByText('A very long movie ti...');
    expect(titleText).toBeTruthy();
    expect(titleText.props.children).toBe('A very long movie ti...');
  });

  it('should display a fallback image when poster_path is unavailable', () => {
    const mockRecommendations: RecommendedMovie[] = [
      {
        title: 'Movie with no poster',
        poster_path: '',
      },
    ];

    const { getByTestId } = render(
      <RecommendedMovies recommendations={mockRecommendations} />
    );

    const image = getByTestId('recommendation-image');
    expect(image.props.source.uri).toBe('https://i.ibb.co/HDq2F3vx/no-Poster-Available.webp');
  });

});

