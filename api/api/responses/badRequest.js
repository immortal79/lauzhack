module.exports = function badRequest(optionalData) {

  const req = this.req;
  const res = this.res;

  const statusCodeToSet = 400;

  let response = {status: 'error', message: ''};
  response = sails.helpers.processError(req, response, optionalData);

  return res.status(statusCodeToSet).send(response);

};
