'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('gisvgsbqur4j1rjn890nh3kfeo@group.calendar.google.com').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

