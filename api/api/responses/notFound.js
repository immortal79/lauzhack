module.exports = function notFound(optionalData) {

  const req = this.req;
  const res = this.res;

  const statusCodeToSet = 404;

  let response = {status: 'error', message: ''};
  response = sails.helpers.processError(req, response, optionalData);

  return res.status(statusCodeToSet).send(response);

};
