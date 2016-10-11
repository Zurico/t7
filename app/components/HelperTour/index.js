import React from 'react';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import PubSub from 'utils/pubsub';

class HelperTour extends React.Component {

  constructor(props, context){
    super(props, context);
    // this.state = {overlay: false};
  }
  // Use code below if want to provide extra tip features (i.e. you have read this tip many times, need more help?)
  // componentWillMount() {
  //   // Subscribe to fuzzy finder lang messages
  //   this.pubSubTokenOpened = PubSub.subscribe(PubSub.topics.HELPER_TOUR_TIP_OPENED, this.tipOpened.bind(this));
  //   this.pubSubTokenClosed = PubSub.subscribe(PubSub.topics.HELPER_TOUR_TIP_CLOSED, this.tipClosed.bind(this));
  // }
  //
  // componentWillUnmount(){
  //   // Unsubscribe to fuzzy finder lang messages
  //   if(this.pubSubTokenOpened) PubSub.unsubscribe(this.pubSubTokenOpened);
  //   if(this.pubSubTokenClosed) PubSub.unsubscribe(this.pubSubTokenClosed);
  // }
  //
  // tipOpened(){
  //   this.setState({overlay: true});
  // }
  //
  // tipClosed(){
  //   this.setState({overlay: false});
  // }

  render(){
    return (
      <div className={styles.wrapper}>
        <Tip className={styles.tree} message={messages.treeMessage} direction="up" />
        <Tip className={styles.footer_left} message={messages.footerLeftMessage} direction="down" />
        <Tip className={styles.footer_right} message={messages.footerRightMessage} direction="left" />
        {/*<div className={this.state.overlay ? styles.overlay : ''}></div>*/}
        <div className={styles.overlay}></div>
      </div>
    );
  }
}

export default HelperTour;
