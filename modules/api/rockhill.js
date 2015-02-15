'use strict';

var parseGoogleCalendar = require('../parser/google_calendar');

module.exports = function(request, response){
  parseGoogleCalendar('https://www.google.com/calendar/feeds/uqgnng6jo9438d0eo6609lms2g@group.calendar.google.com/public/basic?alt=json').then(function(result){
    response.send(result);
  }).catch(function(err){
    response.send(err)
  });
};

