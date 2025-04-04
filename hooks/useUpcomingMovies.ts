import { useState, useEffect } from 'react';
import { Movie } from '@/types/movieInterfaces';
import ServerLinks from '@/api/serverLinks';
import * as Sentry from '@sentry/react-native';

export function useUpcomingMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(ServerLinks.getUpcomingMovies(), {
                    method: 'GET',
                    headers: ServerLinks.getHeaders(),
                });

                const data = await response.json();

                const sortedMovies = data.results.sort((a: any, b: any) =>
                    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                );

                setMovies(sortedMovies);
                setLoading(false);
            } catch (error) {
                Sentry.captureException(error);
                Sentry.captureMessage('Error fetching movies', {
                    level: 'error',  
                });

                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading };
}
