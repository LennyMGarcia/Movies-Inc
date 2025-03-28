
class ServerLinks {
    private static BaseUrl = "https://api.themoviedb.org/3/";
    public static ApiKey = process.env.EXPO_PUBLIC_API_KEY
  
  public static getHeaders(accept: string = "application/json") {
    return {
      'Authorization': `Bearer ${this.ApiKey}`,
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

  public static getPopularMovies(minDate: string, maxDate: string) {
    const url = `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`;
    return `${this.BaseUrl}${url}`;
  }

  public static getMoviesNowPlaying() {
    const url = `movie/now_playing?language=en-US&page=1'`; 
    return `${this.BaseUrl}${url}`;
  }

  public static getTopRatedMovies() {
    const url = `movie/top_rated`; 
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

  public static getImageUrl(id: number) {
    return `movie/${id}/images`;
  }

  public static searchMovies(query: string) {
    const url = `search/movie?query=${query}`;
    return `${this.BaseUrl}${url}`;
  }

  public static getUserFavoriteMovies(userId: string) {
    const url = `account/${userId}/favorite/movies`;
    return `${this.BaseUrl}${url}`;
  }
  }
  
  export default ServerLinks;
  