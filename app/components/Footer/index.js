import React from 'react';
import {mouseTrap} from 'react-mousetrap';

import Tip from 'components/Tip';
import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
import Octicon from 'react-octicon';
import HotKeys from 'utils/hotkeys';

class Footer extends React.Component {

    componentWillMount() {
      this.props.bindShortcut(HotKeys.CHANGE_LANG.keys, this.changeLangHotKey.bind(this));
    }

    changeLangHotKey() {
      this.changeLang();
      // Prevent default
      return HotKeys.CHANGE_LANG.default;
    }

    changeLang(){
      console.log('fire changelang');
    }

    render(){
      return (
        <footer className={styles.footer}>
          <section className={styles.status_bar}>
            <div className={styles.status_bar_left}>
              <span>No Notebooks</span>
              <span>0:0</span>
              <span>MIT</span>
            </div>
            <div className={styles.status_bar_right}>
              {/*<span className={styles.status_bar_issue}><Octicon name="bug"/> Bugs</span>*}
              {/*<span className={styles.status_bar_fork}><Octicon name="octoface"/> Github</span>*/}
              <span className={styles.status_bar_lang} onClick={this.changeLang}><Octicon name="globe"/> <em>Language</em></span>
              <span className={styles.status_bar_run}><Octicon name="triangle-right"/> <em>Run</em></span>
              <span className={styles.status_bar_sync}><Octicon name="sync"/> <em>Sync</em></span>
              {/*<span className={styles.status_bar_update}><Octicon name="package"/>  Update</span>*/}
            </div>
          </section>
        </footer>
      );
    }
}

export default mouseTrap(Footer);
