class ServerLinks {
  private static BaseUrl = "https://api.themoviedb.org/3/";
  public static API_KEY = process.env.EXPO_PUBLIC_API_KEY

  public static getHeaders(accept: string = "application/json") {
    return {
      'Authorization': `Bearer ${this.API_KEY}`,
      'Accept': accept,
    };
  }

  public static createGuestSession() {
    const url = `authentication/guest_session/new`;
    return `${this.BaseUrl}${url}`;
  }

  public static rateMovie(movieId: number, sessionId: string) {
    const url = `movie/${movieId}/rating?guest_session_id=${sessionId}`;
    return `${this.BaseUrl}${url}`;
  }

  public static getUpcomingMovies() {
    const url = `movie/upcoming?language=en-US&page=1`;
    return `${this.BaseUrl}${url}`;
  }

  public static getMovieDetails(movieId: number) {
    const url = `movie/${movieId}?language=en-US`;
    return `${this.BaseUrl}${url}`;
  }

  public static getMovieCredits(movieId: number) {
    const url = `movie/${movieId}/credits?language=en-US'`;
    return `${this.BaseUrl}${url}`;
  }

  public static getMovieRecommendations(movieId: number) {
    const url = `movie/${movieId}/recommendations`;
    return `${this.BaseUrl}${url}`;
  }

}

export default ServerLinks;
