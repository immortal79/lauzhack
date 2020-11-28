module.exports = {


  friendlyName: 'List opening hours',

  description: 'Lists opening hours of a given business.',


  inputs: {
    business: {
      description: 'id of the business',
      type: 'string',
      required: true
    },
  },


  exits: {
    badRequest: {
      description: 'Identifier input error.',
      responseType: 'badRequest'
    },
    success: {
      description: 'Successful search',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    let result = await OpeningHour.find({
      where: {business: inputs.business},
    });

    return exits.success(result);
  }


};
