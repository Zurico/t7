/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/* System imports */
import React from 'react';
import Helmet from 'react-helmet';
import { mouseTrap } from 'react-mousetrap';
import mouseTrapCore from 'mousetrap';
/* CSS imports */
import 'sanitize.css/sanitize.css'; // Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import styles from './styles.css';

/* Components imports */
import ResourcesTree from 'components/ResourcesTree';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';
import HelperTour from 'components/HelperTour';
import FuzzyFinder from 'components/FuzzyFinder';
import HotKeys from 'utils/hotkeys';
import PubSub from 'utils/pubsub';

class App extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.DISCOVER_ACTION.keys, this.discoverAction.bind(this));

    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.ACTION_SELECTED, this.actionSelected.bind(this));
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  openFuzzyFinder(){
    // Request the fuzzy finder
    PubSub.publish(PubSub.topics.FUZZY_FINDER_REQUIRED, {
      items: [
        {value: HotKeys.CHANGE_LANG.keys, title: 'talo.containers.App.actions.change_lang', hint: HotKeys.CHANGE_LANG.keys},
        {value: HotKeys.ADD_NOTEBOOK.keys, title: 'talo.containers.App.actions.add_notebook', hint: HotKeys.ADD_NOTEBOOK.keys},
        {value: HotKeys.OPEN_NOTEBOOK.keys, title: 'talo.containers.App.actions.open_notebook', hint: HotKeys.OPEN_NOTEBOOK.keys},
        {value: HotKeys.SPLIT_WORKSPACE_VERTICALLY.keys, title: 'talo.containers.App.actions.split_workspace', hint: HotKeys.SPLIT_WORKSPACE_VERTICALLY.keys},

      ],
      topic: PubSub.topics.ACTION_SELECTED
    });
  }

  discoverAction(){
    this.openFuzzyFinder();
    // Prevent default
    return HotKeys.DISCOVER_ACTION.default;
  }

  actionSelected(topic, resource){
    mouseTrapCore.trigger(resource);
  }

  render(){
    return (
      <section className={styles.main}>
        <Helmet
          titleTemplate="%s - Talo"
          defaultTitle="Talo"
          meta={[
            { name: 'description', content: 'a Valo based UI application for devs and devops' },
          ]}
        />
          <article className={styles.workspace}>
            <ResourcesTree />
            {React.Children.toArray(this.props.children)}
            {/*<Tabs>{React.Children.toArray(props.children)}</ Tabs>*/}
          </article>
          <Footer />
          <FuzzyFinder />
          <HelperTour />
      </section>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default mouseTrap(App);
