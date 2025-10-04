class Api::FavoritesController < ApplicationController
  # For now, skip authentication - add later
  # before_action :authenticate_user!

  # GET /api/favorites
  def index
    # For now, get all favorites (later filter by current_user)
    favorites = Favorite.all
    render json: favorites
  end

  # POST /api/favorites
  def create
    favorite = Favorite.new(favorite_params)
    
    if favorite.save
      render json: favorite, status: :created
    else
      render json: { errors: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/favorites/:id
  def destroy
    favorite = Favorite.find(params[:id])
    favorite.destroy
    head :no_content
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :tmdb_id, :media_type)
  end
end