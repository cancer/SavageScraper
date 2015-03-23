'use strict';

import {assign}       from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let fields = [];
let showAll = false;

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

  isShownAll() {
    return showAll;
  }
});

AppDispatcher.register((action) => {
  console.log(action.actionType)
  switch(action.actionType) {
    case ActionTypes.FIELDS_SHOW_ALL:
      fields = action.fields;
      showAll = true;
      FieldsStore.emitChange();
      break;

    case ActionTypes.FIELDS_SHOW_FILTERED_BY_MONTH:
      fields = action.fields;
      showAll = false;
      FieldsStore.emitChange();
      break;
  }
});

export default FieldsStore;

