module.exports = async function (req, res, proceed) {

  if (req.session.businessId) {
    return proceed();
  }

  return res.forbidden();

};
