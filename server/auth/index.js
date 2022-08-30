const env = require('../../env')
const axios = require('axios');
const router = require('express').Router()
const { models: {User }} = require('../db');
const { response } = require('express');
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
const redirect_uri = 'http://localhost:8080/auth/spotify/callback'
const scope = 'streaming user-read-email user-read-private user-read-currently-playing user-library-read user-read-playback-state'
const state = `${Math.random()}`

router.get('/spotify', (req, res, next) => {
  res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&show_dialog=true&state=${state}&scope=${scope}`);
})

router.get('/spotify/callback', async(req, res, next) => {
  try{
    const code = req.query.code || null;
    const state = req.query.code || null;

    if(state === null){
      res.redirect('/#' +
        queryString.stringify({
          error: 'state_mismatch'
        }));
    } else{
      let response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
        }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + (process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
       }
      )
      const  { error, access_token } = response.data;
      if(err){
          const ex = new Error(err);
          ex.status = 401;
          next(ex)
      }
      else{
        res.send(response.data)
      }
    }
  }
  catch(ex){
    next(ex)
  }
})
