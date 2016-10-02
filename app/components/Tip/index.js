import React from 'react';

import messages from './messages';
import styles from './styles.css';
import Octicon from 'react-octicon';

let id = 0;

function Tip(props) {

  const randID = 'popup' + id;

  console.log('hello');

  return (
    <div className={`${styles.tip_container} ${props.className}`}>
      <div className={`${styles.tip_link} ${styles.animate}`}>
        <a href={`#${randID}`}><Octicon name="unverified"/></a>
      </div>
      <div id={randID} className={styles.overlay}>
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
