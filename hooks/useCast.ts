import { useState, useEffect } from 'react';
import ServerLinks from '@/api/serverLinks';
import { CastMember } from '@/Types/movieInterfaces';

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
                console.error('Error fetching cast:', error);
            }
        };
        fetchData();
    }, [id]);

    return { cast };
}
