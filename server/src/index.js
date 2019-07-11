var express = require('express');
var Twitter = require('twit');
var bodyParser = require('body-parser');
var app = express();

let cache = [];
let cacheAge = 0;

// Update your client credentials here
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/api/user', (req, res) => {
  client.get('account/verify_credentials').then(user => {    
    res.send(user)
  }).catch(error => {
    res.send(error);
  });
});

app.get('/api/dashboard', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    cacheAge = Date.now();
    const params = { tweet_mode: 'extended', count: 200 };
    if (req.query.since) {
      params.since_id = req.query.since;
    }
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});

app.post('/api/search', (req, res) => {  
  client
    .get(`search/tweets.json?q=${req.body.search}`)
    .then(search => res.send(search))
    .catch(error => res.send(error));
});

app.post('/api/like', (req, res) => {
  const path = (req.body.state) ? 'create' : 'destroy';
  const id = parseInt(req.body.id)
  client
    .post('favorites/' + path + '.json?id=' + id)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/retweet', (req, res) => {
  const id = parseInt(req.body.id)
  client
    .post(`statuses/retweet.json?id=${id}`)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});



app.listen(4000, () => {
  console.info("Sever started");
})