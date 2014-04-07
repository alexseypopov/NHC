# encoding: utf-8

class JobSignatureUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick
 

  process :convert => 'png'
  process :resize_to_limit => [120, 240]

  version :thumb do
    process :resize_to_fit => [45, 45]
  end

  def store_dir
    'my/upload/directory/signature'
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
