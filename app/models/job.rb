class Job < ActiveRecord::Base
  attr_accessible :job, :address, :qmnum, :qmart, :qmartx, :clientname, :clientname2, :soldto, :contactname1, :telf1, :telf2, :contact_email1, :contact_email2, :zz_melways, :supr_email, :coord_email, :start_date, :book_date, :signature, :user_id
  has_many :faults  
  belongs_to :user

  mount_uploader :signature, JobSignatureUploader
  before_destroy :remember_image
  after_destroy :remove_img

  require "net/http"
  require "uri"
  def self.feed_to_json(feed_url)
    begin
      s = Net::HTTP.get_response(URI.parse(feed_url)).body
      begin
        json = Hash.from_xml(s)["rss"]
        json["jobs"] = json["JOB_LIST"]
        return json
      rescue
        begin
          JSON.parse(s)
        rescue
          puts "\n\nInvalid format\n\n"
          return false
        end
      end
    rescue
      return false
    end
  end

protected
  def remember_image
    @image_name = self[:image]
  end

  def remove_img
    if @image_name
      File.delete("#{Rails.root}/public/my/upload/directory/signature/#{@image_name}")
      File.delete("#{Rails.root}/public/my/upload/directory/signature/thumb_#{@image_name}")
    end
  end
end
