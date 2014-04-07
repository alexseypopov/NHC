class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :password, :email, :password_confirmation
  def self.feed_to_json(feed_url)
  	
  #   begin
  #   #   puts feed_url
  #   #   s = Net::HTTP.get_response(URI.parse(feed_url)).body
  #   #   puts "asdasdasdasdasd"
  #   #   begin
  #   #     json = Hash.from_xml(s)["rss"]
  #   #     return json
  #   #   rescue
  #   #     begin
  #   #       JSON.parse(s)
  #   #     rescue
  #   #       puts "\n\nInvalid format\n\n"
  #   #       return false
  #   #     end
  #   #   end
  #   # rescue
  #   #   return false
  #   # end
  end
end
