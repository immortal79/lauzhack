module.exports = {


  friendlyName: 'List Business',

  description: 'Lists business containing user input.',


  inputs: {
    search: {
      description: 'Search input from user',
      type: 'string',
      required: false
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
    let result = await Business.find({
      where: {name: {contains: inputs.search}},
      limit: 15
    });

    return exits.success(result);
  }


};
