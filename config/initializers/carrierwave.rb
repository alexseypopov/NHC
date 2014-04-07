GOOGLE_STORAGE_ACCESS_KEY_ID = 'GOOG2UHMXHXR7M4QH5DB'
GOOGLE_STORAGE_SECRET_ACCESS_KEY = 'pli7M8Wt3jgj7X4KXBxhm8Ymz/MSA/PGXkHPdLwu'

CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider                         => 'Google',
    :google_storage_access_key_id     => GOOGLE_STORAGE_ACCESS_KEY_ID,
    :google_storage_secret_access_key => GOOGLE_STORAGE_SECRET_ACCESS_KEY
  }
  config.fog_directory = 'porterdavis'
end