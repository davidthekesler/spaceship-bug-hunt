const router = require('express').Router();
const pool = require('../modules/pool');

// Crew POST route
router.post('/', (req, res) => {
    console.log('POST /crew', req.body);
    const crewMember = req.body;
    const queryText = `INSERT INTO 'crew' ('name', 'role', 'ship_id') 
                       VALUES ($1, $2, $3);`;
    pool.query(queryText, [crewMember.name, crewMember.role, crewMember.ship_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('ERROR ADDING CREW - POST /crew -', error);
            res.sendStatus(500);
        });
});

// Crew GET route
router.get('/', (req, res) => {
    console.log('GET /crew');
    const queryText = `SELECT "c"."name" as "crew_name", 
                              "c"."id" as "crew_id", 
                              "s"."name" as "ship_name"
                       FROM "crew" as "c" JOIN "ships" as "s" 
                       ON "c"."ship_id" = "s"."id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR SELECTING CREW - GET /crew -', error);
        res.sendStatus(500);
    });
});

// Crew DELETE route
router.delete('/:id', (req, res) => {
    console.log('DELETE /crew');
    const crewMemberId = req.params.id;
    pool.query('DELETE FROM "crew" WHERE "id"=$1;', [$1])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('ERROR DELETING CREW - DELETE /crew/:id - ', error);
            res.sendStatus(500);
        });
});

modules.export = router; // What module should we be exports'ing?