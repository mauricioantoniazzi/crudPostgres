var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var pgp = require('pg-promise')();
const path = require('path');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5433/todo';

var db = pgp(connectionString);

var route = '/api/v1/todos';

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

var handleError1 = function(err) {
  console.log(err);
  return res.status(500).json({ success: false, data: err});
};

/**
  * Generic final pathway for all routes
  */
function respond(promise, res) {
  promise.then(function (data) {
    return db.query("SELECT * FROM items ORDER BY id ASC");
    })
  .then(function (data) {
    return res.json(data);
    })
  .catch(function(err) {
    console.log(err);
    return res.status(500).json({ success: false, data: err});
  });
}

router.post(route, function(req, res) {
  var data = {text: req.body.text, complete: false};
  var promise = db.none(
    "INSERT INTO items(text, complete) values(${text}, ${complete})",
    data);
  respond(promise, res);
});

router.get(route, function(req, res) {
  respond(Promise.resolve(), res);
});

router.put(route + '/:urn', function(req, res) {
  var data = {
    id: req.params.urn,
    text: req.body.text,
    complete: req.body.complete};
  var promise = db.none(
    "UPDATE items SET text=${text}, complete=${complete} WHERE id=${id}",
    data);
  respond(promise, res);
});

router.delete(route + '/:urn', function(req, res) {
  var id = req.params.urn;
  var promise = db.none("DELETE FROM items WHERE id=$1", [id]);
  respond(promise, res);
});

module.exports = router;