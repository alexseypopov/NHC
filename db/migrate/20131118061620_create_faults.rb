class CreateFaults < ActiveRecord::Migration
  def change
    create_table :faults do |t|
  		t.string :details
  		t.string :location
  		t.text :comment
  		t.string :cause_code
  		t.text :reason
  		t.string :vendor
  		t.string :image
  		t.integer :job_id
      t.timestamps
    end
  end
end
