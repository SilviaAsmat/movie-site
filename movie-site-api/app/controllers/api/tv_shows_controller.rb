class Api::TvShowsController < ApplicationController
  before_action :set_tmdb_service

  # GET /api/tv_shows/popular
  def popular
    response = @tmdb_service.popular_tv_shows
    render json: response
  end

  # GET /api/tv_shows/search?query=breaking bad
  def search
    query = params[:query]
    response = @tmdb_service.search(query, 'tv')
    render json: response
  end

  # GET /api/tv_shows/:id
  def show
    tv_id = params[:id]
    response = @tmdb_service.tv_details(tv_id)
    render json: response
  end

  private

  def set_tmdb_service
    @tmdb_service = TmdbService.new
  end
end