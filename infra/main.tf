resource "random_id" "data_source_bucket_id" {
  byte_length = 8
}

resource "google_storage_bucket" "data_source" {
  name                        = "${var.project_id}-data-source-${random_id.data_source_bucket_id.hex}"
  location                    = var.data_source_bucket_location
  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true
  force_destroy               = true
}

resource "google_discovery_engine_data_store" "basic" {
  location                    = "global"
  data_store_id               = "vertexai-rag-node-tf"
  display_name                =  "vertexai-rag-node-tf"
  industry_vertical           = "GENERIC"
  content_config              = "CONTENT_REQUIRED"
  solution_types              = ["SOLUTION_TYPE_SEARCH"]
  create_advanced_site_search = false
}

resource "google_discovery_engine_search_engine" "basic" {
  location       = google_discovery_engine_data_store.basic.location
  data_store_ids = [google_discovery_engine_data_store.basic.data_store_id]
  engine_id      = "vertexai-rag-node-tf"
  display_name   =  "vertexai-rag-node-tf"
  collection_id  = "default_collection"
  search_engine_config {
    search_tier = "SEARCH_TIER_ENTERPRISE"
  }
}
