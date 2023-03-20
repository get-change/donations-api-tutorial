const express = require('express')
const querystring = require('node:querystring')

// put your public and secret keys here
const public_key = process.env.CHANGE_PUBLIC_KEY || ''
const secret_key = process.env.CHANGE_SECRET_KEY || ''

// setup express
const app = express()
const port = 3000

// PART 0: SETTING THE SCENE
// parses JSON payloads
app.use(express.json())

// PART 0: SETTING THE SCENE
// GET /
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello Change!'
  })
})

// PART 1: MAKING A DONATION
// POST /donate
app.post('/donate', (req, res) => {
  const { amount, nonprofit_id, funds_collected } = req.body

  // do your business logic here

  fetch('https://api.getchange.io/api/v1/donations', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(public_key + ":" + secret_key).toString('base64'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      amount: amount,
      nonprofit_id: nonprofit_id,
      funds_collected: funds_collected
    })
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// PART 2: RETRIEVING DONATIONS
// GET /donation/:id
app.get('/donation/:id', (req, res) => {
  const { id } = req.params

  // do your business logic here

  fetch(`https://api.getchange.io/api/v1/donations/${id}`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Basic ' + Buffer.from(public_key + ":" + secret_key).toString('base64'),
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// PART 2: RETRIEVING DONATIONS
// GET /donations
app.get('/donations', (req, res) => {
  const allowedKeys = ['nonprofit_id', 'external_id', 'start_timestamp', 'end_timestamp']
  const filteredParams = {};
  for (const key in req.query) {
    if (allowedKeys.includes(key)) filteredParams[key] = req.query[key]
  }

  // do your business logic here

  fetch(`https://api.getchange.io/api/v1/donations?${querystring.stringify(filteredParams)}`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Basic ' + Buffer.from(public_key + ":" + secret_key).toString('base64'),
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// PART 3: LEVELING UP YOUR DONATION GAME
// POST /tea
app.post('/tea', (req, res) => {
  const types = ['jasmine', 'green', 'black', 'oolong']
  const { type, customer_id } = req.body
  if (!types.includes(type)) return res.status(400).json({message: 'invalid tea type'})

  // update our database with a new purchase of tea of type 'type'

  fetch('https://api.getchange.io/api/v1/donations', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(public_key + ":" + secret_key).toString('base64'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      external_id: customer_id,                   // we can use this to track customers
      amount: type === 'green' ? 100 : 50,        // $1 if green tea, 50 cents otherwise
      nonprofit_id: "n_t0smgoaSWHMjC2LKEpAf4n90", // Black Girls Code nonprofit ID
      funds_collected: false,                     // we are donating this money, not the customer
      metadata: {
        tea_type: type                            // we can use this to track tea types
      }
    })
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// PART 3: LEVELING UP YOUR DONATION GAME
// GET /tea-donations
app.get('/tea-donations', (req, res) => {
  const allowedKeys = ['nonprofit_id', 'external_id', 'start_timestamp', 'end_timestamp']
  const filteredParams = {};
  for (const key in req.query) {
    if (allowedKeys.includes(key)) filteredParams[key] = req.query[key]
  }

  // do your business logic here

  fetch(`https://api.getchange.io/api/v1/donations?${querystring.stringify(filteredParams)}`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Basic ' + Buffer.from(public_key + ":" + secret_key).toString('base64'),
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})


app.listen(port, () => {
  console.log(`Donation app listening on port ${port}`)
})
