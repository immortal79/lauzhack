module.exports = {

  friendlyName: 'Process error',

  description: '',

  sync: true,

  inputs: {
    req: {
      type: 'ref',
      description: 'The request object.',
      required: true
    },
    response: {
      type: 'ref',
      description: 'The preformatted response object.',
      required: true
    },
    optionalData: {
      type: 'ref',
      description: 'The optional error data.'
    }
  },

  exits: {
    success: {
      description: 'All done.'
    }
  },

  fn: function (inputs, exits) {
    let response = inputs.response;
    const optionalData = inputs.optionalData;
    const url = inputs.req.url;
    const ip = inputs.req.ip;

    if (optionalData !== undefined) {
      if (_.isError(optionalData)) {
        if (optionalData.message !== undefined) {
          response.message = optionalData.message;
        }
      }
      else {
        response.message = optionalData;
      }
    }

    sails.log.error({url: url, ip: ip, message: response.message});
    return exits.success(response);
  }

};
