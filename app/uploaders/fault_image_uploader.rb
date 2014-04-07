# encoding: utf-8

class FaultImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick
 
  
  process :convert => 'png'
  process :resize_to_limit => [200, 400]

  version :thumb do
    process :resize_to_fit => [45, 45]
  end

  def store_dir
    'my/upload/directory/fault'
  end


  def delete!
    remove!
    remove_versions!
  end  

  def filename
    ivar = "@#{mounted_as}_secure_token"    
    token = model.instance_variable_get(ivar) or model.instance_variable_set(ivar, SecureRandom.hex(20/2))
    "#{model.id}_#{token}.png" if original_filename
  end

end
