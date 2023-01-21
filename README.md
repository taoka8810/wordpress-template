# 環境構築

### 0. 必要な環境
- Node v16.x
- Docker

### 2. 依存パッケージのインストール
```
yarn
```

### 3. ローカル環境の立ち上げ
```
docker-compose up -d
```

### 4. gulpの実行
```
yarn start
```

### 5. WordPressの設定
- [http://localhost:3000/wp-admin](http://localhost:3000/wp-admin)にアクセスして初期設定を行う
- 設定したユーザ名とパスワードで管理画面にログインし、テーマの設定をする
- [http://localhost:3000](http://localhost:3000)にアクセスし、以下のような画面が表示されたらOK

<img width="1117" alt="スクリーンショット 2023-01-21 17 49 13" src="https://user-images.githubusercontent.com/78838102/213859539-6a3c60e9-d5e5-4632-901b-c9219c91d3bf.png">
