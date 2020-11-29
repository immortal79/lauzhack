module.exports = {


  friendlyName: 'List slot',


  description: 'Lists slots, available or taken depending on who tries to see the slots (business or client).',


  inputs: {
    filter: {
      description: 'Will chose between \'taken\' and \'available\' slots',
      type: 'string',
      required: true
    },
    date: {
      description: 'YYYY-MM-DD on which we have to fetch slots',
      type: 'string',
      required: true
    },
    business: {
      description: 'id of the business',
      type: 'number',
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

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i.toString();
    }

    let businessId = !inputs.business ? this.req.session.businessId : inputs.business;

    let business = await Business.find({
      where: {id: businessId},
    });

    let averageTimeSpent = business[0].averageTimeSpent;

    let date = new Date(Date.parse(inputs.date));
    let nextDay = new Date(date);
    nextDay.setHours(nextDay.getHours() + 24);

    if (inputs.filter == "taken") {
      let results = await ReservationSlot.find({
        and: [
          {date: {'>=': date}},
          {date: {'<': nextDay}},
        ]
      });

      let output = [];

      results.forEach(result => {
        let resultStartDate = new Date(Date.parse(result.date));
        let resultEndDate = new Date(resultStartDate);
        resultEndDate.setMinutes(resultEndDate.getMinutes() + averageTimeSpent);

        let starth = addZero(resultStartDate.getHours());
        let startm = addZero(resultStartDate.getMinutes());
        let endh = addZero(resultEndDate.getHours());
        let endm = addZero(resultEndDate.getMinutes());

        let start = starth + ":" + startm;
        let end = endh + ":" + endm;

        output.push({start: start, end: end});
      });

      return exits.success(output);
    }

  }


};
