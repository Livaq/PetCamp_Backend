const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 1000,
  max: 10,
  message: 'too many requests per 15 seconds',
});

module.exports = limiter;
