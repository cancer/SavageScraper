'use strict';

var parseUnionTraditional = require('../parser/union_traditional');

module.exports = function(request, response){
  parseUnionTraditional('1', {
    params: request.params
  }).then((result) => {
    response.send(result);
  }).catch((error) => {
    response.send(error);
  });
};

