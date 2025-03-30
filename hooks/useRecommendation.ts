import { useState, useEffect } from 'react';
import ServerLinks from '@/api/serverLinks';
import { RecommendedMovie } from '@/types/movieInterfaces';
import * as Sentry from '@sentry/react-native'

export function useRecommendations(id: string | string[]) {
    const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ServerLinks.getMovieRecommendations(Number(id)), {
                    method: 'GET',
                    headers: ServerLinks.getHeaders(),
                });
                const recommendationData = await response.json();
                setRecommendations(recommendationData.results);
            } catch (error) {

                 Sentry.captureException(error);
                 Sentry.captureMessage('Error fetching recommendations', {
                    level: 'error',  
                 });
            }
        };
        fetchData();
    }, [id]);

    return { recommendations };
}
