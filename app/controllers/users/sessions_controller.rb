class Users::SessionsController < Devise::SessionsController
require 'net/http'

  def create
    if request.xhr?
      url = URI.parse("http://shop-feed-88.herokuapp.com/login?username=#{params[:username]}&password=#{params[:password]}")
      req = Net::HTTP::Post.new("http://shop-feed-88.herokuapp.com/login?username=#{params[:username]}&password=#{params[:password]}")
      if url
        res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
        }
        @result = JSON.parse(res.body)["result"].to_s

        if @result == 'true'
          user = User.find_by_username(params[:username])
          if user
            sign_in user
          else
            user = User.new
            user.email = "user@porterdavis#{User.count}.com"
            user.username = params[:username]
            user.password = params[:password]
            user.password_confirmation = params[:password]
            if user.save
              sign_in user
            end
          end
        end
      end
      render :json => @result, :status => :ok
    else
      super
    end
  end
  
end