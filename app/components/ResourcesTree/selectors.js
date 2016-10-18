/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectValo = () => createSelector(
  selectGlobal(),
  globalState => globalState.get('valo').toJSON()
);

const selectResource = () => createSelector(
  selectGlobal(),
  globalState => globalState.getIn(['app', 'resource'])
);

export {
  selectValo,
  selectResource
};
