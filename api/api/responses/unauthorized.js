module.exports = function forbidden(optionalData) {

  const req = this.req;
  const res = this.res;

  const statusCodeToSet = 401;

  let response = {status: 'error', message: ''};
  response = sails.helpers.processError(req, response, optionalData);

  return res.status(statusCodeToSet).send(response);

};
