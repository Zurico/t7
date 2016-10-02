import React from 'react';

import messages from './messages';
import styles from './styles.css';
import Octicon from 'react-octicon';

let id = 0;

function Tip(props) {

  const randID = 'popup' + id;

  console.log('hello');

  return (
    <div className={`${styles.wrapper} ${props.className}`}>
      <div className={styles.animate}>
        <Octicon name="unverified"/>
      </div>
      <div className={styles.tooltip}>
        {props.message}
      </div>
    </div>
  );
}

Tip.propTypes = {
  message: React.PropTypes.string
};

export default Tip;
