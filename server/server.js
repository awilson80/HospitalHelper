import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

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

app.post('/hospitals', (req, res) => {
    const q =
        'INSERT INTO hospitals (`name`, `location`, `type`, `phone`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.location,
        req.body.type,
        req.body.phone,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json('Hospital successfully added.');
        }
    });
});

app.delete('/hospitals/:id', (req, res) => {
    const hospitalId = req.params.id;

    const q = 'DELETE FROM `hospitals` WHERE id = ?';

    db.query(q, [hospitalId], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json('Hospital successfully deleted.');
        }
    });
});

app.put('/hospitals/:id', (req, res) => {
    const hospitalId = req.params.id;
    const q =
        'UPDATE hospitals SET `name` = ?, `location` = ?, `type` = ?, `phone` = ? WHERE id = ?';

    const values = [
        req.body.name,
        req.body.location,
        req.body.type,
        req.body.phone,
    ];

    db.query(q, [...values, hospitalId], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json('Hospital successfully updated.');
        }
    });
});

app.listen(4000, () => {
    console.log("You're in!");
});
