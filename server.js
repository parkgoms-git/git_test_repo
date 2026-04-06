const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// DB 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'mydb',
    user: 'myuser',
    password: process.env.DB_PASSWORD,
});

db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패:', err.message);
        return;
    }
    console.log('MySQL 연결 성공');
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// DB 연결 상태 확인 API
app.get('/api/health', (req, res) => {
    db.ping((err) => {
        if (err) return res.status(500).json({ status: 'DB 연결 오류', error: err.message });
        res.json({ status: 'DB 연결 정상' });
    });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
