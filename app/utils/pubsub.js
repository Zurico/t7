import PubSub from 'pubsub-js';

// @todo check a way of using symbols or making constants easier to write
PubSub.topics = {

  'FUZZY_FINDER_REQUIRED': 'FUZZY_FINDER_REQUIRED', // Fired when a component requires the fuzzy finder
  'FUZZY_FINDER_LANG_ITEM_SELECTED': 'FUZZY_FINDER_LANG_ITEM_SELECTED', // Fired when user selects a language in the fuzzy finder
  'HELPER_TOUR_TIP_OPENED': 'HELPER_TOUR_TIP_OPENED', // Fired when user opens a tip
  'HELPER_TOUR_TIP_CLOSED': 'HELPER_TOUR_TIP_CLOSED', // Fired when user closed a tip

}

export default PubSub;
