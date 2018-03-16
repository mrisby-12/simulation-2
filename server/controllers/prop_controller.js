module.exports = {
    createNewProp( req, res, next ) {
      const dbInstance = req.app.post('db');
      const {
        prop_name,
        description,
        address,
        city,
        state,
        zip,
        image_url,
        loan_amount,
        monthly_mortgage,
        desired_rent
        
      } = req.body;
      const user_id = req.session.user.id; 
      dbInstance
        .new_home([
          prop_name,
          description,
          address,
          city,
          state,
          zip,
          image_url,
          loan_amount,
          monthly_mortgage,
          desired_rent,
          user_id
        ])
        .then(response => {
          return res.status(200).json(response);
        })
        .catch( () => res.status(500).send() );
    },
    getUserProp( req, res, next ) {
      const dbInstance = req.app.get('db');
    
      const user_id = req.session.user.id; 
      if (req.query.rent) {
       
        dbInstance
          .select_homes_filtered([user_id, req.query.rent])
          .then(response => {
            return res.status(200).json(response);
          })
          .catch( () => res.status(500).send() );
      } else {
       
        dbInstance
          .select_homesByUserId([user_id])
          .then(response => {
            return res.status(200).json(response);
          })
          .catch( () => res.status(500).send() );
      }
    },
    deleteProp( req, res, next ) {
      const dbInstance = req.app.delete('db');
      const { home_id } = req.body;
      dbInstance
        .delete_home([home_id])
        .then(response => {
          //return res.status(200).json(response);
          console.log(res.status)
        })
        .catch( () => res.status(500).send() );
    }
  };