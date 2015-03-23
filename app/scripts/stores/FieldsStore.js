'use strict';

import {assign}       from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let fields = [];
let showAll = false;
let selectMonth = null;

var FieldsStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll() {
    return fields;
  },

  getFilteredMonth() {
    return selectMonth;
  }
});

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ActionTypes.FIELDS_SHOW_ALL:
      fields = action.fields;
      selectMonth = null;
      FieldsStore.emitChange();
      break;

    case ActionTypes.FIELDS_SHOW_FILTERED_BY_MONTH:
      fields = action.fields;
      selectMonth = action.selectMonth;
      FieldsStore.emitChange();
      break;
  }
});

export default FieldsStore;

