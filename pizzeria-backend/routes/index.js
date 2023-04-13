var express = require('express');
var router = express.Router();
import {googleAuthHandler} from "../controllers/googleAuth"


const {expressjwt: jwt} = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-sygvqc08vcvavsoi.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'my-api',
  issuer: `https://dev-sygvqc08vcvavsoi.us.auth0.com/`,
  algorithms: ['RS256']
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/api/sessions/oauth/google', googleAuthHandler)

// router.get('/uiconfig', function(req, res, next) {
//   res.send({
//     domain: 'dev-sygvqc08vcvavsoi.us.auth0.com',
//     clientId: '9lYYpLAEQZCWMiq8QIgpWcGcrMXBvoKq',
//   });
// });

// router.get('/protected', checkJwt, function(req, res) {
//   res.json({
//     message: 'This is a protected endpoint.'
//   });
// });

module.exports = router;
