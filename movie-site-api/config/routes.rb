Rails.application.routes.draw do
  namespace :api do
    # Test route
    get 'test/hello', to: 'test#hello'
    
    # Movies routes
    get 'movies/popular', to: 'movies#popular'
    get 'movies/search', to: 'movies#search'
    get 'movies/:id', to: 'movies#show'
    
    # TV Shows routes
    get 'tv_shows/popular', to: 'tv_shows#popular'
    get 'tv_shows/search', to: 'tv_shows#search'
    get 'tv_shows/:id', to: 'tv_shows#show'
    
    # Favorites routes
    resources :favorites, only: [:index, :create, :destroy]
  end
end