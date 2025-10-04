class Review < ApplicationRecord
  belongs_to :user
  
  validates :tmdb_id, presence: true
  validates :media_type, presence: true, inclusion: { in: %w[movie tv] }
  validates :content, presence: true, length: { minimum: 10, maximum: 1000 }
  validates :rating, presence: true, inclusion: { in: 1..10 }
end