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
  CHANGE_RESOURCE_SELECTED,
  ADD_RESOURCE,
  ADD_PAGE_TO_WORKSPACE,
} from './constants';
import { fromJS } from 'immutable';
import _ from 'lodash';

// The initial state of the App
const initialState = fromJS({
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
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}, {'title': 'Notebook_2', 'ext': 'js', 'content': null}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}]
      }
    },
    'localhost:8881':{
      'talo':{
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}, {'title': 'Notebook_2', 'ext': 'js', 'content': null}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}]
      }
    },

    'localhost:8882':{
      'talo':{
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}, {'title': 'Notebook_2', 'ext': 'js', 'content': null}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}]
      }
    },

    'localhost:8883':{
      'talo':{
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}, {'title': 'Notebook_2', 'ext': 'js', 'content': null}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}]
      }
    },

    'localhost:8884':{
      'talo':{
        'samples': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}, {'title': 'Notebook_2', 'ext': 'js', 'content': null}],
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}],
        'samples3': [],
      },
      'talo2':{},
      'talo3': {
        'samples2': [{'title': 'Notebook_1', 'ext': 'js', 'content': null}]
      }
    },

  },
  'workspace': {
    'pages': [],
    'actived': -1
  },
  'user': {},
  'app': {
    'license': 'MIT',
    'loading': false,
    'error': false,
    'resource': 'localhost:8888/talo/samples/Notebook_1.js'
  }
});

function appReducer(state = initialState, action) {

  let temporalState;

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
    case ADD_PAGE_TO_WORKSPACE:
      const getPages = state.getIn(['workspace', 'pages']);
      const pageIndex = getPages.findIndex(page => page.id === action.page.id);
      if(pageIndex > -1) return state.setIn(['workspace', 'actived'], pageIndex);
      temporalState = state.setIn(['workspace', 'pages'], getPages.push(action.page));
      return temporalState.setIn(['workspace', 'actived'], temporalState.getIn(['workspace', 'pages']).count()-1);
    case CHANGE_RESOURCE_SELECTED:
      return state.setIn(['app', 'resource'], action.resource);
    case ADD_RESOURCE:

      // Use the browser's built-in functionality to quickly and safely escape
      // the string
      function escapeHtml(str) {
          const div = document.createElement('div');
          div.appendChild(document.createTextNode(str));
          const escapedString = div.innerHTML;
          div.remove();
          return escapedString;
      }

      function createPath(pathRoute, localState = state){
        const aNewResource = pathRoute.reverse().reduce((a, b) => {

          const temp = {};
          temp[b] = a;

          return temp;
        }, _.size(aNewResourcePath) === 3 ? [] : {});
        return localState.setIn(['valo'], localState.get('valo').mergeDeep(aNewResource));
      }

      function createNotebook(notebookPath, notebookTitle, localState = state){
        const notebookData = notebookTitle.split('.');
        const notebook = { 'title':notebookData[0] , 'ext': notebookData[1] ? notebookData[1] : 'js', content: null};
        return localState.setIn(notebookPath, localState.getIn(notebookPath).push(notebook));
      }

      const path = (action.resource || '').trim();

      if(!(/^([a-zA-Z0-9\_\-\/\:\.]+)$/.test(path))) return state;

      const localState = state.setIn(['app', 'resource'], action.resource);

      // Remove empty values in array
      const aNewResourcePath = path.split('/');

      if(_.size(aNewResourcePath) < 4){
        return createPath(aNewResourcePath, localState);
      }

      const notebook = aNewResourcePath.pop();
      const notebookPath = ['valo'].concat(aNewResourcePath);

      if(state.hasIn(notebookPath)){
        return createNotebook(notebookPath, notebook, localState);
      }

      // Create path, then notebook
      return createNotebook(notebookPath, notebook, createPath(aNewResourcePath, localState));

    default:
      return state;
  }
}

export default appReducer;
