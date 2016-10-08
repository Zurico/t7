import React from 'react';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function HelperTour() {
  return (
    <div className={styles.wrapper}>
      <Tip className={styles.tree} message={messages.treeMessage} direction="up" />
      <Tip className={styles.footer_left} message={messages.footerLeftMessage} direction="down" />
      <Tip className={styles.footer_right} message={messages.footerRightMessage} direction="left" />
    </div>
  );
}

export default HelperTour;
