Nhc::Application.routes.draw do

  # resources :sessions, only: [:new, :create, :destroy]
  
  # as :user do
  #   get 'pages/login' => 'devise/sessions#new', :as => :new_user_session
  # end
  devise_for :users, :controllers => {:sessions => 'users/sessions'}


  get 'pages/login'
  get 'pages/job'
  get 'pages/setting'
  get 'jobs/view_job'
  get 'jobs/view_draft'
  get 'jobs/download_job'
  get 'jobs/entry'
  get 'pages/setting'
  post 'create_pdf'                                  => 'jobs#job_pdf', :as => 'job_pdf'

  namespace :ajax do
    get 'update_jobs'                                => 'jobs#update_jobs'
    get 'update_vendors'                             => 'jobs#update_vendors'
    put 'create_jobs'                                => 'jobs#create_jobs'
    put 'create_faults'                              => 'faults#create_faults'
    put 'set_image'                                  => 'jobs#set_image'
    put 'delete_job'                                 => 'jobs#delete_job'
  end


  root :to => 'pages#home'
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
