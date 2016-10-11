import React from 'react';

import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import Octicon from 'react-octicon';
import PubSub from 'utils/pubsub';

class Tip extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  startReadingTip(){
    PubSub.publish(PubSub.topics.HELPER_TOUR_TIP_OPENED, null);
  }

  stopReadingTip(){
    PubSub.publish(PubSub.topics.HELPER_TOUR_TIP_CLOSED, null);
  }

  render() {
    const directionClass = `tooltip_${this.props.direction || 'down'}`;

    return (
      <div className={`${styles.wrapper} ${this.props.className}`}
           onMouseEnter={this.startReadingTip.bind(this)}
           onMouseLeave={this.stopReadingTip.bind(this)}>
        <div className={styles.animate}>
          <Octicon name="unverified"/>
        </div>
        <div className={`${styles.tooltip} ${styles[directionClass]}`}>
          <FormattedMessage {...this.props.message} />
        </div>
      </div>
    );
  }
}

Tip.propTypes = {
  message: React.PropTypes.shape({
    id: React.PropTypes.string,
    defaultMessage: React.PropTypes.string
  })
};

export default Tip;
