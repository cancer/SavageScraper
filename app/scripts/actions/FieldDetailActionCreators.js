'use strict';

import request         from 'axios'
import AppDispatcher   from '../dispatcher/AppDispatcher';
import AppConstants    from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let apiRoot = '/api/';

export default {
  fetchField(field) {
    request.get(`${apiRoot}field/${field}/`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.FIELDDETAIL_SHOW,
          field: res.data.contents
        });
      });
  },

  fetchFieldByMonth(field, year, month) {
    request.get(`${apiRoot}field/${field}/${year}/${month}`)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.FIELDDETAIL_SHOW,
          field: res.data.contents
        });
      });
  }
}

