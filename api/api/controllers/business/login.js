const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Login',


  description: 'Login business owner.',


  inputs: {
    email: {
      description: 'Email of the user',
      type: 'string',
      required: true
    },
    password: {
      description: 'Password of the user',
      type: 'string',
      required: true
    },
  },


  exits: {
    badRequest: {
      description: 'Input error.',
      responseType: 'badRequest'
    },
    success: {
      description: 'Registered successfully + mail sent',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let business = await Business.findOne({where: {email: inputs.email}});
    if (business) {
      bcrypt.compare(inputs.password, business.password).then(async (result) => {
        if (result) {
          req.session.businessId = business.id;
          return exits.success(business);
        } else {
          return exits.badRequest('user.unknown');
        }
      });
    } else {
      return exits.badRequest('user.unknown');
    }

  }


};
