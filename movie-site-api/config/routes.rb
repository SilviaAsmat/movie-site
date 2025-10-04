Rails.application.routes.draw do
  namespace :api do
    get 'test/hello', to: 'test#hello'
  end
end
