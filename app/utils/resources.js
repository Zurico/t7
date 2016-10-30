
import _ from 'lodash';

export function isNotebook(resource){
  return resource.split('/').length === 4;
}

export function getExt(resource){
  return isNotebook(resource) ? resource.split('.').pop() : false;
}

export function getNotebookTitle(resource){
  return isNotebook(resource) ? resource.replace(/^.*[\\\/]/, '') : '';
}

export function getPath(resource){
  const path = resource.split('/');
  path.pop();
  return path;
}

export function getNotebookContent(tree, resource){
  return isNotebook(resource) ? _.get(tree, getPath(resource)).content : false;
}
