class CreateReviews < ActiveRecord::Migration[8.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :tmdb_id
      t.string :media_type
      t.text :content
      t.integer :rating

      t.timestamps
    end
  end
end
