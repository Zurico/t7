import PubSub from 'pubsub-js';

// @todo check a way of using symbols or making constants easier to write
PubSub.topics = {

  'FUZZY_FINDER_REQUIRED': 'FUZZY_FINDER_REQUIRED', // Fired when a component requires the fuzzy finder
  'FUZZY_FINDER_LANG_ITEM_SELECTED': 'FUZZY_FINDER_LANG_ITEM_SELECTED' // Fired when user selects a language in the fuzzy finder

}

export default PubSub;
