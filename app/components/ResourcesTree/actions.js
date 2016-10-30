import {
  CHANGE_RESOURCE_SELECTED,
  ADD_RESOURCE,
  ADD_PAGE_TO_WORKSPACE
} from 'containers/App/constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeResourceSelected(resource) {
  return {
    type: CHANGE_RESOURCE_SELECTED,
    resource,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function addTreeResource(resource) {
  return {
    type: ADD_RESOURCE,
    resource,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function addToWorkSpace(page) {
  return {
    type: ADD_PAGE_TO_WORKSPACE,
    page,
  };
}
