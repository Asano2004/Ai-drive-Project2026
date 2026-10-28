
import express, { Request, Response } from 'express';
import path from 'path';
import { Pool } from 'pg';
import 'dotenv/config';

const app = express();
const port: number = 3000;

// Neonデータベース接続設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Expressの基本設定
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// 「/」にアクセスされたときの処理
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

// Neonデータベース接続確認
app.get('/db-test', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Neon接続成功',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('データベース接続エラー');
  }
});

// 課題用：Neonデータベース接続確認API
app.get('/api/db-check', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Neon接続成功',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'データベース接続エラー'
    });
  }
});

// usersテーブルのデータを取得
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ユーザー取得失敗' });
  }
});

// サーバー起動
app.listen(port, (): void => {
  console.log(`Server started: http://localhost:${port}`);
});
