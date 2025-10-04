class TmdbService
  include HTTParty
  base_uri 'https://api.themoviedb.org/3'

  def initialize
    @api_key = ENV['TMDB_API_KEY']
  end

  # Search for movies or TV shows
  def search(query, media_type = 'multi')
    self.class.get("/search/#{media_type}", {
      query: {
        api_key: @api_key,
        query: query
      }
    })
  end

  # Get popular movies
  def popular_movies
    self.class.get('/movie/popular', {
      query: {
        api_key: @api_key
      }
    })
  end

  # Get popular TV shows
  def popular_tv_shows
    self.class.get('/tv/popular', {
      query: {
        api_key: @api_key
      }
    })
  end

  # Get movie details
  def movie_details(movie_id)
    self.class.get("/movie/#{movie_id}", {
      query: {
        api_key: @api_key,
        append_to_response: 'credits,videos'
      }
    })
  end

  # Get TV show details
  def tv_details(tv_id)
    self.class.get("/tv/#{tv_id}", {
      query: {
        api_key: @api_key,
        append_to_response: 'credits,videos'
      }
    })
  end
end