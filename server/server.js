import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'VV!Zh8!$',
    database: 'hospitaldb',
});

app.get('/hospitals', (req, res) => {
    const q = 'SELECT * FROM hospitals';
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.post('/create', (req, res) => {
    const q =
        'INSERT INTO hospitals (`name`, `location`, `type`, `npi`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.location,
        req.body.type,
        req.body.npi,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json('Hospital added.');
        }
    });
});

app.listen(4000, () => {
    console.log('Connected to backend!');
});
