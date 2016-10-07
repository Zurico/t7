import React from 'react';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function HelperTour() {
  return (
    <div className={styles.wrapper}>
      <Tip className={styles.tree} message={"Use the options up"} direction="up" />
      <Tip className={styles.footer_left} message={"Use the options down"} direction="down" />
      <Tip className={styles.footer_right} message={"Use the options below to change the application language, report a bug or syncronice your notebooks"} direction="left" />
    </div>
  );
}

export default HelperTour;
