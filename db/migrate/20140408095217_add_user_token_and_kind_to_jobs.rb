class AddUserTokenAndKindToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :user_token, :string
    add_column :jobs, :kind, :string
  end
end
