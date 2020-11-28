module.exports = {


  friendlyName: 'List opening hours',

  description: 'Lists opening hours of a given business.',


  inputs: {
    business: {
      description: 'id of the business',
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
    let businessId = inputs.business;
    if(!businessId) {
      businessId = this.req.session.businessId;
    }
    let result = await OpeningHour.find({
      where: {business: businessId},
    });

    return exits.success(result);
  }


};
