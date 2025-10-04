class Api::TestController < ApplicationController
end
class Api::TestController < ApplicationController
  def hello
    render json: { message: "Rails API is working!" }
  end
end