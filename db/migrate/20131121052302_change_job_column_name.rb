class ChangeJobColumnName < ActiveRecord::Migration
  def up
  	rename_column :jobs, :contact_email2, :contactname2
  end

  def down
  end
end
