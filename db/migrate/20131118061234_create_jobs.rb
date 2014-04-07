class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :job
      t.string :address
      t.string :qmnum
      t.string :qmart
      t.string :qmartx
      t.string :clientname
      t.string :clientname2
      t.string :soldto
      t.string :contactname1
      t.string :telf1
      t.string :telf2
      t.string :contact_email1
      t.string :contact_email2
      t.string :zz_melways
      t.string :supr_email
      t.string :coord_email
      t.string :signature
      t.integer :user_id
      t.timestamps
    end
  end
end
