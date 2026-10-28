
# SQLファイルについて

## 000_check_connection.sql

Neon（PostgreSQL）への接続確認に使用するSQLファイルです。

## 実行方法

1. NeonのSQL Editorを開きます。
2. `000_check_connection.sql` の内容をコピーします。
3. SQL Editorに貼り付けて実行します。
4. 実行結果を確認します。

## 注意事項

SQLファイルをGitHubに保存するだけでは、データベース上でSQLは実行されません。

SQL Editorなどで実行する必要があります。

データベースの接続情報は環境変数 `DATABASE_URL` で管理し、GitHubには公開しません。
