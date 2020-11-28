module.exports = {


  friendlyName: 'Delete opening hour',


  description: 'Delete opening hour from id.',


  inputs: {
    openingHour: {
      description: 'The opening hour to delete',
      type: 'string',
      required: true
    },
  },


  exits: {
    badRequest: {
      description: 'Opening hour doesnt exists ?',
      responseType: 'badRequest'
    },
    success: {
      description: 'Opening hour successfully removed',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    await OpeningHour.destroy({id: inputs.openingHour});

    // All done.
    return exits.success();

  }


};
