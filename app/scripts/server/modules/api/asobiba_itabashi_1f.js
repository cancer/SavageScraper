'use strict';

var parseAsobiba = require('../parser/asobiba');

module.exports = function(request, response){
  parseAsobiba('1', {
    params: request.params
  }).then((result) => {
    response.send(result);
  }).catch((error) => {
    response.send(error);
  });
};
