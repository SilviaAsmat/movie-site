class Api::MoviesController < ApplicationController
  #Creates TMDb service instance before each action
  before_action :set_tmdb_service

  # GET /api/movies/popular
  def popular
    response = @tmdb_service.popular_movies
    render json: response
  end

  # GET /api/movies/search?query=batman
  def search
    query = params[:query]
    response = @tmdb_service.search(query, 'movie')
    render json: response
  end

  # GET /api/movies/:id
  def show
    movie_id = params[:id]
    response = @tmdb_service.movie_details(movie_id)
    render json: response
  end

  private

  def set_tmdb_service
    @tmdb_service = TmdbService.new
  end
end