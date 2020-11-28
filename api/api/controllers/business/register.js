const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = {


  friendlyName: 'Register a new business',


  description: 'Allow a business owner to register his business.',


  inputs: {
    email: {
      description: 'Business owner email',
      type: 'string',
      required: true
    },
    password: {
      description: 'Business owner password',
      type: 'string',
      required: true
    },
    ownerName: {
      description: 'Business owner name',
      type: 'string',
      required: true
    },
    name: {
      description: 'Business name',
      type: 'string',
      required: true
    },
    address: {
      description: 'Business address',
      type: 'string',
      required: true
    },
    postalCode: {
      description: 'Business postal code',
      type: 'number',
      required: true
    },
    averageTimeSpent: {
      description: 'Average time spent in business',
      type: 'number',
      required: true
    },
    maxClient: {
      description: 'Maximum clients allowed in the business',
      type: 'number',
      required: true
    },
    category: {
      description: 'Category activity of the business',
      type: 'number',
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
    let hash = bcrypt.hashSync(inputs.password, SALT_ROUNDS);
    let business = await Business.create({
      email: inputs.email,
      password: hash,
      ownerName: inputs.ownerName,
      name: inputs.name,
      address: inputs.address,
      postalCode: inputs.postalCode,
      averageTimeSpent: inputs.averageTimeSpent,
      maxClient: inputs.maxClient,
    })
      .intercept('E_UNIQUE', () => {
        return new Error('email.already_exists');
      })
      .fetch();

    //TODO : email verification
    this.req.session.businessId = business.id;

    return exits.success(business);

  }


};
