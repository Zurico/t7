import React from 'react';
import ReactDOM from 'react-dom';
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

  remove(){
    // @todo is this fine? maybe we should re-render parent component to unmount child by publishing
    // PubSub.publish(PubSub.topics.HELPER_TOUR_TIP_REMOVED, null);
    this.refs.tip.remove();
  }

  render() {
    const directionClass = `tooltip_${this.props.direction || 'down'}`;

    return (
      <div ref="tip" className={`${styles.wrapper} ${this.props.className}`}
           onMouseEnter={this.startReadingTip.bind(this)}
           onMouseLeave={this.stopReadingTip.bind(this)}>
        <div className={styles.animate}>
          <Octicon name="unverified"/>
        </div>
        <div className={`${styles.tooltip} ${styles[directionClass]}`}>
          {/*<div className={styles.x} onClick={this.remove.bind(this)}></div>*/}
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
