class AddColumnsToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :start_date, :datetime, :default => nil
    add_column :jobs, :book_date, :datetime, :default => nil
  end
end
