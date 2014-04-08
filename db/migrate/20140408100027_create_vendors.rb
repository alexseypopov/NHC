class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :bname
      t.string :fullname
      t.string :email

      t.timestamps
    end
  end
end
