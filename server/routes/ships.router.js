const router = require('express').Router();
const pool = require('../modules/pool');

// Ship POST route
router.post('/', (req, res) => {
    console.log('POST /ships', req.body);
    const ship = req.body;
    const queryText = `INSERT INTO "ships" ("name", "max_crew") VALUES ($1, $2)`;
    pool.query(queryText, [ship.name, ship.max_crew])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error making ship insert query', error);
            res.sendStatus(500);
        });
});

// Ship GET route
router.get('/', (req, res) => {
    console.log('GET /ships');
    pool.query(`SELECT "s".*, count("c") as "current_crew" 
                FROM "ships" as "s" LEFT JOIN "crew" as "c" 
                ON "s"."id" = "c"."ship_id"
                GROUP BY "s"."id";`)
        .then(result => {
            // console.log(result);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('ERROR SELECTING SHIPS - GET /ships -', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    console.log('DELETE /ships', req.params);
    const shipId = req.query.id;
    pool.query('DELETE FROM "ships" WHERE "id" = $1;', [shipId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error making ship delete query', error);
            res.sendStatus(500);
        });
});

module.exports = router;