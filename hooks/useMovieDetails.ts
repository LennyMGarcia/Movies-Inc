import { useState, useEffect } from 'react';
import ServerLinks from '@/api/serverLinks';
import { Movie } from '@/types/movieInterfaces';
import * as Sentry from '@sentry/react-native'

export function useMovieDetails(id: string | string[]) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(ServerLinks.getMovieDetails(Number(id)), {
                    method: 'GET',
                    headers: ServerLinks.getHeaders(),
                });
                const movieData = await response.json();
                setMovie(movieData);
                setRating(movieData.vote_average || 0);
            } catch (error) {
                Sentry.captureException(error);
                Sentry.captureMessage('Error fetching movie details', {
                    level: 'error',  
                });
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    return { movie, loading, rating, setRating };
}
