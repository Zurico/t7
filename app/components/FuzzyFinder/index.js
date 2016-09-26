import React from 'react';

import messages from './messages';
import styles from './styles.css';

function FuzzyFinder() {
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}>
          <input className={styles.text_editor} type="text" />
          <ol className={styles.list_group}>
            <li className={styles.selected}>English</li>
            <li>Spanish</li>
            <li className={styles.actived}>Hebrew</li>
          </ol>
      </div>
    </div>
  );
}

export default FuzzyFinder;
