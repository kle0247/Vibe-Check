const env = require('../../env')
const axios = require('axios');
const router = require('express').Router()
const { models: {User }} = require('../db');
const querystring = require('querystring');

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

/* spotify api */
const redirect_uri = 'http://localhost:8080/auth/spotify/callback'
const scope = 'streaming user-read-email user-read-private user-read-currently-playing user-read-recently-played  user-library-read user-read-playback-state user-top-read'
const state = `${Math.random()}`

router.get('/spotify', (req, res, next) => {
  res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`);
})

router.get('/spotify/callback', async(req, res, next) => {
  try{
    let data = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: redirect_uri, 
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
    let headers = {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
          'Content-Type':'application/x-www-form-urlencoded'
    }
    // get access token
    let response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), headers );

    const { error } = response.data;
    const { access_token, refresh_token } = response.data
    if(error){
      const ex = new Error(error);
      ex.status = 401;
      next(ex)
    }

    else{
      
      profile = await axios.get('https://api.spotify.com/v1/me', {
        headers: 
        { 
          'Authorization': 'Bearer ' + access_token 
        } 
      }); 
      const { email, id } = profile.data;

      let user = await User.findOne({
        where: {
          spotifyId: id
        }}); 
      
      if(!user){
        const loginIdx = email.search('@');
        const login = email.slice(0, loginIdx);

        user = await User.create({
          username: login, 
          spotifyId: id, 
          password: Math.random().toString()
        })
      } 
      
      const token = require('jsonwebtoken').sign({ id: user.id }, process.env.JWT)

      res.send(`
        <html>
          <head>
            <script>
              window.localStorage.setItem('token', '${token}');
              window.localStorage.setItem('access_token', '${access_token}');
              window.localStorage.setItem('refresh_token', '${refresh_token}');
              window.location = '/';
            </script>
          </head>
          <body>
          ...Signing in
          </body>
        </html>
      `)
    }
  }
  catch(ex){
    next(ex)
  }
});
