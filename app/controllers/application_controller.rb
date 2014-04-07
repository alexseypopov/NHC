class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  def handle_unverified_request
  	sign_out
  	super
  end

  private

  # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(resource_or_scope)
  	respond_to?(:root_path) ? root_path : "/"
  end

  # def after_sign_in_path_for(resource)
  #   root_path
  # end
  
end
