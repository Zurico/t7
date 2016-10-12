/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectValo = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('valo').toJSON()
);

const selectNotebook = () => createSelector(
  selectGlobal(),
  globalState => globalState.getIn(['app', 'notebook'])
);

export {
  selectValo,
  selectNotebook
};
