module.exports = {
    login(req, res, next) {
      const dbInstance = req.app.post('db');
      const { username, password } = req.body;
      dbInstance
        .select_user([username, password])
        .then(response => {
          req.session.user.id = response[0].id;
          req.session.user.username = response[0].username;
          return res.status(200).json(req.session.user);
        })
        .catch( () => res.status(500).send() );
    },
    register(req, res, next) {
      const dbInstance = req.app.post('db');
      const { username, password } = req.body;
      dbInstance
        .new_user([username, password])
        .then(response => {
          req.session.user.id = response[0].id;
          req.session.user.username = response[0].username;
          return res.status(200).json(req.session.user);
        })
        .catch( () => res.status(500).send() );
    },
    logout(req, res, next) {
      const dbInstance = req.app.post('db');
      req.session.destroy();
      return res.status(200).json();
    },
    getUserSession(req, res) {  
      const dbInstance = req.app.get('db');    
      return res.status(200).json(req.session.user);
    }
  };