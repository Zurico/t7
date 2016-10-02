import React from 'react';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function HelperTour() {
  return (
    <div className={styles.wrapper}>
      <Tip className={styles.tree} message={"This is a tip tree!!"} />
      <Tip className={styles.footer_left} message={"This is a tip footer left!!"} />
      <Tip className={styles.footer_right} message={"This is a tip footer right!!"} />
    </div>
  );
}

export default HelperTour;
