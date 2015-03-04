'use strict';

var parseUnionTraditional = require('../parser/union_traditional');

module.exports = function(request, response){
  var opts = {
    params: request.params
  };
  parseUnionTraditional('3', opts).then((result) => {
    response.send(result);
  }).catch((error) => {
    response.send(error);
  });
};

