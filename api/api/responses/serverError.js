module.exports = function serverError(optionalData) {

  const req = this.req;
  const res = this.res;

  const statusCodeToSet = 500;

  let response = {status: 'error', message: ''};
  response = sails.helpers.processError(req, response, optionalData);

  return res.status(statusCodeToSet).send(response);

};
