export interface Movie {
    id: string,
    title: string;
    overview: string;
    poster_path?: string;
    vote_average: number;
    runtime: number,
    release_date: string,
    status: string,
    genres: { name: string }[]
}

export interface CastMember {
    name: string;
    profile_path?: string;
    character: string,
}

export interface RecommendedMovie {
    title: string;
    poster_path?: string;
}