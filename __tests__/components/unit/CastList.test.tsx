import { render } from '@testing-library/react-native';
import { CastMember } from '@/types/movieInterfaces';
import CastList from '@/components/movies/CastList';

describe('CastList Component', () => {
  
  it('should render a message when no cast is available', () => {
    const { getByText } = render(<CastList cast={[]} />);
    expect(getByText('No cast available.')).toBeTruthy();
  });

  it('should render cast members when data is available', () => {
    const mockCast: CastMember[] = [
      {
        name: 'Actor 1',
        character: 'Character 1',
        profile_path: '/path/to/image1.jpg',

      },
      {
        name: 'Actor 2',
        character: 'Character 2',
        profile_path: '/path/to/image2.jpg',

      },
    ];

    const { getByText } = render(<CastList cast={mockCast} />);
    
    expect(getByText('Actor 1')).toBeTruthy();
    expect(getByText('Character 1')).toBeTruthy();
    expect(getByText('Actor 2')).toBeTruthy();
    expect(getByText('Character 2')).toBeTruthy();
  });

  it('should display a truncated name if it exceeds 20 characters', () => {
    const longName = 'This is a very long actor name';
    const mockCast: CastMember[] = [
      {
        name: longName,
        character: 'Character 1',
        profile_path: '/path/to/image.jpg',

      },
    ];

    const { getByText } = render(<CastList cast={mockCast} />);
    
    expect(getByText('This is a very long ...')).toBeTruthy();
  });

  it('should display a fallback image when profile_path is unavailable', () => {
    const mockCast: CastMember[] = [
      {
        name: 'Actor 1',
        character: 'Character 1',
        profile_path: '',

      },
    ];

    const { getByTestId } = render(<CastList cast={mockCast} />);
    
    const image = getByTestId('cast-image');
    expect(image.props.source.uri).toBe('https://i.ibb.co/WNg5ntkK/no-Cast-Available.webp');
  });
});
