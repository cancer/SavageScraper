'use strict';

var parseUnionTraditional = require('../parser/union_traditional');

module.exports = function(request, response){
  parseUnionTraditional('3').then((result) => {
    response.send(result);
  }).catch((error) => {
    response.send(error);
  });
};

