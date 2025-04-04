import { useState, useEffect } from 'react';
import ServerLinks from '@/api/serverLinks';
import { CastMember } from '@/types/movieInterfaces';
import * as Sentry from '@sentry/react-native'

export function useCast(id: string | string[]) {
    const [cast, setCast] = useState<CastMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ServerLinks.getMovieCredits(Number(id)), {
                    method: 'GET',
                    headers: ServerLinks.getHeaders(),
                });
                const castData = await response.json();
                setCast(castData.cast);
            } catch (error) {
                Sentry.captureException(error);
                Sentry.captureMessage('Error fetching cast', {
                    level: 'error',
                });
            }
        };
        fetchData();
    }, [id]);

    return { cast };
}
