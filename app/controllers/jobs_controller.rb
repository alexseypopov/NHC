class JobsController < ApplicationController
  before_filter :authenticate_user!
  class ImageFileString < StringIO
    attr_accessor :original_filename, :content_type
  end
  def download_job
    @downloaded_jobs = cookies[:job_count].to_i
    @job_timer = cookies[:job_timer].to_f
  end
  
  def entry
    if params[:type]
      @job =Job.new(JSON.parse(cookies["job#{params[:id]}"])) if cookies["job#{params[:id]}"] && params[:type] == 'cookie'
      @is_cookie = true
      if @job.present?
        if Job.find_by_qmnum_and_user_token(@job.qmnum, cookies[:security_token])
          @job = Job.find_by_qmnum_and_user_token(@job.qmnum, cookies[:security_token]) 
          @is_cookie = false
        end
      else
        @job = Job.find_by_id_and_user_token(params[:id],cookies[:security_token])
        @is_cookie = false
      end
      @arr_vendor = []
      #(0...cookies[:vendor_count].to_i).each do|count|
      #  @arr_vendor << JSON.parse(cookies["vendor#{count}"])["fullname"]
      #end

      @vendors = Vendor.find(:all)

      @vendors.each do |vendor|
        @arr_vendor << vendor.fullname
      end

      if cookies[:vendor_count].to_i < 1
        @no_vendors = true
      end
      @faults = @job.faults if @job.present?
    end
  end

  def view_job
    #@jobs = []
    #(0...cookies[:job_count].to_i).each do |count|
    #  @jobs << Job.new(JSON.parse(cookies["job#{count}"]))
    #end
    @jobs = Job.where("user_token=? and kind = ?", cookies[:security_token], "job")
  end

  def view_draft
    @jobs = Job.where('user_token = ? and kind = ?', cookies[:security_token], 'draft')
  end

  def job_pdf
    @url = request.protocol + request.env["HTTP_HOST"]
    @image = params[:job_signature]
    if @image
      image64 = params[:job_signature_temp].split(",").second
        if image64
          @image = params[:job_signature_temp]
          io = ImageFileString.new(Base64.decode64(image64))
          io.original_filename = "foobar.png"
          io.content_type = "image/png"
        else
          @image = @url + @image
        end
    end
    @faults = []
    if params[:faults]
      JSON.parse(params[:faults]).each do |fault|
        if fault["image"]
          image64 = fault["image"].split(",").second
          if image64
            io = ImageFileString.new(Base64.decode64(image64))
            io.original_filename = "foobar.png"
            io.content_type = "image/png"
          else
            fault["image"] = @url + fault["image"]
          end
          # fault["image"] = io
        end
        # raise fault["image"].to_s
        @faults << fault
      end
    end
    respond_to do |format|
      format.html
      format.pdf do
        render :pdf => "file_name"
      end
      # raise @faults.to_s
    end
  end
end
