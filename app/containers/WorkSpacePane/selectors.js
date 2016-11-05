/**
 * Homepage selectors
 */
import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectWorkSpace = () => createSelector(
 selectGlobal(),
 globalState => globalState.get('workspace').toJSON()
);

export {
  selectWorkSpace
};
