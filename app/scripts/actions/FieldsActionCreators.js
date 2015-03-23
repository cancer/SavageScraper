'use strict';

import request         from 'axios'
import AppDispatcher   from '../dispatcher/AppDispatcher';
import FieldsConstants from '../constants/AppConstants';

let ActionTypes = FieldsConstants.ActionTypes;
let apiRoot = '/api/';

export default {
  fetchAllFields: () => {
    request.get(`${apiRoot}fields/`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.SHOW_FIELDS,
          fields: res.data.contents
        });
      });
  }
}

