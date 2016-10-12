import {
  CHANGE_NOTEBOOK_SELECTED,
} from 'containers/App/constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeNotebookSelected(notebook) {
  return {
    type: CHANGE_NOTEBOOK_SELECTED,
    notebook,
  };
}
