'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('uqgnng6jo9438d0eo6609lms2g@group.calendar.google.com').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

