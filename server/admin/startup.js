/*
* Startup
* Functions to run on server startup. Note: this file is for calling functions
* only. Define functions in /server/admin/startup-functions.
*/

Meteor.startup(function(){

  // Generate Test Accounts
  generateTestAccounts();

});
