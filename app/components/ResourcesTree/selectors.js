/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectValo = () => createSelector(
  selectGlobal(),
  globalState => globalState.valo
);

export {
  selectValo
};
