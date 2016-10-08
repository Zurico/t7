/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { mouseTrap } from 'react-mousetrap';
import { connect } from 'react-redux';
import { selectLocale } from '../LanguageProvider/selectors';
import { changeLocale } from '../LanguageProvider/actions';
import { appLocales } from '../../i18n';
import { createSelector } from 'reselect';
import styles from './styles.css';
import messages from './messages';
import Octicon from 'react-octicon';
import HotKeys from 'utils/hotkeys';
import PubSub from 'utils/pubsub';

class LocaleToggle extends React.Component { // eslint-disable-line

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.CHANGE_LANG.keys, this.bindShortcut.bind(this));
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_LANG_ITEM_SELECTED, this.changeLang.bind(this));
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  openFuzzyFinder(){
    // Request the fuzzy finder
    PubSub.publish(PubSub.topics.FUZZY_FINDER_REQUIRED, {
      // items: [{title: 'English', marked: true, value: 'en'}, {title: 'Spanish', value: 'es'}, {title: 'Hebrew', value: 'heb'}],
      items: [
        {title: 'English', marked: true, value: 'en'},
        // {title: 'English1', value: 'en1'},
        // {title: 'English2', value: 'en12'},
        // {title: 'English3', value: 'en13'},
        // {title: 'English4', value: 'en14'},
        // {title: 'English5', value: 'en15'},
        // {title: 'English6', value: 'en16'},
        // {title: 'English7', value: 'en17'},
        // {title: 'English8', value: 'en18'},
        // {title: 'English9', value: 'en19'},
        // {title: 'English10', value: 'en21'},
        // {title: 'English11', value: 'en221'},
        // {title: 'English12', value: 'en23'},
        // {title: 'English13', value: 'en24'},
        // {title: 'English14', value: 'en25'},
        {title: 'Spanish', value: 'de'},
        {title: 'Hebrew', value: 'heb'}],
      topic: PubSub.topics.FUZZY_FINDER_LANG_ITEM_SELECTED
    });
  }

  bindShortcut(){
    this.openFuzzyFinder();
    // Prevent default
    return HotKeys.CHANGE_LANG.default;
  }

  changeLang(topic, lang){
    console.log('fire changelang', lang);
    this.props.onLocaleToggle(lang);
  }

  render() {
    return (
      <span title={this.props.locale} className={styles.status_bar_lang} onClick={this.openFuzzyFinder.bind(this)}>
        <Octicon name="globe"/> <em>Language</em>
      </span>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: React.PropTypes.func,
  locale: React.PropTypes.string
};

const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => ({ locale })
);

const mapDispatchToProps = dispatch => {
  return {
    onLocaleToggle: lang => dispatch(changeLocale(lang)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(LocaleToggle));
