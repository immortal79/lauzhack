module.exports = {


  friendlyName: 'Create opening hours',

  description: 'Creates opening hours of a given business for a given day, opening time and closing time.',


  inputs: {
    business: {
      description: 'The id of the business',
      type: 'number',
      required: true
    },
    dayOfWeek: {
      description: 'The id of the day of week, 0 monday to 6 sunday',
      type: 'number',
      required: true
    },
    openTime: {
      description: 'The hour hh:mm at which the store opens',
      type: 'string',
      required: true
    },
    closeTime: {
      description: 'The hour hh:mm at which the store closes',
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
    let result = await OpeningHour.create({
      dayOfWeek: inputs.dayOfWeek,
      openTime: inputs.openTime,
      closeTime: inputs.closeTime,
      business: this.req.session.businessId
    }).fetch();

    return exits.success(result);
  }

};
