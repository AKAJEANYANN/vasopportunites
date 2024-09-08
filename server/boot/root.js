// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function (server) {
  var ds = server.dataSources.vasopportunitesAppDb;
  if (ds.connected) {
     ds.automigrate();
    console.log("DB connected ✅")
  } else {
    ds.once('connected', function () {
       ds.automigrate();
      console.log("DB connected ✅")
    });
  }

  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
