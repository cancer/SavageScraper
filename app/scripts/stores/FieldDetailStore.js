'use strict';

import {assign}       from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let field = null;

var FieldDetailStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get() {
    return field;
  }
});

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ActionTypes.FIELDDETAIL_SHOW:
      field = action.field;
      FieldDetailStore.emitChange();
      break;
  }
});

export default FieldDetailStore;

