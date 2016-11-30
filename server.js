const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const Sequelize = require('sequelize');

// routes
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(volleyball);

app.use(express.static(__dirname));

app.post('/api/click', function (req, res, next) {
  const isAboutToCrash = Math.random() > 0.5;
  ClickRecord.create({
    didCrash: isAboutToCrash,
    username: req.body.username
  })
  .then(function () {
    if (isAboutToCrash) {
      res.status(500).end();
      process.exit(1);
    } else {
      res.status(201).end();
    }
  })
  .catch(next);
});

app.get('/api/highScore', function (req, res, next) {
  ClickRecord.highScoreForUser(req.query.username)
  .then(function (score) {
    res.status(200).json({score});
  })
  .catch(next);
});

// models
const databaseURI = process.env.DATABASE_URL || 'postgres://localhost:5432/server-roulette';
const db = new Sequelize(databaseURI);
const ClickRecord = db.define('click_record', {
  didCrash: Sequelize.BOOLEAN,
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  classMethods: {
    highScoreForUser: function (username) {
      return this.findAll({
        where: {username},
        order: '"createdAt" DESC'
      })
      .then(function (clickRecords) {
        let runningMax = 0;
        let globalMax = 0;
        clickRecords.forEach(function (clickRecord) {
          if (clickRecord.didCrash) {
            runningMax = 0;
          } else {
            runningMax++;
            globalMax = runningMax > globalMax ? runningMax : globalMax;
          }
        });
        return globalMax;
      });
    }
  }
});

// startup server
const port = process.env.PORT || 3000;
db.sync()
.then(function () {
  return new Promise(function (resolve, reject) {
    app.listen(port, function (err) {
      if (err) reject(err);
      else console.log('Your wish is my command on port', port);
    });
  });
})
.catch(function (err) {
  console.error('Problem starting server')
  console.error(err);
});
