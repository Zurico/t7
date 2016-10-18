import React from 'react';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
import Octicon from 'react-octicon';

class Footer extends React.Component {

    render(){
      return (
        <footer className={styles.footer}>
          <section className={styles.status_bar}>
            <div className={styles.status_bar_left}>
              <span>No Notebooks</span>
              <span>0:0</span>
              <FormattedMessage {...messages.licenseMessageAbbr} />
            </div>
            <div className={styles.status_bar_right}>
              {/*<span className={styles.status_bar_issue}><Octicon name="bug"/> Bugs</span>*}
              {/*<span className={styles.status_bar_fork}><Octicon name="octoface"/> Github</span>*/}
              <LocaleToggle />
              <span className={styles.status_bar_run}><Octicon name="triangle-right"/> <em>Run</em></span>
              <span className={styles.status_bar_sync}><Octicon name="sync"/> <em>Sync</em></span>
              {/*<span className={styles.status_bar_update}><Octicon name="package"/>  Update</span>*/}
            </div>
          </section>
        </footer>
      );
    }
}

export default Footer;
