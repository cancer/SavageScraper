'use strict';

import request         from 'axios'
import AppDispatcher   from '../dispatcher/AppDispatcher';
import FieldsConstants from '../constants/AppConstants';

let ActionTypes = FieldsConstants.ActionTypes;
let apiRoot = '/api/';

export default {
  fetchAllFields() {
    request.get(`${apiRoot}fields/`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.FIELDS_SHOW_ALL,
          fields: res.data.contents
        });
      });
  },

  fetchByMonth(year, month) {
    request.get(`${apiRoot}fields/${year}/${month}`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.FIELDS_SHOW_FILTERED_BY_MONTH,
          fields: res.data.contents
        });
      });
  }
}

