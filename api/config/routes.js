/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /business/list': {action: 'business/list'},
  'POST /openinghours/create': {action: 'openinghours/create'},
  'POST /openinghours/delete': {action: 'openinghours/delete'},
  'GET /openinghours/list': {action: 'openinghours/list'},
  'POST /business/register': {action: 'business/register'},
  'POST /business/login': {action: 'business/login'},
  'GET /slot/list': {action: 'slot/list'},
  'POST /slots/create': {action: 'slot/create'},


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
