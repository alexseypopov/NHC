require 'json'

module Ajax
  class SignatureFileString < StringIO
  attr_accessor :original_filename, :content_type
  end
  class JobsController < ApplicationController
    def update_jobs

      username = current_user.username

      client = Savon.client(wsdl: "public/soap_definitions/get_jobs.xml", ssl_verify_mode: :none, basic_auth: ["webservice", "welcome"], convert_request_keys_to: :none)
      hres = client.call(:z_nhc_supervisor_getjobs, message: {JobList: {Item: {Job:''}}, Zusername: username}).to_hash
      
      @jobs = []
      if hres[:z_nhc_supervisor_getjobs_response][:job_list]
        jobs = hres[:z_nhc_supervisor_getjobs_response][:job_list][:item]
        jobs.each do |job|
          @jobs << job
        end
      end
      render :json => @jobs, :status=> :ok

      #@jobs = []
      #jobs = Job.feed_to_json('http://shop-feed-88.herokuapp.com/feeds/jobs.rss')
      #if jobs
      #  jobs["JOB_LIST"]["JOB"].each do |job|
      #    @jobs << job
      #  end
      #end
      #render :json => @jobs, :status=> :ok
    end

    def update_vendors
      client = Savon.client(wsdl: "public/soap_definitions/get_vendors.xml", ssl_verify_mode: :none, basic_auth: ["webservice", "welcome"], convert_request_keys_to: :none)
      hres = client.call(:z_eto_list_all, message: {TtApprMger: '', TtLfa1: '', TtMatkl: ''}).to_hash
      @vendors = []

      if hres[:z_eto_list_all_response][:tt_appr_mger]
        vendors = hres[:z_eto_list_all_response][:tt_appr_mger][:item]
        vendors.each do |vendor|
          @vendors << vendor
        end
      end

      render :json => @vendors, :status=> :ok

      #@vendors = []
      #vendors = Job.feed_to_json('http://shop-feed-88.herokuapp.com/feeds/vendors.rss')
      #if vendors
      #  vendors["TT_APPR_MGER"]["APPR_MGER"].each do |vendor|
      #    @vendors << vendor
      #  end
      #end
      #render :json => @vendors, :status=> :ok
    end

    def set_image
      @image=''
      image64 = params[:signature].split(",").second
      if image64
        io = SignatureFileString.new(Base64.decode64(image64))
        io.original_filename = "foobar.png"
        io.content_type = "image/png"
        @image = io
      end
      render :json => @image, :status => :ok
    end

    def create_jobs
      @job= Job.find_by_qmnum_and_user_id(params[:job][:qmnum], current_user.id)
      if @job.present?
        if @job.faults.present?
          # @job.faults.each do |fault|
          #   fault.image.delete!
          #   fault.image = ''
          #   fault.save
          # end
          if params[:fault_ids]
            faults = @job.faults.where('id not IN (?)', params[:fault_ids].to_a)
          else
            faults = @job.faults
          end
          if faults.present?
            faults.each do |fault|
              fault.destroy
            end
          end
        end 
        if @job.update_attributes(params[:job])
          image64 = params[:signature].split(",").second
          if image64
            io = SignatureFileString.new(Base64.decode64(image64))
            io.original_filename = "foobar.png"
            io.content_type = "image/png"
            @job.signature = io
            @job.save
          end
          render :json => @job, :status => :ok
        end
      else
        @job = Job.new(params[:job])
        if @job.save
          image64 = params[:signature].split(",").second
          if image64
            io = SignatureFileString.new(Base64.decode64(image64))
            io.original_filename = "foobar.png"
            io.content_type = "image/png"
            @job.signature = io
            @job.save
          end
          render :json => @job, :status => :ok
        end
      end
    end

    def delete_job
      @job= Job.find_by_qmnum(params[:qmnum].to_s)
      if @job.present?
        if @job.faults.present?
          @job.faults.each do |fault|
            fault.image.delete!
          end
          @job.faults.delete_all
        end
        @job.signature.delete!
        if @job.delete
          render :json => {:status => :ok}
        else
          render :json => {:status => 300}
        end
      else
        render :json => {:status => 300}
      end
    end
  end
end