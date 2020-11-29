module.exports = {


  friendlyName: 'Place a reservation for a date',


  description: 'Place a reservation for a date',


  inputs: {
    business: {
      description: 'Id of the business for the slot reservation',
      type: 'number',
      required: true
    },
    date: {
      description: 'Date for the slot reservation',
      type: 'string',
      required: true
    },
    email: {
      description: 'Client email for the slot reservation',
      type: 'string',
      required: true
    },
  },


  exits: {
    badRequest: {
      description: 'Reservation slot not available.',
      responseType: 'badRequest'
    },
    success: {
      description: 'Reservation created successfully',
      responseType: 'ok'
    }
  },


  fn: async function (inputs, exits) {
    //TODO: check there are still slots left before insert
    let client = await Client.findOrCreate({email: inputs.email}, {email: inputs.email});
    let reservation = await ReservationSlot.create({
      business: inputs.business,
      date: new Date(Date.parse(inputs.date)).toISOString().substring(0, 10),
      client: client.id,
    }).fetch();

    return exits.success(reservation);
  }


};
