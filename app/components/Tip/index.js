import React from 'react';

import messages from './messages';
import styles from './styles.css';
import Octicon from 'react-octicon';

function Tip(props) {

  const directionClass = `tooltip_${props.direction || 'down'}`;

  return (
    <div className={`${styles.wrapper} ${props.className}`}>
      <div className={styles.animate}>
        <Octicon name="unverified"/>
      </div>
      <div className={`${styles.tooltip} ${styles[directionClass]}`}>
        {props.message}
      </div>
    </div>
  );
}

Tip.propTypes = {
  message: React.PropTypes.string
};

export default Tip;
