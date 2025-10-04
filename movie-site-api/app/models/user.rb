class User < ApplicationRecord
  has_secure_password
  
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: :password_digest_changed?
  
  has_many :favorites, dependent: :destroy
  has_many :reviews, dependent: :destroy
end