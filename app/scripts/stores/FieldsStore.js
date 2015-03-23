'use strict';

import {assign}       from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';
let fields = [];

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
  }
});

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.SHOW_FIELDS:
      fields = action.fields;
      FeildsStore.emitChange();
      break;
  }
});

export default FieldsStore;

