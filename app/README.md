# RAG APP

- `.env` ファイルを作成

- アプリケーションの起動

  ```sh
  npm install
  ```

  ```sh
  npx ts-node src/index.ts
  ```

- http://127.0.0.1:3000/vertex-ai-search-grounding にリクエストを送ると返答がある

  ```sh
  curl -X GET \
    -H "Content-Type: application/json" \
    -d '{"text": "地球は何色ですか？"}' \
    http://127.0.0.1:3000/vertex-ai-search-grounding
  ```

- http://127.0.0.1:3000/google-search-grounding にリクエストを送ると普通のチャットアプリみたいな感じで使える

  ```sh
  curl -X GET \
    -H "Content-Type: application/json" \
    -d '{"text": "地球は何色ですか？"}' \
    http://127.0.0.1:3000/google-search-grounding
  ```
