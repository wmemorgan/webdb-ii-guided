const knex = require('knex')
const router = require('express').Router();

const knexConfig = {
  client: 'sqlite3',
  connection: {// string or object
    filename: './data/rolex.db3' // relative path from the root folder
  },
  useNullAsDefault: true,
  // debug: true
}
const db = knex(knexConfig)

// GET /api/roles
router.get('/', (req, res) => {
  // SELECT * FROM Roles
  db('roles') //<< return a promise with all the rows
  .then(roles => {
    res.send(roles)
  }).catch(err => {
    console.log(err.message)
    res.status(500).send(err.message)
  })
});

// SELECT FROM Roles WHERE id = :id
router.get('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .first()
    .then(role => {
      if (role) {
        res.send(role)
      } else {
        res.status(404).json({ message: `Role not found` })
      } 
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
});

router.post('/', (req, res) => {
  // INSERT INTO Roles () VALUES (req.body)
  db('roles')
  .insert(req.body, 'id')
  .then(ids => {
    db('roles')
      .where({ id: ids[0] })
      .first()
      .then(role => {
        res.send(role)
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
});

// UPDATE FROM Roles SET name = req.body 
// WHERE id = req.params.id
router.put('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.json({ message: `${count} ${count > 1 ? 'records' : 'record' } updated`})
      } else {
        res.status(404).json({ message: `Role does not exist` })
      }
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
});

router.delete('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.json({ message: `${count} ${count > 1 ? 'records' : 'record'} deleted` })
      } else {
        res.status(404).json({ message: `Role does not exist` })
      }
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
});

module.exports = router;
