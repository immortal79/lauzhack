module.exports = function ok(responseData) {

  const res = this.res;

  const statusCodeToSet = 200;

  const response = {status: 'ok', data: responseData};

  return res.status(statusCodeToSet).send(response);
};
