class Fault < ActiveRecord::Base
  belongs_to :job
 
  attr_accessible :details, :location, :comment, :cause_code, :reason, :vendor, :image, :job_id



 mount_uploader :image, FaultImageUploader
 before_destroy :remember_image
 after_destroy :remove_img

protected
  def remember_image
    @image_name = self[:image]
  end

  def remove_img
    if @image_name != ''
      File.delete("#{Rails.root}/public/my/upload/directory/fault/#{@image_name}")
      File.delete("#{Rails.root}/public/my/upload/directory/fault/thumb_#{@image_name}")
    end
  end
end
