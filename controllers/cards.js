const db = require('../models');
const Card = db.cards;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.findAll = (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Card.find(
        {},
        {
            card_id: 1,
            name: 1,
            mana_cost: 1,
            converted_mana: 1,
        }
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
        message:
            err.message || 'Some error occurred while retrieving cards.',
        });
    });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};