import React from 'react';

import messages from './messages';
import styles from './styles.css';
import Octicon from 'react-octicon';

function Tip(props) {
  return (
    <div className={styles.tip_container}>
      <div className={styles.tip_link}>
        <a href="#popup1"><Octicon name="unverified"/></a>
      </div>
      <div id="popup1" className={styles.overlay}>
      	<div className={styles.popup}>
      		<h2>Here i am</h2>
      		<a className={styles.close} href="#">&times;</a>
      		<div className={styles.content}>
      			{props.message}
      		</div>
      	</div>
      </div>

    </div>
  );
}

Tip.propTypes = {
  message: React.PropTypes.string
};

export default Tip;
