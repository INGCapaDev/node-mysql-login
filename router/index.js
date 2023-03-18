/* spellchecker: disable */
import express from 'express';
export const router = express.Router();
import bcrypt from 'bcrypt';

router.get('/', (req, res) => {
  if (req.session.loggedin != true) {
    res.render('cursos.html', { error: null });
    return;
  }
  return res.redirect('/home');
});

router.get('/login', (req, res) => {
  if (req.session.loggedin != true) {
    res.render('login.html', { error: null });
    return;
  }
  return res.redirect('/home');
});

router.post('/login', (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      `SELECT * FROM users WHERE email = ?`,
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          userdata.forEach((element) => {
            bcrypt.compare(data.pass, element.pass, (err, isMatch) => {
              if (!isMatch) {
                res.render('login.html', {
                  error: 'Contraseña incorrecta...',
                });
                return;
              }
              req.session.loggedin = true;
              req.session.username = element.username;
              return res.redirect('/home');
            });
          });
          return;
        }
        res.render('login.html', {
          error:
            'El correo que esta intentando utilizar no se encuentra registrado...',
        });
      }
    );
  });
});

router.get('/register', (req, res) => {
  if (req.session.loggedin != true) {
    res.render('register.html', { error: null });
    return;
  }
  return res.redirect('/home');
});

router.post('/register', (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      `SELECT * FROM users WHERE email = ?`,
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          res.render('register.html', {
            error:
              'Error: El correo que estas intentando utilizar ya se encuentra en uso',
          });
          return;
        }

        bcrypt.hash(data.pass, 12).then((hash) => {
          data.pass = hash;

          req.getConnection((err, conn) => {
            conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
              return res.render('success.html');
            });
          });
        });
      }
    );
  });
});

router.get('/recover', (req, res) => {
  if (req.session.loggedin != true) {
    res.render('recover.html');
    return;
  }
  return res.redirect('/home');
});

router.get('/home', (req, res) => {
  if (req.session.loggedin == true) {
    res.render('home.html', { username: req.session.username });
    return;
  }
  return res.redirect('/');
});

router.get('/logout', (req, res) => {
  if (req.session.loggedin == true) {
    req.session.destroy();
  }
  return res.redirect('/');
});

router.get('/test', (req, res) => {
  res.render('test.html');
});

router.get('/cuestionario', (req, res) => {
  if (req.session.loggedin == true) {
    res.render('cuestionario.html');
    return;
  }
  return res.redirect('/');
});

router.get('/temario', (req, res) => {
  if (req.session.loggedin == true) {
    res.render('temario.html');
    return;
  }
  return res.redirect('/');
});

router.get('/tema1', (req, res) => {
  if (req.session.loggedin == true) {
    res.render('tema1.html');
    return;
  }
  return res.redirect('/');
});
