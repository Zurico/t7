import React from 'react';

import { FormattedMessage } from 'react-intl';
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
        <FormattedMessage {...props.message} />
      </div>
    </div>
  );
}

Tip.propTypes = {
  message: React.PropTypes.shape({
    id: React.PropTypes.string,
    defaultMessage: React.PropTypes.string
  })
};

export default Tip;
