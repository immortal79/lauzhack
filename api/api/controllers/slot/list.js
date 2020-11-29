const moment = require('moment');

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
        i = '0' + i;
      }
      return i.toString();
    }

    let businessId = !inputs.business ? this.req.session.businessId : inputs.business;

    let business = await Business.findOne({
      where: {id: businessId},
    });

    let averageTimeSpent = business.averageTimeSpent;

    let date = new Date(Date.parse(inputs.date));
    let nextDay = new Date(date);
    nextDay.setHours(nextDay.getHours() + 24);

    let takenSlots = await ReservationSlot.find({
      and: [
        {date: {'>=': date}},
        {date: {'<': nextDay}},
        {business: businessId}
      ]
    });

    let output = [];
    if (inputs.filter === 'taken') {

      takenSlots.forEach(result => {
        let resultStartDate = new Date(Date.parse(result.date));
        let resultEndDate = new Date(resultStartDate);
        resultEndDate.setMinutes(resultEndDate.getMinutes() + averageTimeSpent);

        let starth = addZero(resultStartDate.getHours());
        let startm = addZero(resultStartDate.getMinutes());
        let endh = addZero(resultEndDate.getHours());
        let endm = addZero(resultEndDate.getMinutes());

        let start = starth + ':' + startm;
        let end = endh + ':' + endm;

        output.push({start: start, end: end});
      });

    } else {
      let dayOfWeek = date.getUTCDay() === 0 ? 6 : date.getUTCDay() - 1;
      let maxClients = business.maxClient;
      let slotDuration = 5; //Minimum slot size is 5 minutes
      let openingHours = await OpeningHour.find({
        where: {business: businessId, dayOfWeek: dayOfWeek},
      });

      openingHours.forEach(openingHour => {
        let openTime = moment(openingHour.openTime, 'HH:mm:ss');
        let closeTime = moment(openingHour.closeTime, 'HH:mm:ss');
        let minuteMillis = 1000 * 60;
        let totalSlots = (closeTime - openTime) / minuteMillis / slotDuration;
        for (let i = 0; i < totalSlots; i++) {
          let currentSlotTime = openTime.clone().add(i * 5, 'minute');
          let start = currentSlotTime;
          let end = currentSlotTime.clone().add(averageTimeSpent, 'minute');

          let currentSlot = {
            reservationStart: start.format('HH:mm'),
            reservationEnd: end.format('HH:mm'),
            slotLeft: maxClients
          };

          let takenPeriods = [];
          console.log('-----');
          takenSlots.forEach(slot => {
            for (let j = 0; j < averageTimeSpent / 5; j++) {
              let startDate = moment(slot.date).add(j * 5, 'minute');

              if (start.hour() === startDate.hour() && start.minutes() === startDate.minutes()) {
                currentSlot.slotLeft -= 1;
              }
            }
          });
          output.push(currentSlot);
        }
        console.log(totalSlots);
      });
    }
    return exits.success(output);

  }


};
