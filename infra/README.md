# Vertex AI Agent Builder Infrastructure

Vertex AI Agent Builder まわりのリソースを構築する Terraform

## 構築

- `data-source` ディレクトリに非構造化ドキュメントファイルを配置

- Terraform の変数を設定

  `variables.tf`

- Terraform でリソースを構築

  ```sh
  terraform init
  ```

  ```sh
  terraform apply
  ```

- 作成した Cloud Storage バケットに非構造化ドキュメントファイルをアップロード

  ```sh
  BUCKET_NAME=example-data-source-0123456789012345
  gcloud storage cp data-source/* gs://${BUCKET_NAME}/
  ```

- データストアのデータソースを設定

  https://console.cloud.google.com/gen-app-builder/locations/global/collections/default_collection/data-stores/vertexai-rag-node-tf/data/import?hl=ja

  - Cloud Storage を選択
  - フォルダを選択して、作成した Cloud Storage バケットを参照
  - 非構造化ドキュメントを選択
  - インポート

## 削除

- Terraform でリソースを削除

  ```sh
  terraform destroy
  ```
