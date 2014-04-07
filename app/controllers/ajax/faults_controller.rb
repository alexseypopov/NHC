module Ajax
  class ImageFileString < StringIO
  attr_accessor :original_filename, :content_type
  end
  class FaultsController < ApplicationController
    def create_faults
      @fault = nil
      if params[:id]
        @fault = Fault.find_by_id(params[:id])
      end
      if @fault.nil?
        @fault = Fault.new(params[:faults])
        if @fault.save
          if params[:image].present?
            @fault.save
            image64 = params[:image].split(",").second
            io = ImageFileString.new(Base64.decode64(image64))
            io.original_filename = "foobar.png"
            io.content_type = "image/png"
            @fault.image = io
            @fault.save
          end

          render :json => @fault, :status => :ok
        else
          render :json => @fault, :status => 300
        end
      # else
      #   render :json => @fault, :status => 300
      # end
      else
        if @fault.update_attributes(params[:faults])
          if params[:faults][:image] == ''
            @fault.image.delete!
            @fault.remove_image = true
            @fault.save
          end
          if params[:image].present?
            @fault.image.delete!
            @fault.remove_image = false
            # @fault.image = params[:image]
            image64 = params[:image].split(",").second
            io = ImageFileString.new(Base64.decode64(image64))
            io.original_filename = "foobar.png"
            io.content_type = "image/png"
            @fault.image = io
            @fault.save
          end
          render :json => @fault, :status => :ok
        else
          render :json => @fault, :status => 300
        end
      end
    end
  end
end