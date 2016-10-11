/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = {
  'settings' : {
    'language': 'en',
    'theme': 'default'
  },
  'session': {
    'id': '',
    'last_open': new Date()
  },
  'valo': {
    'localhost:8888':{
      'talo':{
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': ''}, {'title': 'Notebook_2', 'ext': 'js', 'content': ''}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': ''}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': ''}]
      }
    },
    '192.168.32.14:9898':{}
  },
  'user': {},
  'app': {
    'license': 'MIT',
    'loading': false,
    'error': false
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case LOAD_REPOS:
    //   return state
    //     .set('loading', true)
    //     .set('error', false)
    //     .setIn(['userData', 'repositories'], false);
    // case LOAD_REPOS_SUCCESS:
    //   return state
    //     .setIn(['userData', 'repositories'], action.repos)
    //     .set('loading', false)
    //     .set('currentUser', action.username);
    // case LOAD_REPOS_ERROR:
    //   return state
    //     .set('error', action.error)
    //     .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
