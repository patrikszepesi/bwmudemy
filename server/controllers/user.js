const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth =  function(req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Add meg az emailt meg a jelszót'}]});
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Ez a felhasználó Nem létezik'}]});
    }

    if (user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h'});

      return res.json(token);
    } else {
      return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Rossz email vagy jelszó'}]});
    }
  });
}

exports.register =  function(req, res) {
  const { username, email, password, passwordConfirmation,role } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Email és Jelszó megadása kötelező'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Jelszó nem egyezik'}]});
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'Ezt az emailt már használják'}]});
    }

    const user = new User({
      username,
      email,
      password,
      role
    });

    user.save(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'registered': true});
    })
  })
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'Be kell Jelentkezned'}]});
}
